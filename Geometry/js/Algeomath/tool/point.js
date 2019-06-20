
/**
 * @class tool.GenericPoint
 */
Algeomath.tool = {};
Algeomath.tool.GenericPoint = function (view) {
    // Algeomath.tool.Selection.call(this, view);

    this.state = this.STATE_INIT;
    this.initialPositionX = 0;
    this.initialPositionY = 0;
    this.pivotPositionX = 0;
    this.pivotPositionY = 0;

    this.activeObject = null;
}
// Algeomath.tool.GenericPoint.prototype = Object.create(Algeomath.tool.Selection.prototype);
Algeomath.tool.GenericPoint.prototype.constructor = Algeomath.tool.GenericPoint;

Algeomath.tool.GenericPoint.prototype.STATE_INIT = 0;
Algeomath.tool.GenericPoint.prototype.STATE_MOVING = 1;

Algeomath.tool.GenericPoint.prototype.getKey = function () {
    return 'point';
}

Algeomath.tool.GenericPoint.prototype.onExitImpl = function () {
    Algeomath.tool.dialogDeactive(this.propDialog);
}

Algeomath.tool.GenericPoint.prototype.onObjectsRemoved = function (objectList) {
    this.activeObject = null;
    this.state = this.STATE_INIT;

    // Algeomath.tool.dialogDeactive(this.propDialog);
}

Algeomath.tool.GenericPoint.prototype.onPointerDownImpl = function (mouseEvent) {
    // Algeomath.tool.dialogDeactive(this.propDialog);
    
    // let pickAllObject = this.view.pickAll(Algeomath.object.GeomObject.prototype);
    // let pickPointObject = this.view.pick(Algeomath.object.Point.prototype);
    
    // this.state = this.STATE_INIT; // unconditionally start over on left down
    // this.initialPositionX = this.view.pointerPosition.x;
    // this.initialPositionY = this.view.pointerPosition.y;
    // this.pivotPositionX = this.view.pointerPosition.x;
    // this.pivotPositionY = this.view.pointerPosition.y;

    // if(pickPointObject != null){
    //     this.activeObject = pickPointObject;
    //     if(this.activeObject instanceof Algeomath.object.Point){
    //         if (this.activeObject.selected == false) {
    //             this.view.clearSelections();
    //             this.activeObject.select();
    //         }

    //         this.state = this.STATE_MOVING;

    //         // algeoAlgebraPanel.onObjectsUpdated(this.activeObject.getOwner().getDescriptions()); 
            
    //         return;
    //     }
    // }
    Algeomath.tool.GenericPoint.createPoint(pickAllObject, this, this.view.getWorldMousePosition());
}

Algeomath.tool.GenericPoint.prototype.onPointerMoveImpl = function (mouseEvent) {
    // if (this.state == this.STATE_MOVING) {
    //     let deltaX = this.view.pointerPosition.x - this.pivotPositionX;
    //     let deltaY = this.view.pointerPosition.y - this.pivotPositionY;
    //     deltaX /= this.view.vwTransform.scale;
    //     deltaY *= -1 / this.view.vwTransform.scale;

    //     if(this.view.snapConfig.snapMode != Algeomath.view.SnapConfig.SNAP_MODE_OFF) {
    //         let snappedPos = this.determineSnappedPosition(this.activeObject.position.addxy(deltaX, deltaY));
    //         deltaX = snappedPos.x - this.activeObject.position.x;
    //         deltaY = snappedPos.y - this.activeObject.position.y;
    //         if (deltaX != 0 || deltaY != 0) {
    //             let snappedPivot = this.view.worldToView(snappedPos.x, snappedPos.y);
    //             this.pivotPositionX = snappedPivot.x;
    //             this.pivotPositionY = snappedPivot.y;
    //         }
    //         else{
    //             return;
    //         }
    //     }
    //     else { // Algeomath.view.SnapConfig.SNAP_MODE_OFF
    //         this.pivotPositionX = this.view.pointerPosition.x;  // update the prev position
    //         this.pivotPositionY = this.view.pointerPosition.y;  // update the prev position
    //     }
    //     this.view.moveSelectedObjects((new Algeomath.math.Vector2()).set(deltaX, deltaY));
    // }
}

Algeomath.tool.GenericPoint.prototype.onPointerUpImpl = function (mouseEvent) {
    // if (this.activeObject != null) {
    //     Algeomath.tool.dialogDeactive(this.propDialog);

    //     // let deltaX = Math.abs(this.view.pointerPosition.x - this.initialPositionX);
    //     // let deltaY = Math.abs(this.view.pointerPosition.y - this.initialPositionY);
    // }

    // if (this.STATE_MOVING == this.state) {        
    //     algeoUndoManager.createMovedUndoData(this.activeObject);
    // }

    this.state = this.STATE_INIT;
}

Algeomath.tool.GenericPoint.createPoint = function (pickAllObject, thisPoint, mousePosition) {
    // if(pickAllObject.length > 1){
    //     for(let i = pickAllObject.length - 1; i > -1; i--){
    //         if(pickAllObject[i] instanceof Algeomath.object.Drawing || pickAllObject[i] instanceof Algeomath.object.DecoSegmentAnnotation 
    //             || pickAllObject[i] instanceof Algeomath.object.DecoParallelism || pickAllObject[i] instanceof Algeomath.object.DecoIsoangle
    //             || pickAllObject[i] instanceof Algeomath.object.DecoIsolength || pickAllObject[i] instanceof Algeomath.object.DecoText
    //             || pickAllObject[i] instanceof Algeomath.object.Text || pickAllObject[i] instanceof Algeomath.object.Checkbox
    //             || pickAllObject[i] instanceof Algeomath.object.Image || pickAllObject[i] instanceof Algeomath.object.Table
    //             || pickAllObject[i] instanceof Algeomath.object.Vector || pickAllObject[i] instanceof Algeomath.object.MeasureArea
    //             || pickAllObject[i] instanceof Algeomath.object.MeasureAngle || pickAllObject[i] instanceof Algeomath.object.MeasureLength
    //             || pickAllObject[i] instanceof Algeomath.object.Slider || pickAllObject[i] instanceof Algeomath.object.Polygon){
    //             pickAllObject.splice(i, 1);
    //         }
    //     }
    // }
    
    // if(pickAllObject.length == 1){
    //     thisPoint.activeObject = pickAllObject[0];
    //     let pointOnObject = this.createPathProvider(thisPoint.activeObject, thisPoint);

    //     return pointOnObject;
    // } else if (pickAllObject.length > 1) {
    //     if(pickAllObject[0].owner == pickAllObject[1]){
    //         thisPoint.activeObject = pickAllObject[0];
    //         let pointOnObject = this.createPathProvider(thisPoint.activeObject, thisPoint);

    //         return pointOnObject;
    //     }

    //     if(pickAllObject[0] instanceof Algeomath.object.Circle && pickAllObject[1] instanceof Algeomath.object.Circle){
    //         if(pickAllObject[0].vCenterPosition == pickAllObject[1].vCenterPosition){
    //             thisPoint.activeObject = pickAllObject[0];
    //             let pointOnObject = this.createPathProvider(thisPoint.activeObject, thisPoint);

    //             return pointOnObject;
    //         }
    //     }

    //     if(pickAllObject[0] instanceof Algeomath.object.Linear && pickAllObject[1] instanceof Algeomath.object.Linear){
    //         let getX1 = Math.abs(pickAllObject[0].getDirection().x).toFixed(5);
    //         let getY1 = Math.abs(pickAllObject[0].getDirection().y).toFixed(5);
    //         let getX2 = Math.abs(pickAllObject[1].getDirection().x).toFixed(5);
    //         let getY2 = Math.abs(pickAllObject[1].getDirection().y).toFixed(5);
    //         let getOrigin1 = pickAllObject[0].getOrigin();
    //         let getOrigin2 = pickAllObject[1].getOrigin();

    //         let vecBetween = pickAllObject[0].getOrigin().subtract(pickAllObject[1].getOrigin()).normalize();
    //         let vecBetween_rev = vecBetween.multiply(-1);
    //         let BetwX0 = Math.abs(vecBetween.x).toFixed(5);
    //         let BetwY0 = Math.abs(vecBetween.y).toFixed(5);

    //         let isDirSuperParallel = (getX1 == getX2 && getY1 == getY2 && getOrigin1 == getOrigin2);
    //         let isDirSuperParallel2 = (getX1 == getX2 && getY1 == getY2);
    //         isDirSuperParallel2 = isDirSuperParallel2 && (pickAllObject[0].getDirection().isSame(vecBetween)|| pickAllObject[0].getDirection().isSame(vecBetween_rev));

    //         if (isDirSuperParallel || isDirSuperParallel2) {
    //             thisPoint.activeObject = pickAllObject[0];
    //             let pointOnObject = this.createPathProvider(thisPoint.activeObject, thisPoint);

    //             return pointOnObject;
    //         }
    //     }

    //     let intersection = Algeomath.tool.Intersection.build(thisPoint.view, pickAllObject[0], pickAllObject[1]);

    //     if (intersection != null) {
    //         intersection.construct(pickAllObject[0], pickAllObject[1]);
    //         thisPoint.view.addObject(intersection);
    //         algeoUndoManager.createUndoData(AlgeoAppUndoData.enumUndo.CREATED, intersection);
    //     }
        
    //     if(intersection.intersectionPoints.length > 1){
    //         let pointToInerSecDistance1 = Algeomath.math.Vector2.prototype.distance(mousePosition, intersection.intersectionPoints[0].position);
    //         let pointToInerSecDistance2 = Algeomath.math.Vector2.prototype.distance(mousePosition, intersection.intersectionPoints[1].position);
    //         if(pointToInerSecDistance1 < pointToInerSecDistance2){
    //             return intersection.intersectionPoints[0];
    //         } else {
    //             return intersection.intersectionPoints[1];
    //         }
    //     } else {
    //         return intersection.intersectionPoints[0];
    //     }
    // } else {
        // let newPoint = new Algeomath.object.GenericPoint(thisPoint.view);
        // newPoint.construct(thisPoint.determineSnappedPosition(thisPoint.view.getWorldMousePosition()));
        // thisPoint.view.addObject(newPoint);
        // algeoUndoManager.createUndoData(AlgeoAppUndoData.enumUndo.CREATED, newPoint);
        let newPoint = new Algeomath.object.GenericPoint(mousePosition, "dot");
        return newPoint;
    // }
}


Algeomath.tool.GenericPoint.prototype.handleClick = function (intersectObjects, worldPosition) {        
    for (i of intersectObjects) {
        if(i.object instanceof Algeomath.object.GenericPoint) {            
            return;
        }
    }

    let dot = Algeomath.tool.GenericPoint.createPoint(this, this, worldPosition)
    editor.execute( new AddObjectCommand( dot ) );
    editor.tool = null
}

Algeomath.tool.GenericPoint.prototype.onPointerDownImpl = function (mouseEvent) {
    // Algeomath.tool.dialogDeactive(this.propDialog);
    
    // let pickAllObject = this.view.pickAll(Algeomath.object.GeomObject.prototype);
    // let pickPointObject = this.view.pick(Algeomath.object.Point.prototype);
    
    // this.state = this.STATE_INIT; // unconditionally start over on left down
    // this.initialPositionX = this.view.pointerPosition.x;
    // this.initialPositionY = this.view.pointerPosition.y;
    // this.pivotPositionX = this.view.pointerPosition.x;
    // this.pivotPositionY = this.view.pointerPosition.y;

    // if(pickPointObject != null){
    //     this.activeObject = pickPointObject;
    //     if(this.activeObject instanceof Algeomath.object.Point){
    //         if (this.activeObject.selected == false) {
    //             this.view.clearSelections();
    //             this.activeObject.select();
    //         }

    //         this.state = this.STATE_MOVING;

    //         // algeoAlgebraPanel.onObjectsUpdated(this.activeObject.getOwner().getDescriptions()); 
            
    //         return;
    //     }
    // }
    Algeomath.tool.GenericPoint.createPoint(pickAllObject, this, this.view.getWorldMousePosition());
}


Algeomath.tool.GenericPoint.createPathProvider = function (activeObject, thisPoint) {
    if (activeObject.isPathProvider()) {
        let perimeter = false;
        let owner = activeObject.getOwner();
        if (owner instanceof Algeomath.object.Polygon) {
            perimeter = true;
            activeObject = owner;
        }

        let newPointOnObject = new Algeomath.object.PointOnObject(thisPoint.view);
        newPointOnObject.construct(activeObject, thisPoint.view.getWorldMousePosition(), perimeter);
        thisPoint.view.addObject(newPointOnObject);
        algeoUndoManager.createUndoData(AlgeoAppUndoData.enumUndo.CREATED, newPointOnObject);

        return newPointOnObject;
    }
}

Algeomath.tool.GenericPoint.prototype.drawBaseLayer = function (worldPosition) {
    // if (this.candidate != null) {
    //     let positions = this.tempLine.geometry.vertices;
    //     this.tempLine.geometry.vertices[1] = worldPosition
    //     this.tempLine.computeLineDistances();
    //     this.tempLine.geometry.verticesNeedUpdate = true                
    // }
}