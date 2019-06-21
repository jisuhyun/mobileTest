// var leftMouseDownIntervalId;
var isShiftDown = false, isLeftMouseDown = false;

    
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
    
if(algeoDevMode) {
    var canvasMaginTop = document.getElementById('header-wrapper').offsetHeight,
        canvasMaginLeft = document.getElementById('container-navigation').offsetWidth,
        canvasWidth = document.getElementById('container-graph').offsetWidth,
        canvasHeight = document.getElementById('container-graph').offsetHeight;
}

function initEvent() {
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
    document.addEventListener('keyup', onDocumentKeyUp, false);

    document.addEventListener('touchstart', onTouchStart, {passive: false});
    document.addEventListener('touchend', onTouchEnd, {passive: false});
    document.addEventListener('touchmove', onTouchMove, {passive: false});
    document.addEventListener('touchcancel', onTouchCancel, {passive: false});

    window.addEventListener('resize', onWindowResize, false);
}

initEvent();

function onTouchCancel(touchEvent) {

}

function onTouchMove(touchEvent) {
    touchEvent.preventDefault();
    onDocumentMouseDownSet(getConvertTouchToMouse('mousemove', touchEvent));
    let event = getConvertTouchToMouse('mousemove', touchEvent);
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        if(intersects[0].object.name == "gridPlane") {
        
        } else {
            if(event.isMultiTouch == true) {
                onDocumentMouseMove(event);
            }
        }
    }
}

function onTouchEnd(touchEvent) {
    touchEvent.preventDefault();
    onDocumentMouseUp(getConvertTouchToMouse('mouseup', touchEvent));
}

function onTouchStart(touchEvent) {
    touchEvent.preventDefault();
    onDocumentMouseDownSet(getConvertTouchToMouse('mousedown', touchEvent));
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        if(intersects[0].object.name == "gridPlane") {
            rollOverMesh.visible = false;                
        } else {
            rollOverMesh.visible = true; 
        }
    }
    onDocumentMouseDown(getConvertTouchToMouse('mousedown', touchEvent));
}

function getTouchPosition(touchEvent) {
    let touchCount = touchEvent.changedTouches.length;
    let x = 0;
    let y = 0;
    if(touchCount > 1) {
        for(let t of touchEvent.changedTouches) {
            x += t.clientX;
            y += t.clientY;
        }
        x = x/touchCount;
        y = y/touchCount;
    } else {
        x = touchEvent.changedTouches[0].clientX;
        y = touchEvent.changedTouches[0].clientY;
    }
    return getConvertTouchToVector2(x, y);
}

function getConvertTouchToVector2(x, y) {
    let vec = new THREE.Vector2();
    vec.x = x;
    vec.y = y;
    return vec;
}

function getConvertTouchToMouse(mouseEventType, touchEvent) {
    let pos = getTouchPosition(touchEvent);
    let mouseEvent = new MouseEvent( // create event
        mouseEventType, // type of event
        {
            'view': touchEvent.target.ownerDocument.defaultView,
            'bubbles': true,
            'cancelable': true,
            'clientX': pos.x,
            'clientY': pos.y,
    });
    mouseEvent.isTouch = true;
    mouseEvent.isMultiTouch = touchEvent.changedTouches.length > 1 ? true : false;
    return mouseEvent;
}

function onWindowResize() {
    if(algeoDevMode) {
        camera.aspect = canvasWidth / canvasHeight;
    } else {
        camera.aspect = window.innerWidth / window.innerHeight;
    }
    camera.updateProjectionMatrix();
    

    if(algeoDevMode) {
        canvasWidth = document.getElementById('container-graph').offsetWidth;
        canvasHeight = document.getElementById('container-graph').offsetHeight;
        renderer.setSize(canvasWidth, canvasHeight);
    } else {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    render()
}

var createdVoxelsTemp = null;
var contolVoxelSet = new Set();
var selectedVoxelPosition = null;
var xAxisCreate = true;
var yAxisCreate = true;
var zAxisCreate = true;

function eventCreateVoxel(pos){
    let result = createVoxels(selectedVoxelPosition, pos);
    if(null != result)
        createdVoxelsTemp = result;
    if(null != createdVoxelsTemp && createdVoxelsTemp.length > 0){
        setRollOverMeshPosition(createdVoxelsTemp[createdVoxelsTemp.length - 1].position);
        rollOverMesh.visible = true;
    }

    return true;
}

function onDocumentMouseMove(event) {
    event.preventDefault();
    if(algeoDevMode) {
        canvasMaginLeft = document.getElementById('container-navigation').offsetWidth;
        canvasWidth = document.getElementById('container-graph').offsetWidth;
        mouse.set(((event.clientX - canvasMaginLeft) / canvasWidth) * 2 - 1, -((event.clientY - canvasMaginTop) / canvasHeight) * 2 + 1);
    } else {
        mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    }
    raycaster.setFromCamera(mouse, camera);
    
    if( isLeftMouseDown ) {
        switch(userOperationMode) {
            case enumUserOperationType.ERASE: {
                var intersects = raycaster.intersectObjects(objects);
                for(let i of intersects)
                    if(i.object.name == "voxel") {
                        if(deleteVoxel(i.object)){
                            rollOverMesh.visible = false;
                            contolVoxelSet.add(i.object);
                        }
                    }
            }
            break;
            case enumUserOperationType.BUILD: {
                if(null == selectedVoxelPosition ) return;
                intersects = raycaster.intersectObjects(rollOverMeshs);
                if (intersects.length > 0) {
                    for(let i of intersects ) {
                        if(i.object == rollOverMeshs[enumRollOverMeshIndex.TOP] && yAxisCreate) {
                            if(i.point.y > selectedVoxelPosition.y + voxelSize) {
                                if( null != createdVoxelsTemp ){
                                    for(let j=createdVoxelsTemp.length-1; j>=0; --j ){
                                        if(createdVoxelsTemp[j].position.y < i.point.y){
                                            deleteVoxel(createdVoxelsTemp[j]);
                                            createdVoxelsTemp.splice(j, 1);
                                        }
                                    }
                                }
                                let pos = new THREE.Vector3(selectedVoxelPosition.x, i.point.y - voxelSizeHalf, selectedVoxelPosition.z);
                                if(eventCreateVoxel(pos))
                                    break;
                            }
                            else if(i.point.y < selectedVoxelPosition.y) {
                                if( null != createdVoxelsTemp ){ 
                                    for(let j=createdVoxelsTemp.length-1; j>=0; --j ){
                                        if(createdVoxelsTemp[j].position.y < i.point.y){
                                            deleteVoxel(createdVoxelsTemp[j]);
                                            createdVoxelsTemp.splice(j, 1);
                                        }
                                    }
                                    if(createdVoxelsTemp.length > 0){
                                        setRollOverMeshPosition(createdVoxelsTemp[createdVoxelsTemp.length - 1].position);
                                        rollOverMesh.visible = true;
                                    }
                                    else {
                                        rollOverMesh.visible = false;
                                    }
                                }
                            }
                        }
        
        
                        else if(i.object == rollOverMeshs[enumRollOverMeshIndex.BOTTOM] && yAxisCreate) {
                            if(i.point.y < selectedVoxelPosition.y - voxelSize) {      
                                if( null != createdVoxelsTemp ){
                                    for(let j=createdVoxelsTemp.length-1; j>=0; --j ){
                                        if(createdVoxelsTemp[j].position.y > i.point.y){
                                            deleteVoxel(createdVoxelsTemp[j]);
                                            createdVoxelsTemp.splice(j, 1);
                                        }
                                    }
                                }                      
                                let pos = new THREE.Vector3(selectedVoxelPosition.x, i.point.y + voxelSizeHalf, selectedVoxelPosition.z);
                                if(eventCreateVoxel(pos))
                                    break;
                            } 
                            else if(i.point.y > selectedVoxelPosition.y) {
                                if( null != createdVoxelsTemp ){ 
                                    for(let j=createdVoxelsTemp.length-1; j>=0; --j ){
                                        if(createdVoxelsTemp[j].position.y > i.point.y){
                                            deleteVoxel(createdVoxelsTemp[j]);
                                            createdVoxelsTemp.splice(j, 1);
                                        }
                                    }
                                    if(createdVoxelsTemp.length > 0){
                                        setRollOverMeshPosition(createdVoxelsTemp[createdVoxelsTemp.length - 1].position);
                                        rollOverMesh.visible = true;
                                    }
                                    else {
                                        rollOverMesh.visible = false;
                                    }
                                }
                            }
                        }
        
                        else if(i.object == rollOverMeshs[enumRollOverMeshIndex.LEFT] && xAxisCreate) {                    
                            if(i.point.x < selectedVoxelPosition.x - voxelSize) {
                                if( null != createdVoxelsTemp ){
                                    for(let j=createdVoxelsTemp.length-1; j>=0; --j ){
                                        if(createdVoxelsTemp[j].position.x > i.point.x){
                                            deleteVoxel(createdVoxelsTemp[j]);
                                            createdVoxelsTemp.splice(j, 1);
                                        }
                                    }
                                }                                                
                                let pos = new THREE.Vector3(i.point.x + voxelSizeHalf, selectedVoxelPosition.y, selectedVoxelPosition.z);
                                if(eventCreateVoxel(pos))
                                    break;
                            }
                            else if(i.point.x > selectedVoxelPosition.x) {
                                if( null != createdVoxelsTemp ){
                                    for(let j=createdVoxelsTemp.length-1; j>=0; --j ){
                                        if(createdVoxelsTemp[j].position.x > i.point.x){
                                            deleteVoxel(createdVoxelsTemp[j]);
                                            createdVoxelsTemp.splice(j, 1);
                                        }
                                    }
                                    if(createdVoxelsTemp.length > 0){
                                        setRollOverMeshPosition(createdVoxelsTemp[createdVoxelsTemp.length - 1].position);
                                        rollOverMesh.visible = true;
                                    }
                                    else {
                                        rollOverMesh.visible = false;
                                    }
                                }
                            }
                        }
        
                        else if(i.object == rollOverMeshs[enumRollOverMeshIndex.RIGHT] && xAxisCreate) {
                            if(i.point.x > selectedVoxelPosition.x + voxelSize) {                            
                                if( null != createdVoxelsTemp ) {
                                    for(let j=createdVoxelsTemp.length-1; j>=0; --j ){
                                        if(createdVoxelsTemp[j].position.x < i.point.x){
                                            deleteVoxel(createdVoxelsTemp[j]);
                                            createdVoxelsTemp.splice(j, 1);
                                        }
                                    }
                                }
                                let pos = new THREE.Vector3(i.point.x - voxelSizeHalf, selectedVoxelPosition.y, selectedVoxelPosition.z);
                                if(eventCreateVoxel(pos))
                                    break;
                            }
                            else if(i.point.x < selectedVoxelPosition.x) {
                                if( null != createdVoxelsTemp ) {
                                    for(let j=createdVoxelsTemp.length-1; j>=0; --j ){
                                        if(createdVoxelsTemp[j].position.x < i.point.x){
                                            deleteVoxel(createdVoxelsTemp[j]);
                                            createdVoxelsTemp.splice(j, 1);
                                        }
                                    }
                                    if(createdVoxelsTemp.length > 0){
                                        setRollOverMeshPosition(createdVoxelsTemp[createdVoxelsTemp.length - 1].position);
                                        rollOverMesh.visible = true;
                                    }
                                    else {
                                        rollOverMesh.visible = false;
                                    }
                                }
                            }
                        }    
        
                        else if(i.object == rollOverMeshs[enumRollOverMeshIndex.FRONT] && zAxisCreate) {
                            if(i.point.z > selectedVoxelPosition.z + voxelSize) {                            
                                if( null != createdVoxelsTemp ) {
                                    for(let j=createdVoxelsTemp.length-1; j>=0; --j ){
                                        if(createdVoxelsTemp[j].position.z < i.point.z){
                                            deleteVoxel(createdVoxelsTemp[j]);
                                            createdVoxelsTemp.splice(j, 1);
                                        }
                                    }
                                }
                                let pos = new THREE.Vector3(selectedVoxelPosition.x, selectedVoxelPosition.y, i.point.z - voxelSizeHalf);
                                if(eventCreateVoxel(pos))
                                    break;
                            }
                            else if(i.point.z < selectedVoxelPosition.x) {
                                if( null != createdVoxelsTemp ) {
                                    for(let j=createdVoxelsTemp.length-1; j>=0; --j ){
                                        if(createdVoxelsTemp[j].position.z < i.point.z){
                                            deleteVoxel(createdVoxelsTemp[j]);
                                            createdVoxelsTemp.splice(j, 1);
                                        }
                                    }
                                    if(createdVoxelsTemp.length > 0){
                                        setRollOverMeshPosition(createdVoxelsTemp[createdVoxelsTemp.length - 1].position);
                                        rollOverMesh.visible = true;
                                    }
                                    else {
                                        rollOverMesh.visible = false;
                                    }
                                }
                            }
                        }
        
                        else if(i.object == rollOverMeshs[enumRollOverMeshIndex.BACK] && zAxisCreate) {
                            if(i.point.z < selectedVoxelPosition.z - voxelSize) {
                                if( null != createdVoxelsTemp ) {
                                    for(let j=createdVoxelsTemp.length-1; j>=0; --j ){
                                        if(createdVoxelsTemp[j].position.z > i.point.z){
                                            deleteVoxel(createdVoxelsTemp[j]);
                                            createdVoxelsTemp.splice(j, 1);
                                        }
                                    }
                                }
                                let pos = new THREE.Vector3(selectedVoxelPosition.x, selectedVoxelPosition.y, i.point.z + voxelSizeHalf);
                                if(eventCreateVoxel(pos))
                                    break;
                            }
                            else if(i.point.z > selectedVoxelPosition.x) {
                                if( null != createdVoxelsTemp ) {
                                    for(let j=createdVoxelsTemp.length-1; j>=0; --j ){
                                        if(createdVoxelsTemp[j].position.z > i.point.z){
                                            deleteVoxel(createdVoxelsTemp[j]);
                                            createdVoxelsTemp.splice(j, 1);
                                        }
                                    }
                                    if(createdVoxelsTemp.length > 0){
                                        setRollOverMeshPosition(createdVoxelsTemp[createdVoxelsTemp.length - 1].position);
                                        rollOverMesh.visible = true;
                                    }
                                    else {
                                        rollOverMesh.visible = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            break;
            case enumUserOperationType.COLOR:
            case enumUserOperationType.SHAPE:
            case enumUserOperationType.TEXTURE:
            {
                if(null == modeFunc) break;                
                let funcData = null;
                if(userOperationMode == enumUserOperationType.COLOR) {
                    funcData = colorSelector.value;
                } else if(userOperationMode == enumUserOperationType.SHAPE) {
                    funcData = geometryIndex;
                }else if(userOperationMode == enumUserOperationType.TEXTURE) {
                    funcData = textureIndex;
                }
                if(null == funcData) break;
                var intersects = raycaster.intersectObjects(objects);
                for(let i of intersects) {
                    let data = modeFunc(i.object, funcData);
                    if(null != data){
                        contolVoxelSet.add(data);
                    }
                }
            }
            break;
        }
    }
    else {
        var intersects = raycaster.intersectObjects(objects);
        if (intersects.length > 0) {
            var intersect = intersects[0];
            if(intersects[0].object.name == "gridPlane") {
                rollOverMesh.visible = false;                
            }
            else {
                rollOverMesh.visible = true;
                setRollOverMeshPosition(intersect.object.position);                
            }
        }
        else {
            rollOverMesh.visible = false;
        }
    }
    render();
}

function controlVoxel() {
    raycaster.setFromCamera(mouse, camera);

    if(rollOverMesh.visible){
        switch(userOperationMode) {
            case enumUserOperationType.ERASE: {
                let voxel = getVoxel(rollOverMesh.position);
                if(deleteVoxel(voxel)){
                    rollOverMesh.visible = false;
                    contolVoxelSet.add(voxel);
                }
            }
            break;
            case enumUserOperationType.BUILD: {
                var intersects = raycaster.intersectObject(rollOverMesh);
                if (intersects.length > 0) {
                    intersect = intersects[0];
                    let voxel = createVoxel(intersect.point, intersect.face.normal);
                    if(null!= voxel){
                        xAxisCreate = false;
                        yAxisCreate = false;
                        zAxisCreate = false;
                        if(intersect.object.name == "voxel" || intersect.object.name == "rollOverMesh") {
                            if(intersect.object.position.x != voxel.position.x){
                                xAxisCreate = true;
                            } else if(intersect.object.position.y != voxel.position.y){
                                yAxisCreate = true;
                            } else if(intersect.object.position.z != voxel.position.z){
                                zAxisCreate = true;
                            }
                        } else {
                            if(intersect.face.normal.x > 0){
                                xAxisCreate = true;
                            } else if(intersect.face.normal.y > 0){
                                yAxisCreate = true;
                            } else if(intersect.face.normal.z > 0){
                                zAxisCreate = true;
                            }
                        }
                        
                        setRollOverMeshPosition(voxel.position);
                        rollOverMesh.visible = true;
                        selectedVoxelPosition = voxel.position;
                        contolVoxelSet.add(voxel);
                    }
                }
            }
            break;
            case enumUserOperationType.COLOR:
            case enumUserOperationType.SHAPE:
            case enumUserOperationType.TEXTURE: {
                let obj = getVoxel(rollOverMesh.position);
                if(null != obj) {
                    let data = null;
                    if(userOperationMode == enumUserOperationType.COLOR)
                        data = modeFunc(obj, colorSelector.value);
                    else if(userOperationMode == enumUserOperationType.SHAPE)
                        data = modeFunc(obj, geometryIndex);
                    else if(userOperationMode == enumUserOperationType.TEXTURE)
                        data = modeFunc(obj, textureIndex);
                    if(null != data){
                        contolVoxelSet.add(data);
                    }
                }
            }
            break;
        }
        return; 
    }    
    
    intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        intersect = intersects[0];

        switch(userOperationMode) {
            case enumUserOperationType.ERASE: {
                if (intersect.object.name == "voxel") {
                    if(deleteVoxel(intersect.object)) {
                        rollOverMesh.visible = false;
                        contolVoxelSet.add(intersect.object);
                    }
                }
            }            
            break;
            case enumUserOperationType.BUILD: {
                let voxel = createVoxel(intersect.point, intersect.face.normal);
                if(null!= voxel){
                    xAxisCreate = false;
                    yAxisCreate = false;
                    zAxisCreate = false;
                    if(intersect.object.name == "voxel" || intersect.object.name == "rollOverMesh") {
                        if(intersect.object.position.x != voxel.position.x){
                            xAxisCreate = true;
                        } else if(intersect.object.position.y != voxel.position.y){
                            yAxisCreate = true;
                        }
                        else if(intersect.object.position.z != voxel.position.z){
                            zAxisCreate = true;
                        }
                    } else {
                        if(intersect.face.normal.x > 0){
                            xAxisCreate = true;
                        }
                        else if(intersect.face.normal.y > 0){
                            yAxisCreate = true;
                        }
                        else if(intersect.face.normal.z > 0){
                            zAxisCreate = true;
                        }
                    }
                    setRollOverMeshPosition(voxel.position);
                    rollOverMesh.visible = true;
                    selectedVoxelPosition = voxel.position;
                    contolVoxelSet.add(voxel);
                }
            }
            break;
            case enumUserOperationType.COLOR:
            case enumUserOperationType.SHAPE:
            case enumUserOperationType.TEXTURE:
            {
                let data = null;
                if(userOperationMode == enumUserOperationType.COLOR)
                    data = modeFunc(intersect.object, colorSelector.value);
                else if(userOperationMode == enumUserOperationType.SHAPE)
                    data = modeFunc(intersect.object, geometryIndex);
                else if(userOperationMode == enumUserOperationType.TEXTURE)
                    data = modeFunc(intersect.object, textureIndex);
                if(null != data){
                    contolVoxelSet.add(data);
                }
            }
            break;

        }       
    }
}

function onDocumentMouseDownSet(event) {
    if (algeoDevMode) {
        canvasMaginLeft = document.getElementById('container-navigation').offsetWidth;
        canvasWidth = document.getElementById('container-graph').offsetWidth;
        mouse.set(((event.clientX - canvasMaginLeft) / canvasWidth) * 2 - 1, -((event.clientY - canvasMaginTop) / canvasHeight) * 2 + 1);
    } else {
        mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    }
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    if(event.isMultiTouch == true) {
        return;
    }
    if (event.which == 1) {
        isLeftMouseDown = true;
        onDocumentMouseDownSet(event);
        controlVoxel();
        render();
    }
    algeoCubeSound.onMouseDown(event);
}

function onDocumentMouseUp(event) {
    event.preventDefault();
    isLeftMouseDown = false;

    if(contolVoxelSet.size > 0) {
        if ( null != createdVoxelsTemp){
            for(let o of createdVoxelsTemp){
                contolVoxelSet.add(o)
            }
        }
        undoData = new DoData();
        undoData.setType(userOperationMode);
        undoData.pushDoObjects(contolVoxelSet);
        doManager.pushDoData(undoData);
        contolVoxelSet.clear();
    }
    if(null != mission){
        if(mission.process(objects.slice(1, objects.length)) == enumMissionStatus.SUCCESS){
            mission = null;
        } else if(mission.process(objects.slice(1, objects.length)) == enumMissionStatus.FAIL){
            mission = null;
        }
    }

    createdVoxelsTemp = null;
    selectedVoxelPosition = null;
    algeoCubeSound.onMouseUp(event);
    
}

var mission = null;
function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 16: // SHIFT
            isShiftDown = true;
            break;
        case 27: // ESC
            lookAtStandard(false);
            break;
        case 76: // L
            load(saveData);
            break;
        case 77: // M
            onClickUserOperationModeButton();
            break;
        case 79: // O
            onClickToOriginButton();
            break;
        case 81: // Q
            mission = new Mission();
            mission.setGoal(objects);            
            mission.setTimeLimit(10);
            doManager.init();
            deleteAllVoxels();
            mission.missionStart();
            render();
            break;
        case 82: // R
            onClickReplayButton();
            break;
        case 83: // S
            saveData = save();
            break;
        case 89: // Y
            if(event.ctrlKey)
                doManager.redo();
            break;
        case 90: // Z
            if(event.ctrlKey)
                doManager.undo();
            break;
    }
    algeoCubeSound.onKeyDown(event);
}

function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 16: // SHIFT
            isShiftDown = false;
            break;
    }
    algeoCubeSound.onKeyUp(event);
}
