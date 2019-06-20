/**
 * @class tool.GenericSegment
 * 선분
 */
Algeomath.tool.GenericSegment = function (view) {
    // Algeomath.tool.Base.call(this, view);

    this.candidate = null;
    this.tempLine = null;
}
// Algeomath.tool.GenericSegment.prototype = Object.create(Algeomath.tool.Base.prototype);
Algeomath.tool.GenericSegment.prototype.constructor = Algeomath.tool.GenericSegment;

Algeomath.tool.GenericSegment.prototype.getKey = function () {
    return 'line';
}

Algeomath.tool.GenericSegment.prototype.onExit = function () {
    if (this.candidate != null) {
        this.candidate.detarget();
    }
}

Algeomath.tool.GenericSegment.prototype.handleClick = function (intersectObjects, worldPosition) {    
    let targetPoint = null;
    for (i of intersectObjects) {
        if(i.object instanceof Algeomath.object.GenericPoint) {            
            targetPoint = i.object;
            break;
        }        
    }
    if(targetPoint == null) {
        targetPoint = Algeomath.tool.GenericPoint.createPoint(this, this, worldPosition);
        editor.execute( new AddObjectCommand( targetPoint ) );
    }
    
    if(null == this.candidate) {
        this.candidate = targetPoint        

        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            this.candidate.position,
            this.candidate.position
        );

        var material = new THREE.LineDashedMaterial ({
            color: 0x0000ff, dashSize: 10, gapSize: 5, linewidth: 2
        });
        this.tempLine = new THREE.LineSegments(geometry, material);
        this.tempLine.isViewInEditorPanel = false;
        this.tempLine.computeLineDistances();
        editor.execute( new AddObjectCommand( this.tempLine ) );
    }
    else {
        if(this.candidate.id == targetPoint.id){
            return;
        }        
        let segment = new Algeomath.object.GenericSegment(this.candidate, targetPoint, "segment")        
        editor.execute( new AddObjectCommand( segment ) );
        // editor.execute( new RemoveObjectCommand( this.tempLine ) );
        editor.tool = null
    }
}

// Algeomath.tool.GenericSegment.prototype.onPointerDown = function (mouseEvent) {
//     let pickAllObject = this.view.pickAll(Algeomath.object.GeomObject.prototype);
//     let targetPoint = this.view.pick(Algeomath.object.Point.prototype);

//     let newUndoArray = [];
//     if (targetPoint == null) {
//         targetPoint = Algeomath.tool.GenericPoint.createPoint(pickAllObject, this, this.view.getWorldMousePosition());
//         if(Algeomath.isNullorUndefined(targetPoint)) return;
//     }

//     if (this.candidate == null) {
//         this.candidate = targetPoint;
//         this.candidate.makeTargeted(this.view.currentTime);        
//     } else {
//         if(this.candidate.id == targetPoint.id){
//             return;
//         }
//         let newSegment = new Algeomath.object.GenericSegment(this.view);
//         newSegment.construct(this.candidate, targetPoint);
//         this.view.addObject(newSegment);
//         newUndoArray.push(newSegment);

//         this.candidate.detarget();
//         this.candidate = null;        
//     }
//     algeoUndoManager.createUndoData(AlgeoAppUndoData.enumUndo.CREATED, newUndoArray);
// }

Algeomath.tool.GenericSegment.prototype.drawBaseLayer = function (worldPosition) {
    if (this.candidate != null) {
        let positions = this.tempLine.geometry.vertices;
        this.tempLine.geometry.vertices[1] = worldPosition
        this.tempLine.computeLineDistances();
        this.tempLine.geometry.verticesNeedUpdate = true                
    }
}

Algeomath.tool.GenericSegment.prototype.onUndo = function () {
    Algeomath.tool.Base.prototype.onUndo.call(this);
    this.candidate = null;
}
