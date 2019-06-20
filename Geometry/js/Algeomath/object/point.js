
var Algeomath = {};

Algeomath.object = {};

Algeomath.object.GenericPoint = function(position, name) {    
    let dotGeometry = new THREE.Geometry();
    dotGeometry.vertices.push(new THREE.Vector3( 0, 0, 0));
    THREE.Points.call( this, dotGeometry
        , new THREE.PointsMaterial( { size: 10
            , sizeAttenuation: false
            , map: new THREE.TextureLoader().load( 'textures/sprites/disc.png' )
            , transparent: true } ) );
    this.name = name;
    this.position.set(position.x, position.y, position.z);

    this.dependers = new Set()
}

Algeomath.object.GenericPoint.prototype = Object.assign( Object.create( THREE.Points.prototype ), {
    constructor: Algeomath.object.GenericPoint
})
Algeomath.object.GenericPoint.prototype.constructor = Algeomath.object.GenericPoint;
Algeomath.object.GenericPoint.prototype.TYPE_NAME = 'GenericPoint';