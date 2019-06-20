'use strict';
var algeoCustomBlocks = [];

algeoCustomBlocks.push({
    "type": "cube_xyz_axis_shape",
    "message0": "%1값이%2의 모든 큐브 모양을%3로 설정하기",
    "args0": [
        {
            "type": "field_dropdown", 
            "name": "state",
            "options" : [["X축", "x"], ["Y축", "y"],
                        ["Z축", "z"]]
        },
        {
            "type": "input_value",
            "name": "position",
        },
        {
            "type": "input_value",
            "name": "shape",
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.COLOUR_HUE,
    "tooltip": "설정한 축의 모든 큐브의 모양을 변경합니다."
});

algeoCustomBlocks.push({
    "type": "cube_xyz_axis_material",
    "message0": "%1값이%2의 모든 큐브 재질을%3로 설정하기",
    "args0": [
        {
            "type": "field_dropdown", 
            "name": "state",
            "options" : [["X축", "x"], ["Y축", "y"],
                        ["Z축", "z"]]
        },
        {
            "type": "input_value",
            "name": "position",
        },
        {
            "type": "input_value",
            "name": "material",
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.COLOUR_HUE,
    "tooltip": "설정한 축의 모든 큐브의 재질을 변경합니다."
});

algeoCustomBlocks.push({
    "type": "cube_xyz_axis_alpha",
    "message0": "%1값이%2의 모든 큐브 투명도를%3로 설정하기",
    "args0": [
        {
            "type": "field_dropdown", 
            "name": "state",
            "options" : [["X축", "x"], ["Y축", "y"],
                        ["Z축", "z"]]
        },
        {
            "type": "input_value",
            "name": "position",
        },
        {
            "type": "input_value",
            "name": "alpha",
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.COLOUR_HUE,
    "tooltip": "설정한 축의 모든 큐브의 투명도를 변경합니다."
});

algeoCustomBlocks.push({
    "type": "cube_xyz_axis_rgb",
    "message0": "%1값이%2의 모든 큐브 색상을 ( R%3, G%4, B%5) 로 설정하기",
    "args0": [
        {
            "type": "field_dropdown", 
            "name": "state",
            "options" : [["X축", "x"], ["Y축", "y"],
                        ["Z축", "z"]]
        },
        {
            "type": "input_value",
            "name": "position",
        },
        {
            "type": "input_value",
            "name": "r",
        },
        {
            "type": "input_value",
            "name": "g",
        },
        {
            "type": "input_value",
            "name": "b",
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.COLOUR_HUE,
    "tooltip": "설정한 축의 좌표값에 있는 모든 큐브의 색상을 변경합니다."
});

algeoCustomBlocks.push({
    "type": "cube_xyz_shape",
    "lastDummyAlign0": "RIGHT",
    "message0": "(%1,%2,%3) 큐브 모양을%4로 설정하기",
    "args0": [
        {
            "type": "input_value",
            "name": "x",
        },
        {
            "type": "input_value",
            "name": "y",
        },
        {
            "type": "input_value",
            "name": "z",
        },
        {
            "type": "input_value",
            "name": "shape",
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.COLOUR_HUE,
    "tooltip": "x,y,z 큐브의 모양을 인자값으로 설정합니다."
});

algeoCustomBlocks.push({
    "type": "cube_xyz_material",
    "lastDummyAlign0": "RIGHT",
    "message0": "(%1,%2,%3) 큐브 재질을%4로 설정하기",
    "args0": [
        {
            "type": "input_value",
            "name": "x",
        },
        {
            "type": "input_value",
            "name": "y",
        },
        {
            "type": "input_value",
            "name": "z",
        },
        {
            "type": "input_value",
            "name": "material",
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.COLOUR_HUE,
    "tooltip": "x,y,z 큐브의 재질을 인자값으로 설정합니다."
});

algeoCustomBlocks.push({
    "type": "cube_xyz_alpha",
    "lastDummyAlign0": "RIGHT",
    "message0": "(%1,%2,%3) 큐브 투명도를%4로 설정하기",
    "args0": [
        {
            "type": "input_value",
            "name": "x",
        },
        {
            "type": "input_value",
            "name": "y",
        },
        {
            "type": "input_value",
            "name": "z",
        },
        {
            "type": "input_value",
            "name": "alpha",
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.COLOUR_HUE,
    "tooltip": "x,y,z 큐브의 투명도를 인자값으로 설정합니다."
});

algeoCustomBlocks.push({
    "type": "cube_xyz_color_rgb",
    "lastDummyAlign0": "RIGHT",
    "message0": "(%1,%2,%3) 큐브 색상을 ( R%4, G%5, B%6) 으로 설정하기",
    "args0": [
        {
            "type": "input_value",
            "name": "x",
        },
        {
            "type": "input_value",
            "name": "y",
        },
        {
            "type": "input_value",
            "name": "z",
        },
        {
            "type": "input_value",
            "name": "r",
        },
        {
            "type": "input_value",
            "name": "g"
        },
        {
            "type": "input_value",
            "name": "b"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.COLOUR_HUE,
    "tooltip": "x,y,z 큐브의 색상을 r,g,b로 설정합니다."
});

algeoCustomBlocks.push({
    "type": "cube_shape",
    "message0": "큐브 모양을 %1로 설정하기",
    "args0": [
        {
            "type": "input_value",
            "name": "shape"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.COLOUR_HUE,
    "tooltip": "큐브 모양을 인자값으로 설정합니다."
});

algeoCustomBlocks.push({
    "type": "cube_material",
    "message0": "큐브 재질을 %1로 설정하기",
    "args0": [
        {
            "type": "input_value",
            "name": "material"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.COLOUR_HUE,
    "tooltip": "큐브 재질을 인자값으로 설정합니다."
});

algeoCustomBlocks.push({
    "type": "cube_alpha",
    "message0": "큐브 투명도를 %1로 설정하기",
    "args0": [
        {
            "type": "input_value",
            "name": "alpha"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.COLOUR_HUE,
    "tooltip": "큐브 투명도를 인자값으로 설정합니다."
});

algeoCustomBlocks.push({
    "type": "cube_color_rgb",
    "message0": "큐브 색상을 ( R%1, G%2, B%3) 로 설정하기",
    "args0": [
        {
            "type": "input_value",
            "name": "r"
        },
        {
            "type": "input_value",
            "name": "g"
        },
        {
            "type": "input_value",
            "name": "b"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.COLOUR_HUE,
    "tooltip": "큐브의 색상을 R,G,B 인자값으로 설정합니다."
});

algeoCustomBlocks.push({
    "type": "look_view",
    "message0": "카메라를 %1에서 바라보기",
    "args0": [
        {
            "type": "field_dropdown", 
            "name": "state",
            "options" : [["앞", "front"], ["뒤", "back"],
                        ["왼쪽", "left"], ["오른쪽", "right"],
                        ["위", "top"], ["아래", "bottom"]]
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.ALGEO_HUE,
    "tooltip": "카메라를 원점복귀 시킵니다."
});

algeoCustomBlocks.push({
    "type": "look_standard",
    "message0": "카메라를 원점복귀 하기",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.ALGEO_HUE,
    "tooltip": "카메라를 원점복귀 시킵니다."
});

algeoCustomBlocks.push({
    "type": "look_zoom_in_out",
    "message0": "카메라를 %1배 만큼 %2하기",
    "args0": [
        {
            "type": "input_value",
            "name": "value"
        },
        {
            "type": "field_dropdown", 
            "name": "state",
            "options" : [["가까이", "zoomIn"], ["멀리", "zoomOut"]]
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.ALGEO_HUE,
    "tooltip": "카메라를 인자값 만큼 가까이/멀리 합니다."
});

algeoCustomBlocks.push({
    "type": "look_location",
    "message0": "카메라를 %1방향으로 %2속도만큼 자동회전 하기",
    "args0": [
        {
            "type": "field_dropdown", 
            "name": "state",
            "options" : [["시계", "turnRight"], ["반시계", "turnLeft"]]
          },
        {
            "type": "input_value",
            "name": "value"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.ALGEO_HUE,
    "tooltip": "카메라를 시계/반시계 방향으로 인자 속도만큼 자동회전 합니다."
});

algeoCustomBlocks.push({
    "type": "delete_cube",
    "message0": "(%1,%2,%3) 에 큐브 지우기",
    "args0": [
        {
            "type": "input_value",
            "name": "x"
        },
        {
            "type": "input_value",
            "name": "y"
        },
        {
            "type": "input_value",
            "name": "z"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.ALGEO_HUE,
    "tooltip": "x,y,z에 큐브를 삭제합니다."
});

algeoCustomBlocks.push({
    "type": "create_cube",
    "message0": "(%1,%2,%3) 에 큐브 만들기",
    "args0": [
        {
            "type": "input_value",
            "name": "x"
        },
        {
            "type": "input_value",
            "name": "y"
        },
        {
            "type": "input_value",
            "name": "z"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.ALGEO_HUE,
    "tooltip": "x,y,z에 큐브를 생성합니다."
});

//start block
algeoCustomBlocks.push({
    "type": "algeo_start",
    "style": {
        "hat": "cap"
    },
    "message0": Blockly.Msg.START_MESSAGE,
    "args0": [
        {
            "type": "field_dropdown",
            "name": "state",
            "options": [["Start with erasing", "START"], ["Start with keeping", "STARTKEEP"], ["Do not start", "STOP"]]
        },
        {
            "type": "field_image",
            "name": "image",
            "src": getImageResourcePath() + "flag.png",
            "width": 200,
            "height": 35,
            "alt": "*"
        }

        //"state flag"
    ],
    "nextStatement": null,
    "colour": 92,
    "tooltip": Blockly.Msg.ALGEO_START_TOOLTIP
});

algeoCustomBlocks.push({
    "type": "basic_input_value",
    "message0": Blockly.Msg.BASIC_INPUT_VALUE_MESSAGE,
    "args0": [
        {
            "type": "field_input",
            "name": "value",
            "text": ""
        }
    ],
    "inputsInline": true,
    "output": null,
    "tooliop": "값을 입력합니다.",
    "colour": Blockly.Msg.RED_HUE
});

algeoCustomBlocks.push({
    "type": "basic_color_value",
    "message0": Blockly.Msg.BASIC_COLOR_VALUE_MESSAGE,
    "args0": [
        {
            "type": "field_colour",
            "name": "value",
            "colour": "#ff0000"
        }
    ],
    "inputsInline": true,
    "output": null,
    "tooltop": "색을 입력합니다.",
    "colour": Blockly.Msg.COLOUR_HUE
});

algeoCustomBlocks.push({
    "type": "operator_assignment",
    "message0": Blockly.Msg.OPERATOR_ASSIGNMENT_MESSAGE,
    "args0": [
        {
            "type": "input_value",
            "name": "variable"
        },
        {
            "type": "field_dropdown",
            "name": "operator",
            "options": [
                [Blockly.Msg.OPERATOR_ASSIGNMENT_OPERATOR1_ASSIGN, "assign"],
                [Blockly.Msg.OPERATOR_ASSIGNMENT_OPERATOR1_ADD_AND_ASSIGN, "addAndAssign"],
                [Blockly.Msg.OPERATOR_ASSIGNMENT_OPERATOR1_MINUS_AND_ASSIGN, "minusAndAssign"],
                [Blockly.Msg.OPERATOR_ASSIGNMENT_OPERATOR1_MULTIPLY_AND_ASSIGN, "multiplyAndAssign"],
                [Blockly.Msg.OPERATOR_ASSIGNMENT_OPERATOR1_DIVIDE_AND_ASSIGN, "divideAndAssign"],
                [Blockly.Msg.OPERATOR_ASSIGNMENT_OPERATOR1_MODULES_AND_ASSIGN, "modulesAndAssign"]
            ]
        },
        {
            "type": "input_value",
            "name": "value"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Msg.OPERATOR_HUE,
    "tooltip": Blockly.Msg.OPERATOR_ASSIGNMENT_TOOLTIP,
});

algeoCustomBlocks.push({
    "type": "operator_assignment2",
    "message0": Blockly.Msg.OPERATOR_ASSIGNMENT2_MESSAGE,
    "args0": [
        {
            "type": "input_value",
            "name": "variable"
        },
        {
            "type": "field_dropdown",
            "name": "operator",
            "options": [
                [Blockly.Msg.OPERATOR_ASSIGNMENT_OPERATOR1_ASSIGN, "assign"],
                [Blockly.Msg.OPERATOR_ASSIGNMENT_OPERATOR1_ADD_AND_ASSIGN, "addAndAssign"],
                [Blockly.Msg.OPERATOR_ASSIGNMENT_OPERATOR1_MINUS_AND_ASSIGN, "minusAndAssign"],
                [Blockly.Msg.OPERATOR_ASSIGNMENT_OPERATOR1_MULTIPLY_AND_ASSIGN, "multiplyAndAssign"],
                [Blockly.Msg.OPERATOR_ASSIGNMENT_OPERATOR1_DIVIDE_AND_ASSIGN, "divideAndAssign"],
                [Blockly.Msg.OPERATOR_ASSIGNMENT_OPERATOR1_MODULES_AND_ASSIGN, "modulesAndAssign"]
            ]
        },
        {
            "type": "input_value",
            "name": "value"
        }
    ],
    "inputsInline": true,
    "output": null,
    "colour": Blockly.Msg.OPERATOR_HUE,
    "tooltip": Blockly.Msg.OPERATOR_ASSIGNMENT2_TOOLTIP,
});

algeoCustomBlocks.push({
    "type": "control_for",
    "message0": Blockly.Msg.CONTROL_FOR_TITLE,
    "args0": [
        {
            "type": "input_value",
            "name": "initial"
        },
        {
            "type": "input_value",
            "name": "end"
        },
        {
            "type": "input_value",
            "name": "step"
        },
    ],
    "inputsInline": true,
    "message1": Blockly.Msg.CONTROL_FOR_INPUT_DO,
    "args1": [{
        "type": "input_statement",
        "name": "statements"
    }],
    "colour": Blockly.Msg.CONTROL_HUE,
    "tooltip": Blockly.Msg.CONTROL_FOR_TOOLTIP,
    "previousStatement": null,
    "nextStatement": null,
});

algeoCustomBlocks.push({
    "type": "operator_comparison",
    "message0": Blockly.Msg.OPERATOR_COMPARISON_MESSAGE,
    "args0": [
        {
            "type": "input_value",
            "name": "value1"
        },
        {
            "type": "field_dropdown",
            "name": "operator1",
            "options": [
                [Blockly.Msg.OPERATOR_COMPARISON_OPERATOR1_EQUAL, "equal"],
                [Blockly.Msg.OPERATOR_COMPARISON_OPERATOR1_PERFECT_EQUAL, "perfectEqual"],
                [Blockly.Msg.OPERATOR_COMPARISON_OPERATOR1_NOT_EQUAL, "notEqual"],
                [Blockly.Msg.OPERATOR_COMPARISON_OPERATOR1_GREATHER_THAN, "greaterThan"],
                [Blockly.Msg.OPERATOR_COMPARISON_OPERATOR1_NOT_LESS_THAN, "notLessThan"],
                [Blockly.Msg.OPERATOR_COMPARISON_OPERATOR1_LESS_THAN, "lessThan"],
                [Blockly.Msg.OPERATOR_COMPARISON_OPERATOR1_NOT_GREATHER_THAN, "notGreatherThan"]
            ]
        },
        {
            "type": "input_value",
            "name": "value2"
        }
    ],
    "inputsInline": true,
    "output": null,
    "colour": Blockly.Msg.OPERATOR_HUE,
    "tooltip": Blockly.Msg.OPERATOR_COMPARISON_TOOLTIP,
});


algeoCustomBlocks.push({
    "type": "operator_comparison2",
    "message0": Blockly.Msg.OPERATOR_COMPARISON2_MESSAGE,
    "args0": [
        {
            "type": "input_value",
            "name": "variable"
        },
        {
            "type": "field_dropdown",
            "name": "operator",
            "options": [
                [Blockly.Msg.OPERATOR_COMPARISON_OPERATOR1_EQUAL, "equal"],
                [Blockly.Msg.OPERATOR_COMPARISON_OPERATOR1_PERFECT_EQUAL, "perfectEqual"],
                [Blockly.Msg.OPERATOR_COMPARISON_OPERATOR1_NOT_EQUAL, "notEqual"],
                [Blockly.Msg.OPERATOR_COMPARISON_OPERATOR1_GREATHER_THAN, "greaterThan"],
                [Blockly.Msg.OPERATOR_COMPARISON_OPERATOR1_NOT_LESS_THAN, "notLessThan"],
                [Blockly.Msg.OPERATOR_COMPARISON_OPERATOR1_LESS_THAN, "lessThan"],
                [Blockly.Msg.OPERATOR_COMPARISON_OPERATOR1_NOT_GREATHER_THAN, "notGreatherThan"]
            ]
        },
        {
            "type": "input_value",
            "name": "value"
        }
    ],
    "inputsInline": true,
    "output": null,
    "colour": Blockly.Msg.OPERATOR_HUE,
    "tooltip": Blockly.Msg.OPERATOR_COMPARISON2_TOOLTIP,
});

Blockly.defineBlocksWithJsonArray(algeoCustomBlocks);