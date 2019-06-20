Blockly.JavaScript['algeo_start'] = function (block) {
    var value = block.getFieldValue('state');
    if (value == "START") {
        algeoBlock.eStartstate = algeoBlock.STARTSTATE.STATE_START;
    }
    else if (value == "STARTKEEP") {
        algeoBlock.eStartstate = algeoBlock.STARTSTATE.STATE_STARTKEEP;
    }
    else {
        algeoBlock.eStartstate = algeoBlock.STARTSTATE.STATE_STOP;
    }
    var code = "agmStart(" + "'" + value + "'" + ");\n";
    return code;
}

Blockly.JavaScript['look_location'] = function (block) {
    let select = block.getFieldValue('state');
    let speed = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ADDITION) || "";
    let code = "agmCameraRotation(" + "'" + select + "'" + ", " + speed + ");\n";
    return code;
}

Blockly.JavaScript['look_zoom_in_out'] = function (block) {
    let value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ADDITION) || "";
    let select = block.getFieldValue('state');
    let code = "agmZoomInOut(" + "'" + select + "'" + ", " + value + ");\n";
    return code;
}

Blockly.JavaScript['look_view'] = function (block) {
    let view = block.getFieldValue('state');
    let code;
    if(view == 'front') {
        code = "agmLookAtFront();\n";
    } else if(view == 'back') {
        code = "agmLookAtBack();\n";
    } else if(view == 'left') {
        code = "agmLookAtLeft();\n";
    } else if(view == 'right') {
        code = "agmLookAtRight();\n";
    } else if(view == 'top') {
        code = "agmLookAtTop();\n";
    } else {
        code = "agmLookAtBottom();\n";
    }
    return code;
}

Blockly.JavaScript['look_standard'] = function (block) {
    let code = "agmLookAtStandard();\n";
    return code;
}

Blockly.JavaScript['cube_xyz_axis_shape'] = function (block) {
    var value = block.getFieldValue('state');
    let pos = Blockly.JavaScript.valueToCode(block, 'position', Blockly.JavaScript.ORDER_ADDITION) || "";
    let shape = Blockly.JavaScript.valueToCode(block, 'shape', Blockly.JavaScript.ORDER_ADDITION) || "";
    if(shape < 0) {
        shape = 0;
    } else if(shape > 4) {
        shape = 4;
    }
    let code = "agmSetXYZAxisShape(" + "'" + value + "'" + ", " + pos + ", " + shape +");\n";
    return code;
}

Blockly.JavaScript['cube_xyz_axis_material'] = function (block) {
    var value = block.getFieldValue('state');
    let pos = Blockly.JavaScript.valueToCode(block, 'position', Blockly.JavaScript.ORDER_ADDITION) || "";
    let material = Blockly.JavaScript.valueToCode(block, 'material', Blockly.JavaScript.ORDER_ADDITION) || "";
    if(material < 0) {
        material = 0;
    } else if(material > 4) {
        material = 4;
    }
    let code = "agmSetXYZAxismaterial(" + "'" + value + "'" + ", " + pos + ", " + material +");\n";
    return code;
}

Blockly.JavaScript['cube_xyz_axis_alpha'] = function (block) {
    var value = block.getFieldValue('state');
    let pos = Blockly.JavaScript.valueToCode(block, 'position', Blockly.JavaScript.ORDER_ADDITION) || "";
    let alpha = Blockly.JavaScript.valueToCode(block, 'alpha', Blockly.JavaScript.ORDER_ADDITION) || "";
    alpha = alpha * 0.1;
    if(alpha < 0) {
        alpha = 0;
    } else if(alpha > 10) {
        alpha = 1;
    }
    let code = "agmSetXYZAxisAlpha(" + "'" + value + "'" + ", " + pos + ", " + alpha +");\n";
    return code;
}

Blockly.JavaScript['cube_xyz_axis_rgb'] = function (block) {
    var value = block.getFieldValue('state');
    let pos = Blockly.JavaScript.valueToCode(block, 'position', Blockly.JavaScript.ORDER_ADDITION) || "";
    let r = Blockly.JavaScript.valueToCode(block, 'r', Blockly.JavaScript.ORDER_ADDITION) || "";
    let g = Blockly.JavaScript.valueToCode(block, 'g', Blockly.JavaScript.ORDER_ADDITION) || "";
    let b = Blockly.JavaScript.valueToCode(block, 'b', Blockly.JavaScript.ORDER_ADDITION) || "";
    let code = "agmSetXYZAxisRGB(" + "'" + value + "'" + ", " + pos + ", " + r + ", " + g + ", " + b +");\n";
    return code;
}

Blockly.JavaScript['cube_xyz_shape'] = function (block) {
    let x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ADDITION) || "";
    let y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ADDITION) || "";
    let z = Blockly.JavaScript.valueToCode(block, 'z', Blockly.JavaScript.ORDER_ADDITION) || "";
    let shape = Blockly.JavaScript.valueToCode(block, 'shape', Blockly.JavaScript.ORDER_ADDITION) || "";
    if(shape < 0) {
        shape = 0;
    } else if(shape > 4) {
        shape = 4;
    }
    let code = "agmSetXYZCubeShape(" + x + ", " + y + ", " + z + ", " + shape +");\n";
    return code;
}

Blockly.JavaScript['cube_xyz_material'] = function (block) {
    let x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ADDITION) || "";
    let y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ADDITION) || "";
    let z = Blockly.JavaScript.valueToCode(block, 'z', Blockly.JavaScript.ORDER_ADDITION) || "";
    let material = Blockly.JavaScript.valueToCode(block, 'material', Blockly.JavaScript.ORDER_ADDITION) || "";
    if(material < 0) {
        material = 0;
    } else if(material > 4) {
        material = 4;
    }
    let code = "amgSetXYZmaterial(" + x + ", " + y + ", " + z + ", " + material +");\n";
    return code;
}

Blockly.JavaScript['cube_xyz_alpha'] = function (block) {
    let x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ADDITION) || "";
    let y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ADDITION) || "";
    let z = Blockly.JavaScript.valueToCode(block, 'z', Blockly.JavaScript.ORDER_ADDITION) || "";
    let alpha = Blockly.JavaScript.valueToCode(block, 'alpha', Blockly.JavaScript.ORDER_ADDITION) || "";
    alpha = alpha * 0.1;
    if(alpha < 0) {
        alpha = 0;
    } else if(alpha > 10) {
        alpha = 1;
    }
    let code = "agmSetXYZCubeAlpha(" + x + ", " + y + ", " + z + ", " + alpha +");\n";
    return code;
}

Blockly.JavaScript['cube_xyz_color_rgb'] = function (block) {
    let x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ADDITION) || "";
    let y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ADDITION) || "";
    let z = Blockly.JavaScript.valueToCode(block, 'z', Blockly.JavaScript.ORDER_ADDITION) || "";
    let r = Blockly.JavaScript.valueToCode(block, 'r', Blockly.JavaScript.ORDER_ADDITION) || "";
    let g = Blockly.JavaScript.valueToCode(block, 'g', Blockly.JavaScript.ORDER_ADDITION) || "";
    let b = Blockly.JavaScript.valueToCode(block, 'b', Blockly.JavaScript.ORDER_ADDITION) || "";
    let code = "agmSetXYZCubeRGBColor(" + x + ", " + y + ", " + z + ", " + r + ", " + g + ", " + b +");\n";
    return code;
}

Blockly.JavaScript['cube_color_rgb'] = function (block) {
    let r = Blockly.JavaScript.valueToCode(block, 'r', Blockly.JavaScript.ORDER_ADDITION) || "";
    let g = Blockly.JavaScript.valueToCode(block, 'g', Blockly.JavaScript.ORDER_ADDITION) || "";
    let b = Blockly.JavaScript.valueToCode(block, 'b', Blockly.JavaScript.ORDER_ADDITION) || "";
    let code = "agmSetCubeRGBColor(" + r + ", " + g + ", " + b + ");\n";
    return code;
}

Blockly.JavaScript['cube_alpha'] = function (block) {
    let alpha = Blockly.JavaScript.valueToCode(block, 'alpha', Blockly.JavaScript.ORDER_ADDITION) || "";
    alpha = alpha * 0.1;
    if(alpha < 0) {
        alpha = 0;
    } else if(alpha > 10) {
        alpha = 1;
    }
    let code = "agmSetCubeAlpha(" + alpha + ");\n";
    return code;
}

Blockly.JavaScript['cube_material'] = function (block) {
    let material = Blockly.JavaScript.valueToCode(block, 'material', Blockly.JavaScript.ORDER_ADDITION) || "";
    if(material < 0) {
        material = 0;
    } else if(material > 4) {
        material = 4;
    }
    let code = "amgSetmaterial(" + material + ");\n";
    return code;
}

Blockly.JavaScript['cube_shape'] = function (block) {
    let shape = Blockly.JavaScript.valueToCode(block, 'shape', Blockly.JavaScript.ORDER_ADDITION) || "";
    if(shape < 0) {
        shape = 0;
    } else if(shape > 4) {
        shape = 4;
    }
    let code = "agmSetCubeShape(" + shape + ");\n";
    return code;
}

Blockly.JavaScript['delete_cube'] = function (block) {
    let x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ADDITION) || "";
    let y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ADDITION) || "";
    let z = Blockly.JavaScript.valueToCode(block, 'z', Blockly.JavaScript.ORDER_ADDITION) || "";
    let code = "agmDeleteCube(" + x + ", " + y + ", " + z + ");\n";
    return code;
}

Blockly.JavaScript['create_cube'] = function (block) {
    let x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ADDITION) || "";
    let y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ADDITION) || "";
    let z = Blockly.JavaScript.valueToCode(block, 'z', Blockly.JavaScript.ORDER_ADDITION) || "";
    let code = "agmCreateCube(" + x + ", " + y + ", " + z + ");\n";
    return code;
}

Blockly.JavaScript['basic_input_value'] = function (block) {
    var value = block.getFieldValue('value');
    var code = value;
    return [code, Blockly.JavaScript.ORDER_ADDITION];
}

Blockly.JavaScript['basic_color_value'] = function (block) {
    var value = block.getFieldValue('value');
    var code = "'" + value + "'";
    return [code, Blockly.JavaScript.ORDER_ADDITION];
}

// operatorAssignment(variable, operator, value);
Blockly.JavaScript['operator_assignment'] = function (block) {
    var variable = Blockly.JavaScript.valueToCode(block, "variable", Blockly.JavaScript.ORDER_ADDITION) || "''";
    var operator = block.getFieldValue("operator") == "assign" ? "=" : block.getFieldValue("operator") == "addAndAssign" ? "+=" : block.getFieldValue("operator") == "minusAndAssign" ? "-=" : block.getFieldValue("operator") == "multiplyAndAssign" ? "*=" : block.getFieldValue("operator") == "divideAndAssign" ? "/=" : block.getFieldValue("operator") == "modulesAndAssign" ? "%=" : "";
    var value = Blockly.JavaScript.valueToCode(block, "value", Blockly.JavaScript.ORDER_ADDITION) || "''";
    var code = variable + " " + operator + " " + value + ";\n";
    //code += "highlightBlock('" + block.id + "');\n";
    return code;
}
// operatorAssignment2(variable, operator, value);
Blockly.JavaScript['operator_assignment2'] = function (block) {
    var variable = Blockly.JavaScript.valueToCode(block, "variable", Blockly.JavaScript.ORDER_ADDITION) || "''";
    var operator = block.getFieldValue("operator") == "assign" ? "=" : block.getFieldValue("operator") == "addAndAssign" ? "+=" : block.getFieldValue("operator") == "minusAndAssign" ? "-=" : block.getFieldValue("operator") == "multiplyAndAssign" ? "*=" : block.getFieldValue("operator") == "divideAndAssign" ? "/=" : block.getFieldValue("operator") == "modulesAndAssign" ? "%=" : "";
    var value = Blockly.JavaScript.valueToCode(block, "value", Blockly.JavaScript.ORDER_ADDITION) || "''";
    var code = variable + " " + operator + " " + value + "";
    return [code, Blockly.JavaScript.ORDER_ADDITION];
}

// operatorComparison(value1, operator1, value2);
Blockly.JavaScript['operator_comparison'] = function (block) {
    var value1 = Blockly.JavaScript.valueToCode(block, "value1", Blockly.JavaScript.ORDER_ADDITION) || "";
    var operator1 = block.getFieldValue("operator1") == "equal" ? "==" : block.getFieldValue("operator1") == "perfectEqual" ? "===" : block.getFieldValue("operator1") == "notEqual" ? "!=" : block.getFieldValue("operator1") == "greaterThan" ? ">" : block.getFieldValue("operator1") == "notLessThan" ? ">=" : block.getFieldValue("operator1") == "notGreatherThan" ? "<=" : block.getFieldValue("operator1") == "lessThan" ? "<" : ""
    var value2 = Blockly.JavaScript.valueToCode(block, "value2", Blockly.JavaScript.ORDER_ADDITION) || "";
    var code = value1 + " " + operator1 + " " + value2 + "";
    return [code, Blockly.JavaScript.ORDER_ADDITION];
}
// operatorComparison2(variable, operator, value);
Blockly.JavaScript['operator_comparison2'] = function (block) {
    var variable = Blockly.JavaScript.valueToCode(block, "variable", Blockly.JavaScript.ORDER_ADDITION) || "";

    var operator = block.getFieldValue("operator") == "equal" ? "==" : block.getFieldValue("operator") == "perfectEqual" ? "===" : block.getFieldValue("operator") == "notEqual" ? "!=" : block.getFieldValue("operator") == "greaterThan" ? ">" : block.getFieldValue("operator") == "notLessThan" ? ">=" : block.getFieldValue("operator") == "notGreatherThan" ? "<=" : block.getFieldValue("operator") == "lessThan" ? "<" : ""
    var value = Blockly.JavaScript.valueToCode(block, "value", Blockly.JavaScript.ORDER_ADDITION) || "";
    var code = variable + " " + operator + " " + value + "";
    return [code, Blockly.JavaScript.ORDER_ADDITION];
}

// controlFor("initial", "end", "step", "statements")    
Blockly.JavaScript['control_for'] = function (block) {
    if (algeoBlock.eStartstate == algeoBlock.STARTSTATE.STATE_STOP) {
        let code = "agmStop();\n";
        return code;
    }
    var initial = Blockly.JavaScript.valueToCode(block, "initial", Blockly.JavaScript.ORDER_ADDITION) || "";
    var end = Blockly.JavaScript.valueToCode(block, "end", Blockly.JavaScript.ORDER_ADDITION) || "";
    var step = Blockly.JavaScript.valueToCode(block, "step", Blockly.JavaScript.ORDER_ADDITION) || "";
    //var statements = Blockly.JavaScript.valueToCode(block, "statements", Blockly.JavaScript.ORDER_ADDITION) || "";

    var branch = Blockly.JavaScript.statementToCode(block, 'statements');
    branch = Blockly.JavaScript.addLoopTrap(branch, block.id);

    var code = "for(" + initial + " ; " + end + " ; " + step + ") {\n" + branch + "};\n";
    return code;
}