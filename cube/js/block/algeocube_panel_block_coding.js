function AlgeoCubePanelBlockCoding() {
    algeoBlock.init('navigaiton-contents-block-li', getMediaResourcePath(), getImageResourcePath());
    algeoBlock.blockInitialize();

    this.blockArea = document.getElementById('navigaiton-contents-block-li');
    this.blockMenuArea = document.getElementsByClassName('blocklyToolboxDiv')[0];

    let btnBlock = document.getElementById('navigation-header-container');
    btnBlock.addEventListener('click', this.onClickBlock.bind(this), false);
}

AlgeoCubePanelBlockCoding.prototype.onExecutionButtonClick = function (evt) {
    let code = algeoBlock.workspaceToCode();

    algeoShellBlock.executeCode(code);
}

AlgeoCubePanelBlockCoding.prototype.onClickBlock = function () {
    this.adaptToResize();
    onWindowResize()
}

AlgeoCubePanelBlockCoding.prototype.adaptToResize = function () {
    // let blocklyWidth = this.blockArea.clientWidth - this.blockMenuArea.clientWidth;
    // let blocklyHeight = this.blockArea.clientHeight;
    
    // if (matchMedia("screen and (max-width: 650px)").matches){
    //     Blockly.svgResize(algeoBlock.workspace);
    //     algeoBlock.workspace.render();
    //     setTimeout(function () {
    //         Blockly.svgResize(algeoBlock.workspace);
    //         algeoBlock.workspace.render();
    //     }, 450);
    // } 
    
    Blockly.svgResize(algeoBlock.workspace);
    algeoBlock.workspace.render();
}