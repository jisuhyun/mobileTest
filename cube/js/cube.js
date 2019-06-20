if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

var camera, scene, renderer;

var enumRollOverMeshIndex = {
    CENTER: 0,
    TOP: 1,
    LEFT: 2,
    RIGHT: 3,
    FRONT: 4,
    BACK: 5,
    BOTTOM: 6,
}
var rollOverMeshs = [];
var rollOverMesh;
let rollOverMeshsSize = 1000;
let dirDistance = (voxelSize * rollOverMeshsSize * 0.5) + voxelSizeHalf;
// let dirDistance = size/2+voxelSizeHalf;
var rollOverDirVectors = [new THREE.Vector3()
    , new THREE.Vector3(0, dirDistance, 0)
    , new THREE.Vector3(-dirDistance, 0, 0)
    , new THREE.Vector3(dirDistance, 0, 0)
    , new THREE.Vector3(0, 0, dirDistance)
    , new THREE.Vector3(0, 0, -dirDistance)
    , new THREE.Vector3(0, -dirDistance, 0)
];

var cubeMaterial;

var objects = [];
var VoxelMap = new Map();
var algeoCubeSound = null;

var cameraDefalutPosition = new THREE.Vector3(500, 800, 500);
var originPosition = new THREE.Vector3();
var controls;
var orbitControls;

var enumUserOperationType = {
    BUILD : 0,
    COLOR : 1,
    ERASE: 2,    
    SHAPE : 3,
    TEXTURE : 4,
}

var userOperationMode = enumUserOperationType.BUILD;

init();
render();

function init() {
    algeoCubeSound = new AlgeoCubeSound();
    if(algeoDevMode) {
        let canvasWidth = document.getElementById('container-graph').offsetWidth;
        let canvasHeight = document.getElementById('container-graph').offsetHeight;
        
        camera = new THREE.PerspectiveCamera( 45, canvasWidth / canvasHeight, 1, 10000 );
    } else {
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    }
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.sortObjects = false;
    
    if(algeoDevMode) {
        let canvasWidth = document.getElementById('container-graph').offsetWidth;
        let canvasHeight = document.getElementById('container-graph').offsetHeight;
        let canvasParent = document.getElementById('container-graph');

        renderer.setSize(canvasWidth, canvasHeight);
        
        // renderer.setViewport( -28, 0, canvasWidth, canvasHeight + 60 );
        canvasParent.appendChild(renderer.domElement);
    } else {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    }

    controls = new THREE.EditorControls(camera, renderer.domElement);
    controls.addEventListener('change', function () {
        render();
    });
    setCameraDefalutSetting();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // roll-over helpers

    let rollOverGeo;
    let tempVector = new THREE.Vector3();

    let rollOverMaterial;
    
    rollOverMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        // opacity: 0.2,
        // transparent: true,
        visible: false
    });
    for (let i = 1; i < rollOverDirVectors.length; ++i) {    // enumRollOverMeshIndex.TOP ~ enumRollOverMeshIndex.BOTTOM
        // rollOverMaterial = new THREE.MeshBasicMaterial({
        //     color: 0xffff00,
        //     opacity: 0,
        //     transparent: true,
        //     // visible : false
        // });
        tempVector.copy(rollOverDirVectors[i]);
        tempVector.x = tempVector.x == 0 ? voxelSize : voxelSize * rollOverMeshsSize;
        tempVector.y = tempVector.y == 0 ? voxelSize : voxelSize * rollOverMeshsSize;
        tempVector.z = tempVector.z == 0 ? voxelSize : voxelSize * rollOverMeshsSize;
        rollOverGeo = new THREE.BoxBufferGeometry(tempVector.x, tempVector.y, tempVector.z);
        // rollOverGeo = new THREE.CylinderGeometry( size/2, voxelSizeHalf, size, 4, 1 );

        // if( i== enumRollOverMeshIndex.TOP){
        //     // rollOverMaterial.opacity = 0.2
        // }         
        // else if( i== enumRollOverMeshIndex.LEFT){
        //     // rollOverMaterial.opacity = 0.2
        //     rollOverGeo.rotateZ( Math.PI /2 );
        // }
        // else if( i== enumRollOverMeshIndex.RIGHT){
        //     // rollOverMaterial.opacity = 0.2
        //     rollOverGeo.rotateZ( -Math.PI /2 );
        // }
        // else if( i== enumRollOverMeshIndex.FRONT){
        //     //  rollOverMaterial.opacity = 0.2
        //     rollOverGeo.rotateX( -Math.PI / 2);
        //     rollOverGeo.rotateY( -Math.PI);
        // }
        // else if( i== enumRollOverMeshIndex.BACK){
        //     // rollOverMaterial.opacity = 0.2
        //     rollOverGeo.rotateX( -Math.PI / 2);
        // }
        // else if (i==enumRollOverMeshIndex.BOTTOM) {
        //     //  rollOverMaterial.opacity = 0.2
        //     rollOverGeo.rotateZ( Math.PI );
        // }

        rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
        rollOverMesh.name = "rollOverMesh_" + i.toString();
        scene.add(rollOverMesh);
        rollOverMeshs[i] = rollOverMesh;
    }

    rollOverGeo = new THREE.BoxBufferGeometry(voxelSize, voxelSize, voxelSize);

    rollOverMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        opacity: 0.4,
        transparent: true
    });
    rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    rollOverMesh.name = "rollOverMesh"
    scene.add(rollOverMesh);
    rollOverMesh.visible = false;
    rollOverMeshs[0] = rollOverMesh;


    // grid

    let gridCount = 6;
    let gridSize = gridCount * voxelSize;

    // let girdSize = 300;
    // let divisions = girdSize * 0.02;

    var gridHelper = new THREE.GridHelper(gridSize, gridCount, "blue", "black");
    scene.add(gridHelper);    

    var geometry = new THREE.PlaneBufferGeometry(gridSize, gridSize);
    geometry.rotateX(-Math.PI / 2);

    let plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        visible: false
    }));    
    plane.name = "gridPlane";
    scene.add(plane);

    objects.push(plane);

    //emtpyObj
    let emptyGeometry = new THREE.BoxGeometry(4, 4, 4);
    let emptyMaterial = new THREE.MeshLambertMaterial({
        visible: false
    });
    emptyObjectForCamera = new THREE.Mesh(emptyGeometry, emptyMaterial);
    emptyObjectForCamera.visible = false;
    emptyObjectForCamera.position = new THREE.Vector3(0, 0, 0);

    scene.add(emptyObjectForCamera);
    emptyObjectForCamera.add(camera);

    // lights

    var ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLight);

    renderer.setAnimationLoop(function () {
        updateCamera();
    });
}

function createVoxel(point, normal, playSound = true) {
    if (normal != null || normal != undefined) {
        point = getVoxelCenterVector(point.add(normal));
    }

    if (point.y < 0)
        return null;
    if (VoxelMap.has(getVector3KeyString(point))) {
        return null;
    }

    let cubeMaterial = new THREE.MeshLambertMaterial({
        opacity: paramsAlpha,
        premultipliedAlpha: false,
        transparent: true,
        color: "#" + colorSelector.value,
        map: textures[textureIndex]
        // ,wireframe: true } );
    });
    cubeMaterial.textureIndex = textureIndex;

    var voxel = new THREE.Mesh(geometrys[geometryIndex], cubeMaterial);
    voxel.geometryIndex = geometryIndex;
    voxel.position.copy(point)
    voxel.name = "voxel"
    addVoxel(voxel);
    if (playSound) algeoCubeSound.createObject(algeoCubeSound.eCreateObject.OBJ_CUBE);
    return voxel;
}

function createVoxels(startPoint, targetPoint) {
    startPoint = getVoxelCenterVector(startPoint);
    targetPoint = getVoxelCenterVector(targetPoint);
    let diffVector = new THREE.Vector3().subVectors(targetPoint, startPoint);

    let maxDiff = Math.max(Math.abs(diffVector.x), Math.abs(diffVector.y));
    maxDiff = Math.max(maxDiff, Math.abs(diffVector.z)) / voxelSize;
    diffVector.divideScalar(maxDiff);
    maxDiff = Math.floor(maxDiff);
    let posVector = new THREE.Vector3();
    let diffVector_ = new THREE.Vector3();
    let returnVoxels = [];
    for (let i = 0; i < maxDiff; ++i) {
        posVector.copy(startPoint);
        diffVector_.copy(diffVector).multiplyScalar(i + 1);
        posVector.addVectors(posVector, diffVector_);
        let voxel = createVoxel(posVector, originPosition, false);
        if (voxel != null)
            returnVoxels.push(voxel);
    }
    if (returnVoxels.length > 0) {
        algeoCubeSound.createObject(algeoCubeSound.eCreateObject.OBJ_CUBE);
        return returnVoxels;
    }
    else null;
}

function addVoxel(voxel) {
    VoxelMap.set(getVector3KeyString(voxel.position), voxel);
    scene.add(voxel);
    scene.remove(rollOverMesh);
    scene.add(rollOverMesh);
    objects.push(voxel);
}

function getVoxel(pos) {
    let key = getVector3KeyString(getVoxelCenterVector(pos));
    let obj = VoxelMap.get(key);
    if (null != obj) {
        return obj;
    }
    return null;
}

function getVoxel_fromBlock(x, y, z) {
    let v = new THREE.Vector3();
    v = getVoxelCenterVector_fromBlock(x, y, z);
    let obj = getVoxel(v);
    return obj;
}

function deleteVoxel(voxel, playSound = true) {
    let key = getVector3KeyString(voxel.position);
    let obj = VoxelMap.get(key);
    if (null != obj) {
        VoxelMap.delete(key);
        scene.remove(voxel);
        objects.splice(objects.indexOf(voxel), 1);
        if (playSound) algeoCubeSound.deleteObject(algeoCubeSound.eDeleteObject.DELETE_CUBE);
        return obj;
    }
    return null;
}

function deleteVoxels(voxels) {
    let returnVoxels = [];
    let voxel;
    for (let v of voxels) {
        voxel = deleteVoxel(v, false);
        if (voxel != null)
            returnVoxels.push(voxel);
    }
    if (returnVoxels.length > 0) {
        algeoCubeSound.deleteObject(algeoCubeSound.eDeleteObject.DELETE_CUBE);
        return returnVoxels;
    }
    else null;
}

function render() {
    if(isLookUpdateCamera == false) {
        renderer.render(scene, camera);    
    }
}

function getVoxelCenterVector(v) {
    return v.divideScalar(voxelSize).floor().multiplyScalar(voxelSize).addScalar(voxelSizeHalf);
}

function setCameraDefalutSetting() {
    camera.position.copy(cameraDefalutPosition);
    camera.lookAt(originPosition);
    controls.center.copy(originPosition);
}

function setRollOverMeshPosition(position) {
    let pos = getVoxelCenterVector(position)
    for (let i = 0; i < rollOverDirVectors.length; ++i) {
        rollOverMeshs[i].position.copy(pos).add(rollOverDirVectors[i]);
    }
}

var saveData;
function save() {
    project = {};
    project.camera = camera.toJSON();
    project.scene = scene.toJSON();
    return project;
}

function load(project){
    if( null == project ) return;
    var loader = new THREE.ObjectLoader();
    camera.copy(loader.parse( project.camera ))
    scene = loader.parse( project.scene );

    objects = [];
    VoxelMap.clear();
    let gridPlane;
    for(let o of scene.children) {
        if(o.name.includes("rollOverMesh_")) {
            rollOverMeshs[parseInt(o.name[o.name.length-1])] = o;
        } else if(o.name.includes("rollOverMesh")){
            rollOverMeshs[0] = o;
            rollOverMesh = o;
        } else if(o.name == "gridPlane"){
            gridPlane = o;
            gridPlane.geometry.rotateX(-Math.PI / 2);
        } else if(o.name == "voxel"){
            VoxelMap.set(getVector3KeyString(o.position), o);   
            objects.push(o);
        }
    }

    objects.unshift(gridPlane);
    doManager.init();
    render();
}

function setAlpha(value) {
    paramsAlpha = value;
}

function getAlpha() {
    return paramsAlpha;
}

function setVoxcelRGB(r, g, b) {
    voxelRGB[0] = r;
    voxelRGB[1] = g;
    voxelRGB[2] = b;
}

function getVoxcelArrRGB() {
    return voxelRGB;
}

function getCubeGeo(index) {
    return geometrys[index];
}

function getObjects() {
    return objects;
}

function cameraViewBottom() {
    camera.position.set(scene.position.x, -cameraDefalutPosition.y, scene.position.z);
    camera.lookAt(emptyObjectForCamera.position);
    render();
}

function cameraViewTop() {
    camera.position.set(scene.position.x, cameraDefalutPosition.y, scene.position.z);
    camera.lookAt(emptyObjectForCamera.position);
    render();
}

function cameraViewRight() {
    camera.position.set(cameraDefalutPosition.x, scene.position.y, scene.position.z);
    camera.lookAt(emptyObjectForCamera.position);
    render();
}

function cameraViewLeft() {
    camera.position.set(-cameraDefalutPosition.x, scene.position.y, scene.position.z);
    camera.lookAt(emptyObjectForCamera.position);
    render();
}

function cameraViewBack() {
    camera.position.set(scene.position.x, scene.position.y, -cameraDefalutPosition.z);
    camera.lookAt(emptyObjectForCamera.position);
    render();
}

function cameraViewFront() {
    camera.position.set(scene.position.x, scene.position.y, cameraDefalutPosition.z);
    camera.lookAt(emptyObjectForCamera.position);
    render();
}

function cameraRotation(value) {
    isLookUpdateCamera = true;
    camRotationSpeed = value * 0.001;
}

function cameraRotationUpdate() {
    let speed = Date.now() * camRotationSpeed;
    emptyObjectForCamera.rotation.set(0, speed, 0);
    renderer.render(scene, camera); 
}

function cameraZoomInOut(value) {
    let delta = new THREE.Vector3();
    controls.zoom( delta.set( 0, 0, value) );
}

function lookAtStandard(is) {
    isLookUpdateCamera = is;
}

function updateCamera() {
    if (isLookUpdateCamera) {
        cameraRotationUpdate();
        // let delta = clock.getDelta();
        // let damping = 5.0;
        // emptyObjectForCamera.getWorldPosition(cameraTarget);
        // cameraTarget.x = cameraDefalutPosition.x;
        // cameraTarget.y = cameraDefalutPosition.y;
        // cameraTarget.z = cameraDefalutPosition.z;
        // camera.position.lerp(cameraTarget, delta * damping);
        // camera.lookAt(emptyObjectForCamera.position);
        // renderer.render(scene, camera);
        // setTimeout(function() {
        //     isLookUpdateCamera = false;
        //     emptyObjectForCamera.getWorldPosition(cameraTarget);
        // }, 1500);
    }
}

