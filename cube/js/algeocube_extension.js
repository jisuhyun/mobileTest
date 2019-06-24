function getVoxelCenterVector_fromBlock(x, y, z) {
    let vec = new THREE.Vector3();
    vec.x = x;
    vec.y = y;
    vec.z = z;
    let ori = new THREE.Vector3(vec.x * voxelSize, vec.y * voxelSize, vec.z * voxelSize);
    let convert = getVoxelCenterVector(ori);
    return convert;
}

function getVector3KeyString_fromBlock(x, y, z) {
    return x.toString() + "_" + y.toString() + "_" + z.toString();
}