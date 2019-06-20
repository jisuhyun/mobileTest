/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2017 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Example "wait" block that will pause the interpreter for a
 * number of seconds. Because wait is a blocking behavior, such blocks will
 * only work in interpreted environments.
 *
 * See https://neil.fraser.name/software/JS-Interpreter/docs.html
 */
// Blockly.defineBlocksWithJsonArray([{
//   "type": "wait_seconds",
//   "message0": " wait %1 seconds",
//   "args0": [{
//     "type": "field_number",
//     "name": "SECONDS",
//     "min": 0,
//     "max": 600,
//     "value": 1
//   }],
//   "previousStatement": null,
//   "nextStatement": null,
//   "colour": "%{BKY_LOOPS_HUE}"
// }]);

Blockly.defineBlocksWithJsonArray([{
  "type": "wait_seconds",
  "message0": Blockly.Msg.ALGEO_NEW_SLEEP_MESSAGE,
  "args0": [{
    "type": "field_input",
    "name": "SECONDS",
    "min": 0,
    "max": 600,
    "value": 1
  }],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_LOOPS_HUE}",
  "tooltip" : Blockly.Msg.ALGEO_NEW_SLEEP_TOOLTIP
}]);

/**
 * Generator for wait block creates call to new method
 * <code>waitForSeconds()</code>.
 */
Blockly.JavaScript['wait_seconds'] = function(block) {
  if(algeoBlock.eStartstate == algeoBlock.STARTSTATE.STATE_STOP || true == algeoShellBlock.isRunOrStepRun) {
    return "";
  }
  var seconds = Number(block.getFieldValue('SECONDS'));
  //var seconds = Blockly.JavaScript.valueToCode(block, "SECONDS", Blockly.JavaScript.ORDER_ADDITION) || "''";
  var code = "waitForSeconds(" + seconds + ");\n";
  return code;
};

Blockly.defineBlocksWithJsonArray([{
  "type": "wait_seconds_basic_input",
  "message0": Blockly.Msg.ALGEO_NEW_SLEEP_MESSAGE,
  "args0": [{
    "type": "input_value",
    "name": "SECONDS",
    "min": 0,
    "max": 600,
  }],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_LOOPS_HUE}",
  "tooltip" : Blockly.Msg.ALGEO_NEW_SLEEP_TOOLTIP
}]);

/**
 * Generator for wait block creates call to new method
 * <code>waitForSeconds()</code>.
 */
Blockly.JavaScript['wait_seconds_basic_input'] = function(block) {
  if(algeoBlock.eStartstate == algeoBlock.STARTSTATE.STATE_STOP || true == algeoShellBlock.isRunOrStepRun) {
    return "";
  }
  var seconds = Blockly.JavaScript.valueToCode(block, "SECONDS", Blockly.JavaScript.ORDER_ADDITION) || "''";
  var code = "waitForSeconds(" + seconds + ");\n";
  return code;
};

/**
 * Register the interpreter asynchronous function
 * <code>waitForSeconds()</code>.
 */
function initInterpreterWaitForSeconds(interpreter, scope) {
  if(false == algeoBlock.isState || true == algeoShellBlock.isRunOrStepRun) {
    return;
  }
  // Ensure function name does not conflict with variable names.
  Blockly.JavaScript.addReservedWords('waitForSeconds');

  var wrapper = interpreter.createAsyncFunction(
    function(timeInSeconds, callback) {
      // Delay the call to the callback.
      setTimeout(callback, timeInSeconds * 1000);
    });
  interpreter.setProperty(scope, 'waitForSeconds', wrapper);
}