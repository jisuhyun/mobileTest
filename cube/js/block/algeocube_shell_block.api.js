function agmStart(value) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    if (value == "START") {
        //algeoBlockPanel.clearBlockCodingObjects();
    }

}

function agmStandardColor(color) {
    if(getBlockCodingStartState() == false) {
        return;
    }
}

function agmRandomColor() {
    if(getBlockCodingStartState() == false) {
        return;
    }
}

function agmCubeRGBColor(r, g, b) {
    if(getBlockCodingStartState() == false) {
        return;
    }
}

function agmCubeAlpha(value) {
    if(getBlockCodingStartState() == false) {
        return;
    }
}

function agmCreateCube(x, y, z) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandCreateCube(x, y, z);
}

function agmDeleteCube(x, y, z) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandDeleteCube(x, y, z);
}

function agmCubeConnectLine(x1, y1, z1, x2, y2, z2) {
    if(getBlockCodingStartState() == false) {
        return;
    }

}

function agmSetCubeShape(value) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandCubeShape(value);
}

function amgSetmaterial(value) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandCubematerial(value);
}

function agmSetCubeAlpha(value) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandCubeAlpha(value);
}
function agmSetCubeRGBColor(r, g, b) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandCubeRGBColor(r, g, b);
}

function agmSetXYZCubeRGBColor(x, y, z, r, g, b) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandXYZRGB(x, y, z, r, g, b);
}

function agmSetXYZCubeAlpha(x, y, z, value) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandXYZAlpha(x, y, z, value);
}

function amgSetXYZmaterial(x, y, z, value) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandXYZmaterial(x, y, z, value);
}

function agmSetXYZCubeShape(x, y, z, value) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandXYZShape(x, y, z, value);
}

function agmSetXYZAxisRGB(value, pos, r, g, b) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandAxisRGB(value, pos, r, g, b);
}

function agmSetXYZAxisAlpha(value, pos, alpha) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandAxisAlpha(value, pos, alpha);
}

function agmSetXYZAxismaterial(value, pos, material) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandAxismaterial(value, pos, material);
}

function agmSetXYZAxisShape(value, pos, shape) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandAxisShape(value, pos, shape);
}

function agmLookAtStandard() {
    if(getBlockCodingStartState() == false) {
        return;
    }
    setCameraDefalutSetting();
    lookAtStandard(false);
    render();
}

function agmLookAtBottom() {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandLookAtBottom();
}

function agmLookAtFront() {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandLookAtFront();
}

function agmLookAtLeft() {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandLookAtLeft();
}

function agmLookAtRight() {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandLookAtRight();
}

function agmLookAtBack() {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandLookAtBack();
}

function agmLookAtTop() {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandLookAtTop();
}

function agmZoomInOut(select, value) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandZoomInOut(select, value);
}

function agmCameraRotation(select, value) {
    if(getBlockCodingStartState() == false) {
        return;
    }
    algeoCubeShell.onCommandCameraRotation(select, value);
}