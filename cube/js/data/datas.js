var paramsAlpha             = 1;
var voxelRGB                = [1, 1, 1];
var cameraTarget            = new THREE.Vector3();
var clock                   = new THREE.Clock();
var emptyObjectForCamera    = null;
var emptyObject             = null;
var voxelSize               = 50;
var voxelSizeHalf           = voxelSize * 0.5;
var isLookUpdateCamera      = false;
var camRotationSpeed        = 0;
var gridCount = 6;
var gridSize;
var gridIsOdd;
// let girdSize = 300;
// let divisions = girdSize * 0.02;

var originPosition;
var cubeOriginPosition;

function initDatas(gridCount_) {
    gridCount = gridCount_;
    gridSize = gridCount * voxelSize;
    gridIsOdd = gridCount % 2;

    if(gridIsOdd){
        originPosition = new THREE.Vector3(0, -voxelSizeHalf, 0);
        cubeOriginPosition = new THREE.Vector3(0, 0, 0);
    }
    else{
        originPosition = new THREE.Vector3();
        cubeOriginPosition = new THREE.Vector3(voxelSizeHalf, voxelSizeHalf, voxelSizeHalf);
    }
}

initDatas(gridCount);

var enumObjectNames = {
    GRIDPLANE:0,
    CUBE:1,
    TEXTURE:2,
    NUMBER:3,
    GEOMETRY:4
}
var objectNames = [
    "GridPlane",
    "Cube",
    "CubeTexture",
    "CubeNumber",
    "CubeGeometry"
];

var textures = [];
var textureIndex = 2;
var textureIndexMap = new Map();
var textureCount=0;
for(let i=0; i< resTextures.length; ++i) {
    textures.push(new THREE.TextureLoader().load(resTextures[i]));
    textures[textureCount].name = objectNames[enumObjectNames.TEXTURE] + textureCount.toString();
    textureIndexMap.set(textures[textureCount].name, textureCount++);
}

for(let i=0; i< resNumberTextures.length; ++i) {
    textures.push(new THREE.TextureLoader().load(resNumberTextures[i]));
    textures[textureCount].name = objectNames[enumObjectNames.NUMBER] + (i+1).toString();
    textureIndexMap.set(textures[textureCount].name, textureCount++);
}

var enumGeometryType = {
    BOX: 0,
    TORUS: 1,
    SPHERE: 2,    
    CYLINDER: 3,
    TORUSKNOT: 4,
}

var geometrys = [
    new THREE.BoxBufferGeometry( voxelSize, voxelSize, voxelSize )
    , new THREE.TorusBufferGeometry( 15, 10, 8, 60, Math.PI * 2 )
    , new THREE.SphereBufferGeometry( voxelSize/2, 20, 20, 0, Math.PI * 2, 0, Math.PI )
    , new THREE.CylinderBufferGeometry( voxelSize/2, voxelSize/2, voxelSize-0.1, 30, 30, false, 0, Math.PI * 2 )
    , new THREE.TorusKnotBufferGeometry( 12, 8, 64, 8, 2, 3 )
];

var geometryIndex = 0;
var geometryIndexMap = new Map();
for(let i=0; i<geometrys.length; ++i) {
    geometrys[i].name = objectNames[enumObjectNames.GEOMETRY] + i.toString();
    geometryIndexMap.set(geometrys[i].name, i);
}