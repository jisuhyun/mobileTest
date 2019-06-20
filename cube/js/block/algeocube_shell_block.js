function AlgeoCubeShellBlock() {
    this.isExecuting        = false;
    this.algeoInterpreter   = null;
}

/**
 * Inject the Music API into a JavaScript interpreter.
 * @param {!Interpreter} interpreter The JS Interpreter.
 * @param {!Interpreter.Object} scope Global scope.
 */
AlgeoCubeShellBlock.prototype.initApi = function (interpreter, scope) {
    let wrapper;

    wrapper = function (select, value) {
        return interpreter.createPrimitive(agmCameraRotation(select.data, value.data));
    }
    interpreter.setProperty(scope, 'agmCameraRotation', interpreter.createNativeFunction(wrapper));

    wrapper = function (select, value) {
        return interpreter.createPrimitive(agmZoomInOut(select.data, value.data));
    }
    interpreter.setProperty(scope, 'agmZoomInOut', interpreter.createNativeFunction(wrapper));

    wrapper = function () {
        return interpreter.createPrimitive(agmLookAtBottom());
    }
    interpreter.setProperty(scope, 'agmLookAtBottom', interpreter.createNativeFunction(wrapper));

    wrapper = function () {
        return interpreter.createPrimitive(agmLookAtTop());
    }
    interpreter.setProperty(scope, 'agmLookAtTop', interpreter.createNativeFunction(wrapper));

    wrapper = function () {
        return interpreter.createPrimitive(agmLookAtBack());
    }
    interpreter.setProperty(scope, 'agmLookAtBack', interpreter.createNativeFunction(wrapper));

    wrapper = function () {
        return interpreter.createPrimitive(agmLookAtRight());
    }
    interpreter.setProperty(scope, 'agmLookAtRight', interpreter.createNativeFunction(wrapper));

    wrapper = function () {
        return interpreter.createPrimitive(agmLookAtLeft());
    }
    interpreter.setProperty(scope, 'agmLookAtLeft', interpreter.createNativeFunction(wrapper));

    wrapper = function () {
        return interpreter.createPrimitive(agmLookAtFront());
    }
    interpreter.setProperty(scope, 'agmLookAtFront', interpreter.createNativeFunction(wrapper));

    wrapper = function () {
        return interpreter.createPrimitive(agmLookAtStandard());
    }
    interpreter.setProperty(scope, 'agmLookAtStandard', interpreter.createNativeFunction(wrapper));

    wrapper = function (value, pos, shape) {
        return interpreter.createPrimitive(agmSetXYZAxisShape(value.data, pos.data, shape.data));
    }
    interpreter.setProperty(scope, 'agmSetXYZAxisShape', interpreter.createNativeFunction(wrapper));

    wrapper = function (value, pos, material) {
        return interpreter.createPrimitive(agmSetXYZAxismaterial(value.data, pos.data, material.data));
    }
    interpreter.setProperty(scope, 'agmSetXYZAxismaterial', interpreter.createNativeFunction(wrapper));

    wrapper = function (value, pos, alpha) {
        return interpreter.createPrimitive(agmSetXYZAxisAlpha(value.data, pos.data, alpha.data));
    }
    interpreter.setProperty(scope, 'agmSetXYZAxisAlpha', interpreter.createNativeFunction(wrapper));

    wrapper = function (value, pos, r, g, b) {
        return interpreter.createPrimitive(agmSetXYZAxisRGB(value.data, pos.data, r.data, g.data, b.data));
    }
    interpreter.setProperty(scope, 'agmSetXYZAxisRGB', interpreter.createNativeFunction(wrapper));

    wrapper = function (x, y, z, shape) {
        return interpreter.createPrimitive(agmSetXYZCubeShape(x.data, y.data, z.data, shape.data));
    }
    interpreter.setProperty(scope, 'agmSetXYZCubeShape', interpreter.createNativeFunction(wrapper));

    wrapper = function (x, y, z, material) {
        return interpreter.createPrimitive(amgSetXYZmaterial(x.data, y.data, z.data, material.data));
    }
    interpreter.setProperty(scope, 'amgSetXYZmaterial', interpreter.createNativeFunction(wrapper));

    wrapper = function (x, y, z, alpha) {
        return interpreter.createPrimitive(agmSetXYZCubeAlpha(x.data, y.data, z.data, alpha.data));
    }
    interpreter.setProperty(scope, 'agmSetXYZCubeAlpha', interpreter.createNativeFunction(wrapper));

    wrapper = function (x, y, z, r, g, b) {
        return interpreter.createPrimitive(agmSetXYZCubeRGBColor(x.data, y.data, z.data, r.data, g.data, b.data));
    }
    interpreter.setProperty(scope, 'agmSetXYZCubeRGBColor', interpreter.createNativeFunction(wrapper));

    wrapper = function (r, g, b) {
        return interpreter.createPrimitive(agmSetCubeRGBColor(r.data, g.data, b.data));
    }
    interpreter.setProperty(scope, 'agmSetCubeRGBColor', interpreter.createNativeFunction(wrapper));

    wrapper = function (alpha) {
        return interpreter.createPrimitive(agmSetCubeAlpha(alpha.data));
    }
    interpreter.setProperty(scope, 'agmSetCubeAlpha', interpreter.createNativeFunction(wrapper));

    wrapper = function (material) {
        return interpreter.createPrimitive(amgSetmaterial(material.data));
    }
    interpreter.setProperty(scope, 'amgSetmaterial', interpreter.createNativeFunction(wrapper));

    wrapper = function (shape) {
        return interpreter.createPrimitive(agmSetCubeShape(shape.data));
    }
    interpreter.setProperty(scope, 'agmSetCubeShape', interpreter.createNativeFunction(wrapper));

    wrapper = function (x, y, z) {
        return interpreter.createPrimitive(agmDeleteCube(x.data, y.data, z.data));
    }
    interpreter.setProperty(scope, 'agmDeleteCube', interpreter.createNativeFunction(wrapper));

    wrapper = function (x, y, z) {
        return interpreter.createPrimitive(agmCreateCube(x.data, y.data, z.data));
    }
    interpreter.setProperty(scope, 'agmCreateCube', interpreter.createNativeFunction(wrapper));

    wrapper = function (value) {
        return interpreter.createPrimitive(agmStart(value.data));
    }
    interpreter.setProperty(scope, 'agmStart', interpreter.createNativeFunction(wrapper));

    Blockly.JavaScript.addReservedWords('waitForSeconds');
    wrapper = interpreter.createAsyncFunction(
        function (timeInSeconds, callback) {
            // Delay the call to the callback.
            setTimeout(callback, timeInSeconds * 1000);
        });
    interpreter.setProperty(scope, 'waitForSeconds', wrapper);
    initInterpreterWaitForSeconds(interpreter, scope);
}

AlgeoCubeShellBlock.prototype.addReservedWords = function () {
    Blockly.JavaScript.addReservedWords('agmCameraRotation');
    Blockly.JavaScript.addReservedWords('agmZoomInOut');
    Blockly.JavaScript.addReservedWords('agmLookAtBottom');
    Blockly.JavaScript.addReservedWords('agmLookAtBack');
    Blockly.JavaScript.addReservedWords('agmLookAtRight');
    Blockly.JavaScript.addReservedWords('agmLookAtLeft');
    Blockly.JavaScript.addReservedWords('agmLookAtFront');
    Blockly.JavaScript.addReservedWords('agmLookAtTop');
    Blockly.JavaScript.addReservedWords('agmSetXYZAxisShape');
    Blockly.JavaScript.addReservedWords('agmSetXYZAxismaterial');
    Blockly.JavaScript.addReservedWords('agmSetXYZAxisAlpha');
    Blockly.JavaScript.addReservedWords('agmSetXYZAxisRGB');
    Blockly.JavaScript.addReservedWords('agmSetXYZCubeShape');
    Blockly.JavaScript.addReservedWords('amgSetXYZmaterial');
    Blockly.JavaScript.addReservedWords('agmSetXYZCubeAlpha');
    Blockly.JavaScript.addReservedWords('agmSetXYZCubeRGBColor');
    Blockly.JavaScript.addReservedWords('agmSetCubeRGBColor');
    Blockly.JavaScript.addReservedWords('agmSetCubeAlpha');
    Blockly.JavaScript.addReservedWords('amgSetmaterial');
    Blockly.JavaScript.addReservedWords('agmSetCubeShape');
    Blockly.JavaScript.addReservedWords('agmDeleteCube');
    Blockly.JavaScript.addReservedWords('agmCreateCube');
    Blockly.JavaScript.addReservedWords('agmStart');
}

AlgeoCubeShellBlock.prototype.stopExecution = function () {
    algeoShellBlock.isExecuting = false;
}

AlgeoCubeShellBlock.prototype.resetInterpreter = function (runner) {
    algeoShellBlock.algeoInterpreter = null;
    if (runner) {
        clearTimeout(runner);
        runner = null;
    }
}

AlgeoCubeShellBlock.prototype.executeCode = function (code) {
    algeoShellBlock.algeoInterpreter = null;

    if(!algeoShellBlock.algeoInterpreter) {
        
        setTimeout(function () {
            algeoShellBlock.algeoInterpreter = new Interpreter(code, algeoShellBlock.initApi);

            runner = function () {
                if(algeoShellBlock.algeoInterpreter) {
                    let hasMore = algeoShellBlock.algeoInterpreter.run();
                    if (hasMore) {
                       setTimeout(runner, 10);
                        
                    } else if (!hasMore) {
                        algeoShellBlock.resetInterpreter(runner);
                    }
                }
            };
            runner();
        }, 1);
    }
}

AlgeoCubeShellBlock.prototype.checkRunner = function (runner) {
    
}



