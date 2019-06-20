function getLocalPath() {
    return window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);    
}

function getMediaResourcePath () {
    return getLocalPath() + 'media/';
}

function getTexturesResourcePath () {
    return getLocalPath() + 'textures/';
}

function getImageResourcePath () {
    return getLocalPath() + 'textures/algeocube_img/';
}

function getSoundResourcePath () {
    return getLocalPath() + 'resource/sound/';
}

function HTMLLiElement() {
    return document.createElement("li")
}

function HTMLAElement() {
    return document.createElement("a")
}

function HTMLDivElement() {
    return document.createElement("div")
}

function getBlockCodingStartState() {
    if (algeoBlock.eStartstate == algeoBlock.STARTSTATE.STATE_STOP)
        return false;
    else return true;
}
