algeoBlock.init = function (div, mediaPath, imgPath) {
    algeoBlock.blocklyArea = window.document.getElementById(div);
    algeoBlock.blocklyDiv = window.document.getElementById(div);
    algeoBlock.imgPath = imgPath;
    algeoBlock.mediaPath = mediaPath;

    algeoBlock.workspace = Blockly.inject(this.blocklyDiv, {
        media: mediaPath,
        toolbox: algeoBlock.tb,
        collapse: true,
        comments: true,
        disable: true,
        maxBlocks: Infinity,
        trashcan: true,
        horizontalLayout: false,
        toolboxPosition: 'start',
        css: true,
        rtl: false,
        scrollbars: true,
        sounds: true,
        oneBasedIndex: false,
        grid: {
            spacing: 20,
            length: 30,
            //colour: 'rgb(248, 255, 255)',
            colour: 'rgb(234, 234, 234)',
            snap: true
        },
        zoom: {
            controls: false,
            wheel: true,
            startScale: 0.9,
            maxScale: 2,
            minScale: 0.5,
            scaleSpeed: 1.1
        }
    });

    //write category
    var algeoCategory = window.document.getElementById(":1.label");
    algeoCategory.removeChild(algeoCategory.childNodes[0]);
    var algeoIcon = window.document.createElement("img");
    algeoIcon.src = imgPath + "createIcon.png";
    algeoCategory.appendChild(algeoIcon);

    var varCategory = window.document.getElementById(":2.label");
    varCategory.removeChild(varCategory.childNodes[0]);
    var varIcon = window.document.createElement("img");
    varIcon.src = imgPath + "varIcon.png";
    varCategory.appendChild(varIcon);

    var artCategory = window.document.getElementById(":3.label");
    artCategory.removeChild(artCategory.childNodes[0]);
    var artIcon = window.document.createElement("img");
    artIcon.src = imgPath + "controlIcon.png";
    artCategory.appendChild(artIcon);

    var functionCategory = window.document.getElementById(":4.label");
    functionCategory.removeChild(functionCategory.childNodes[0]);
    var functionIcon = window.document.createElement("img");
    functionIcon.src = imgPath + "artIcon.png";
    functionCategory.appendChild(functionIcon);

    var operatorCategory = window.document.getElementById(":5.label");
    operatorCategory.removeChild(operatorCategory.childNodes[0]);
    var operatorIcon = window.document.createElement("img");
    operatorIcon.src = imgPath + "functionIcon.png";
    operatorCategory.appendChild(operatorIcon);


    Blockly.HSV_SATURATION = 1;
    Blockly.HSV_VALUE = 0.8;
    
    algeoBlock.workspace.registerButtonCallback("createVariableButtonPressed", algeoBlock.createVariable);
}

algeoBlock.blockInitialize = function () {
    //start 블록 생성
    algeoBlock.textToWorkspace('<xml id="startBlocks" style="display: block"><block type="algeo_start" id="algeo_start" x="10" y="10"></block></xml>');
    try {
        //block can be deleted
        //algeoBlock.workspace.getBlockById("algeo_start").setDeletable(true);
        algeoBlock.workspace.getBlockById("algeo_start").setDeletable(false);
    } catch (e) {
        Algeomath.onCatchErrorToStackoverflow(e);
    }
}

algeoBlock.workspaceToCode = function () {
    let code = [];
    Blockly.JavaScript.init(algeoBlock.workspace);
    let blocks = algeoBlock.workspace.getTopBlocks(true);
    for (let x = 0, block; block = blocks[x]; x++) {
        if (block.type == "algeo_start" || block.type == "procedures_defnoreturn" || block.type == "procedures_defreturn") {
            let line = Blockly.JavaScript.blockToCode(block);
            if (goog.isArray(line)) {
                line = line[0];
            }
            if (line) {
                if (block.outputConnection) {
                    line = Blockly.JavaScript.scrubNakedValue(line);
                }
                code.push(line);
            }
        }
    }
    code = code.join('\n');
    code = Blockly.JavaScript.finish(code);
    code = code.replace(/^\s+\n/, '');
    code = code.replace(/\n\s+$/, '\n');
    code = code.replace(/[ \t]+\n/g, '\n');
    return code;
}

algeoBlock.textToWorkspace = function (str) {
    algeoBlock.workspace.clear();

    let xml = null;
    xml = Blockly.Xml.textToDom(str);
    Blockly.Xml.domToWorkspace(xml, algeoBlock.workspace);
}

algeoBlock.workspaceToText = function () {
    let xml = Blockly.Xml.workspaceToDom(algeoBlock.worksapce);
    return Blockly.Xml.domToText(xml);
}

algeoBlock.resize = function(e) {
    let x = 0;
    let y = 0;
    let element = algeoBlock.blocklyArea;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    algeoBlock.blocklyDiv.style.left = x + 'px';
    algeoBlock.blocklyDiv.style.top = y + 'px';
    algeoBlock.blocklyDiv.style.width = algeoBlock.blocklyArea.offsetWidth + 'px';
    algeoBlock.blocklyDiv.style.height = algeoBlock.blocklyArea.offsetHeight + 'px';
}