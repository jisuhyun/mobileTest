function AlgeoCubeSound() {

    this.eSoundTrack = {
        SOUND_BGM: 0,
        SOUND_CREATECUBE: 1,
        SOUND_DELETE: 2,
        SOUND_END: 3,
    }

    this.eCreateObject = {
        OBJ_CUBE: 0,
        OBJ_END: 1
    }

    this.eDeleteObject = {
        DELETE_CUBE: 0,
        DELETE_END: 1
    }

    this.audioArr = new Array();
    this.path = getSoundResourcePath();

    this.initSoundArr();
}

AlgeoCubeSound.prototype.initSoundArr = function () {
    this.audioArr.push(new Audio(this.path + 'test.mp4'));
    this.audioArr.push(new Audio(this.path + 'createcube.wav'));
    this.audioArr.push(new Audio(this.path + 'delete.wav'));
}

AlgeoCubeSound.prototype.createObject = function (obj) {
    switch(obj) {
        case this.eCreateObject.OBJ_CUBE :
            // this.audioArr[this.eSoundTrack.SOUND_CREATECUBE].pause();
            this.audioArr[this.eSoundTrack.SOUND_CREATECUBE].play();
        break;
    }
}

AlgeoCubeSound.prototype.deleteObject = function (obj) {
    switch(obj) {
        case this.eDeleteObject.DELETE_CUBE :
            // this.audioArr[this.eSoundTrack.SOUND_DELETE].pause();
            this.audioArr[this.eSoundTrack.SOUND_DELETE].play();
        break;
    }
}

AlgeoCubeSound.prototype.bgmStart = function () {
    this.audioArr[this.eSoundTrack.SOUND_BGM].pause();
    this.audioArr[this.eSoundTrack.SOUND_BGM].currentTime = 0.8;
    this.audioArr[this.eSoundTrack.SOUND_BGM].loop = true;
    this.audioArr[this.eSoundTrack.SOUND_BGM].play();
}

AlgeoCubeSound.prototype.onMouseDown = function(event) {

}

AlgeoCubeSound.prototype.onRemoveMouseDown = function(event) {

}

AlgeoCubeSound.prototype.onMouseUp = function(event) {

}

AlgeoCubeSound.prototype.onKeyDown = function(event) {
    switch (event.keyCode) {

    }
}

AlgeoCubeSound.prototype.onKeyUp = function(event) {
    switch (event.keyCode) {
        case 13:    //enter
            algeoBlockPanel.onExecutionButtonClick();
        break;

        case 32:    //space
            algeoCubeSound.bgmStart();
        break;
    }
}