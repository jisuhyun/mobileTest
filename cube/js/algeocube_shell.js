AlgeoCubeShell = function () {

}

AlgeoCubeShell.prototype.onCommandLookAtBottom = function () {
    cameraViewBottom();
}

AlgeoCubeShell.prototype.onCommandLookAtTop = function () {
    cameraViewTop();
}

AlgeoCubeShell.prototype.onCommandLookAtBack = function () {
    cameraViewBack();
}

AlgeoCubeShell.prototype.onCommandLookAtRight = function () {
    cameraViewRight();
}   

AlgeoCubeShell.prototype.onCommandLookAtLeft = function () {
    cameraViewLeft();
}

AlgeoCubeShell.prototype.onCommandLookAtFront = function () {
    cameraViewFront();
}

AlgeoCubeShell.prototype.onCommandCameraRotation = function (select, value) {
    if(value < 0) {
        value = value * -1;
    }
    if(select == 'turnRight') {
        value = value * -1;
    } else if(select == 'turnLeft') {
        value = value * 1;
    }
    cameraRotation(value);
}

AlgeoCubeShell.prototype.onCommandZoomInOut = function (select, value) {
    if(select == 'zoomIn') {
        value = value * -1;
    } else if (select == 'zoomOut') {
        value = value * 1;
    }
    cameraZoomInOut(value);
}

AlgeoCubeShell.prototype.onCommandAxisShape = function (value, pos, shape) {
    let axis = value;
    let objs = getObjects();
    for (i = 0; i < objs.length; ++i) {
        if (objs[i].name == 'voxel') {
            if (axis == 'x') {
                let convertPos = getVoxelCenterVector_fromBlock(pos, null, null);
                if (objs[i].position.x == convertPos.x) {
                    objs[i].geometry = getCubeGeo(shape);
                }
            } else if (axis == 'y') {
                let convertPos = getVoxelCenterVector_fromBlock(null, pos, null);
                if (objs[i].position.y == convertPos.y) {
                    objs[i].geometry = getCubeGeo(shape);
                }
            } else {
                let convertPos = getVoxelCenterVector_fromBlock(null, null, pos);
                if (objs[i].position.z == convertPos.z) {
                    objs[i].geometry = getCubeGeo(shape);
                }
            }
        }
    }
    render();
}

AlgeoCubeShell.prototype.onCommandAxismaterial = function (value, pos, material) {
    let axis = value;
    let objs = getObjects();
    for (i = 0; i < objs.length; ++i) {
        if (objs[i].name == 'voxel') {
            if (axis == 'x') {
                let convertPos = getVoxelCenterVector_fromBlock(pos, null, null);
                if (objs[i].position.x == convertPos.x) {
                    objs[i].material.map = getTexture(material);
                }
            } else if (axis == 'y') {
                let convertPos = getVoxelCenterVector_fromBlock(null, pos, null);
                if (objs[i].position.y == convertPos.y) {
                    objs[i].material.map = getTexture(material);
                }
            } else {
                let convertPos = getVoxelCenterVector_fromBlock(null, null, pos);
                if (objs[i].position.z == convertPos.z) {
                    objs[i].material.map = getTexture(material);
                }
            }
        }
    }
    render();
}

AlgeoCubeShell.prototype.onCommandAxisAlpha = function (value, pos, alpha) {
    let axis = value;
    let objs = getObjects();
    for (i = 0; i < objs.length; ++i) {
        if (objs[i].name == 'voxel') {
            if (axis == 'x') {
                let convertPos = getVoxelCenterVector_fromBlock(pos, null, null);
                if (objs[i].position.x == convertPos.x) {
                    objs[i].material.opacity = alpha;
                }
            } else if (axis == 'y') {
                let convertPos = getVoxelCenterVector_fromBlock(null, pos, null);
                if (objs[i].position.y == convertPos.y) {
                    objs[i].material.opacity = alpha;
                }
            } else {
                let convertPos = getVoxelCenterVector_fromBlock(null, null, pos);
                if (objs[i].position.z == convertPos.z) {
                    objs[i].material.opacity = alpha;
                }
            }
        }
    }
    render();
}

AlgeoCubeShell.prototype.onCommandAxisRGB = function (value, pos, r, g, b) {
    let axis = value;
    let objs = getObjects();
    for (i = 0; i < objs.length; ++i) {
        if (objs[i].name == 'voxel') {
            if (axis == 'x') {
                let convertPos = getVoxelCenterVector_fromBlock(pos, null, null);
                if (objs[i].position.x == convertPos.x) {
                    objs[i].material.color.r = r;
                    objs[i].material.color.g = g;
                    objs[i].material.color.b = b;
                }
            } else if (axis == 'y') {
                let convertPos = getVoxelCenterVector_fromBlock(null, pos, null);
                if (objs[i].position.y == convertPos.y) {
                    objs[i].material.color.r = r;
                    objs[i].material.color.g = g;
                    objs[i].material.color.b = b;
                }
            } else {
                let convertPos = getVoxelCenterVector_fromBlock(null, null, pos);
                if (objs[i].position.z == convertPos.z) {
                    objs[i].material.color.r = r;
                    objs[i].material.color.g = g;
                    objs[i].material.color.b = b;
                }
            }
        }
    }
    render();
}

AlgeoCubeShell.prototype.onCommandXYZShape = function (x, y, z, value) {
    let obj = getVoxel_fromBlock(x, y, z);
    let cube = getCubeGeo(value);
    obj.geometry = cube;
    render();
}

AlgeoCubeShell.prototype.onCommandXYZmaterial = function (x, y, z, value) {
    let obj = getVoxel_fromBlock(x, y, z);
    obj.material.map = getTexture(value);
    render();
}

AlgeoCubeShell.prototype.onCommandXYZAlpha = function (x, y, z, value) {
    let obj = getVoxel_fromBlock(x, y, z);
    obj.material.opacity = value;
    render();
}

AlgeoCubeShell.prototype.onCommandXYZRGB = function (x, y, z, r, g, b) {
    let obj = getVoxel_fromBlock(x, y, z);
    obj.material.color.r = r;
    obj.material.color.g = g;
    obj.material.color.b = b;
    render();
}

AlgeoCubeShell.prototype.onCommandCubeRGBColor = function (r, g, b) {
    setVoxcelRGB(r, g, b);
}

AlgeoCubeShell.prototype.onCommandCubeAlpha = function (value) {
    setAlpha(value);
}

AlgeoCubeShell.prototype.onCommandCubematerial = function (value) {
    selectTexture(value);
}

AlgeoCubeShell.prototype.onCommandCubeShape = function (value) {
    selectShape(value);
}

AlgeoCubeShell.prototype.onCommandDeleteCube = function (x, y, z) {
    let obj = getVoxel_fromBlock(x, y, z);
    deleteVoxel(obj);
    render();
}

AlgeoCubeShell.prototype.onCommandCreateCube = function (x, y, z) {
    createVoxel(getVoxelCenterVector_fromBlock(x, y, z));
    render();
}