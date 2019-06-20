// import { Vector3 } from "../../libs/three";

// import { Vector3 } from "../../libs/three";

Algeomath.object.GenericSegment = function(point1, point2, name) {
    var material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

    this.point1 = point1;
    this.point2 = point2;

    this.point1.dependers.add(this)
    this.point2.dependers.add(this)
  
    THREE.Line.call(this, this.makeGeometry(), material)
    this.name = name;
    this.updatePosition();
}

Algeomath.object.GenericSegment.prototype = Object.assign( Object.create( THREE.Line.prototype ), {
    constructor: Algeomath.object.GenericSegment
})
Algeomath.object.GenericSegment.prototype.constructor = Algeomath.object.GenericSegment;
Algeomath.object.GenericSegment.prototype.TYPE_NAME = 'GenericSegment';

Algeomath.object.GenericSegment.prototype.makeGeometry = function () {
    var geometry = new THREE.Geometry();

    let x = (this.point2.position.x - this.point1.position.x) * 0.5;
    let y = (this.point2.position.y - this.point1.position.y) * 0.5;
    let z = (this.point2.position.z - this.point1.position.z) * 0.5;
    let v = new THREE.Vector3(x,y,z)

    geometry.vertices.push(
        v,
        v.clone().multiplyScalar( -1 )
    );

    return geometry
}

Algeomath.object.GenericSegment.prototype.updateGeometry = function () {
    this.geometry = this.makeGeometry()
    this.updatePosition();
}

Algeomath.object.GenericSegment.prototype.updatePosition = function () {
    let posx = this.point1.position.x + (this.point2.position.x - this.point1.position.x) * 0.5;
    let posy = this.point1.position.y + (this.point2.position.y - this.point1.position.y) * 0.5;
    let posz = this.point1.position.z + (this.point2.position.z - this.point1.position.z) * 0.5;
    this.position.set(posx, posy, posz);
}

Algeomath.object.GenericSegment.prototype.move = function (delta) {
    this.point1.position.sub(delta)
    this.point2.position.sub(delta)    
}