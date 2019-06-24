var toOriginButton;
var userOperationModeButton;
var replayButton;

var replayIntervalId = null;

function initUI() {
    var colorSelector = document.getElementById('colorSelector');
    colorSelector.value = 'FFFFFF';

    let textureDivTag = document.getElementById('textures');
    let textureCount = 0;
    for(let i=0; i< resTextures.length; ++i) {
        let img = new Image(50, 50);
        img.src = resTextures[i];
        textureDivTag.append(img);
        img.addEventListener("click", onClickTextureButton.bind(this, textureCount++), false)        
    }

    for(let i=0; i< resNumberTextures.length; ++i) {
        let img = new Image(50, 50);
        img.src = resNumberTextures[i];
        textureDivTag.append(img);
        img.addEventListener("click", onClickTextureButton.bind(this, textureCount++), false)        
    }

    toOriginButton = document.getElementById('toOrigin');
    toOriginButton.addEventListener("click", onClickToOriginButton.bind(toOriginButton), false);

    userOperationModeButton = document.getElementById('mode');
    userOperationModeButton.addEventListener("click", onClickUserOperationModeButton.bind(userOperationModeButton), false);

    replayButton = document.getElementById('replay');
    replayButton.addEventListener("click", onClickReplayButton.bind(replayButton), false);
}

initUI();

function onClickTextureButton(index) {
    textureIndex = index;
}

function getTexture(index) {
    return textures[index];
}

function selectShape(shape) {
    geometryIndex = shape;
}

var modeFunc= null;
function onClickUserOperationModeButton() {
    switch(userOperationMode) {
        case enumUserOperationType.BUILD:
            userOperationMode = enumUserOperationType.COLOR;
            userOperationModeButton.value = "Color Mode";
            modeFunc = doManager.changeColor;
            break;
        case enumUserOperationType.COLOR:
            userOperationMode = enumUserOperationType.ERASE;
            userOperationModeButton.value = "Erase Mode";
            modeFunc = null;
            break;
        case enumUserOperationType.ERASE:
            userOperationMode = enumUserOperationType.SHAPE;
            userOperationModeButton.value = "Shape Mode";
            modeFunc = doManager.changeShape;
            break;
        case enumUserOperationType.SHAPE:
            userOperationMode = enumUserOperationType.TEXTURE;
            userOperationModeButton.value = "Texture Mode";
            modeFunc = doManager.changeTexture;            
            break;
        case enumUserOperationType.TEXTURE:
            userOperationMode = enumUserOperationType.BUILD;
            userOperationModeButton.value = "Build Mode";
            modeFunc = null;
            break;
        // default:
        //     ++mode;
        //     break;
    }    
}

function onClickReplayButton() {
    if(doManager.isReplay) return;
    if(doManager.prepareReplay()) {
        render();
        replayIntervalId = setInterval(() => {
            if(doManager.replay())
                render();
            else{
                clearInterval(replayIntervalId);
                replayIntervalId = null;
                alert('Replay Complete');
            }
        }, 500);
    }
    else {
        alert('have not undo data');
    }
}

function onClickToOriginButton() {
    setCameraDefalutSetting();
    render();
}

