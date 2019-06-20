
goog.provide('Blockly.Themes.Classic');
goog.require('Blockly.Theme');
goog.require('Blockly.Msg');
// 블럭의 Hue 색상을 지정합니다. HSV 체계. S와 V는 공통으로 지정.
Blockly.Msg.STATEMENT_HUE = "184";
Blockly.Msg.SPEECH_HUE = "#2DA4E8";
Blockly.Msg.ALGEO_HUE = "#488AD6";
Blockly.Msg.TURTLE_HUE = "#2BADD4";
Blockly.Msg.ART_HUE = "#997BD6";
Blockly.Msg.CONTROL_HUE = "#87C162";
Blockly.Msg.VARIABLE_HUE = "#19BC9D";
Blockly.Msg.RED_HUE = "355";
Blockly.Msg.FUNCTION_HUE = "#2BADD4";
Blockly.Msg.OPERATOR_HUE = "#F7AF4F";
Blockly.Msg.ARRAY_HUE = "#EBC827";
Blockly.Msg.INPUT_HUE = "#EE4F7E";

Blockly.Msg.MATH_HUE = "#F7AF4F";
Blockly.Msg.LOOPS_HUE = "#87C162";
Blockly.Msg.LISTS_HUE = "#EE5545";
Blockly.Msg.LOGIC_HUE = "#87C162";
Blockly.Msg.VARIABLES_HUE = "#19BC9D";
Blockly.Msg.TEXTS_HUE = "#5BA58C";
Blockly.Msg.SPEECH_HUE = "#FC7070";
Blockly.Msg.PROCEDURES_HUE = "#DC70AA";
Blockly.Msg.COLOUR_HUE = "#997BD6";


// 카테고리의 이름과 색상을 지정합니다.
Blockly.Msg.CATEGORY_ALGEOAPP_NAME = "Algeo";
Blockly.Msg.CATEGORY_ALGEOAPP_COLOUR = "#0081cc";

Blockly.Msg.CATEGORY_TURTLE_NAME = "Turtle";
Blockly.Msg.CATEGORY_TURTLE_COLOUR = "#4ecc00";

Blockly.Msg.CATEGORY_ART_NAME = "Art";
Blockly.Msg.CATEGORY_ART_COLOUR = "#4b00cc";

Blockly.Msg.CATEGORY_CONTROL_NAME = "Control";
Blockly.Msg.CATEGORY_CONTROL_COLOUR = "#00becc";

Blockly.Msg.CATEGORY_VARIABLE_NAME = "Variable";
Blockly.Msg.CATEGORY_VARIABLE_COLOUR = "#cc0011";

Blockly.Msg.CATEGORY_FUNCTION_NAME = "Function";
Blockly.Msg.CATEGORY_FUNCTION_COLOUR = "#9500cc";

Blockly.Msg.CATEGORY_SOUND_NAME = "Sound";
Blockly.Msg.CATEGORY_SOUND_COLOUR = "#9500cc";

Blockly.Msg.CATEGORY_GAME_NAME = "Game";
Blockly.Msg.CATEGORY_GAME_COLOUR = "#9500cc";

Blockly.Msg.CATEGORY_EVENT_NAME = "Event";
Blockly.Msg.CATEGORY_EVENT_COLOUR = "#9500cc";

Blockly.Msg.CATEGORY_SPEECH_NAME = "Speech";
Blockly.Msg.CATEGORY_SPEECH_COLOUR = "#9500cc";

Blockly.Msg.CATEGORY_OPERATOR_NAME = "Operator";
Blockly.Msg.CATEGORY_OPERATOR_COLOUR = "#cc00a3";

Blockly.Msg.CATEGORY_ARRAY_NAME = "Array";
Blockly.Msg.CATEGORY_ARRAY_COLOUR = "#ccad00";



var defaultBlockStyles = {
  "colour_blocks":{
    "colourPrimary": "#997BD6"
  },
  "list_blocks": {
    "colourPrimary": "#EE5545"
  },
  "logic_blocks": {
    "colourPrimary": "#87C162"
  },
  "loop_blocks": {
    "colourPrimary": "#87C162"
  },
  "math_blocks": {
    "colourPrimary": "#F7AF4F"
  },
  "procedure_blocks": {
    "colourPrimary": "#DC70AA"
  },
  "text_blocks": {
    "colourPrimary": "#5BA58C"
  },
  "variable_blocks": {
    "colourPrimary": "#19BC9D"
  },
  
  "variable_dynamic_blocks":{
    "colourPrimary": "310"
  },
  "hat_blocks":{
    "colourPrimary":"330",
    "hat":"cap"
  }
};

var categoryStyles = {
  "colour_category":{
    "colour": "20"
  },
  "list_category": {
    "colour": "260"
  },
  "logic_category": {
    "colour": "210"
  },
  "loop_category": {
    "colour": "120"
  },
  "math_category": {
    "colour": "230"
  },
  "procedure_category": {
    "colour": "290"
  },
  "text_category": {
    "colour": "160"
  },
  "variable_category": {
    "colour": "330"
  },
  "variable_dynamic_category":{
    "colour": "310"
  }
};

Blockly.Themes.Classic = new Blockly.Theme(defaultBlockStyles, categoryStyles);