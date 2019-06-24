var algeoBlock = {};

algeoBlock.eStartstate = 0;

algeoBlock.STARTSTATE = {
    STATE_START : 0,
    STATE_STARTKEEP : 1,
    STATE_STOP : 2,
    STATE_NONE : 3
};

algeoBlock.createVariable = function () {
   Blockly.Variables.createVariable(algeoBlock.workspace, null);
}

algeoBlock.tb = '<xml id="toolbox" style="display: none">';

algeoBlock.tb += '    <category name="' + Blockly.Msg.CATEGORY_ALGEOAPP_NAME + '">';
algeoBlock.tb += '            <block type="create_cube">';
algeoBlock.tb += '                <value name="x">';
algeoBlock.tb += '                    <block type="basic_input_value">';
algeoBlock.tb += '                        <field name="value">0</field>';
algeoBlock.tb += '                    </block>';
algeoBlock.tb += '                </value>';
algeoBlock.tb += '                <value name="y">';
algeoBlock.tb += '                    <block type="basic_input_value">';
algeoBlock.tb += '                        <field name="value">0</field>';
algeoBlock.tb += '                    </block>';
algeoBlock.tb += '                </value>';
algeoBlock.tb += '                <value name="z">';
algeoBlock.tb += '                    <block type="basic_input_value">';
algeoBlock.tb += '                        <field name="value">0</field>';
algeoBlock.tb += '                    </block>';
algeoBlock.tb += '                </value>';
algeoBlock.tb += '            </block>';

algeoBlock.tb += '            <block type="delete_cube">';
algeoBlock.tb += '                <value name="x">';
algeoBlock.tb += '                    <block type="basic_input_value">';
algeoBlock.tb += '                        <field name="value">0</field>';
algeoBlock.tb += '                    </block>';
algeoBlock.tb += '                </value>';
algeoBlock.tb += '                <value name="y">';
algeoBlock.tb += '                    <block type="basic_input_value">';
algeoBlock.tb += '                        <field name="value">0</field>';
algeoBlock.tb += '                    </block>';
algeoBlock.tb += '                </value>';
algeoBlock.tb += '                <value name="z">';
algeoBlock.tb += '                    <block type="basic_input_value">';
algeoBlock.tb += '                        <field name="value">0</field>';
algeoBlock.tb += '                    </block>';
algeoBlock.tb += '                </value>';
algeoBlock.tb += '            </block>';

algeoBlock.tb += '            <block type="look_view">';
algeoBlock.tb += '              <field name="state">front</field>';
algeoBlock.tb += '            </block>';

algeoBlock.tb += '            <block type="look_standard">';
algeoBlock.tb += '            </block>';

algeoBlock.tb += '            <block type="look_zoom_in_out">';
algeoBlock.tb += '              <value name="value">';
algeoBlock.tb += '                  <block type="basic_input_value">';
algeoBlock.tb += '                      <field name="value">2</field>';
algeoBlock.tb += '                  </block>';
algeoBlock.tb += '              </value>';
algeoBlock.tb += '              <field name="state">zoomIn</field>';
algeoBlock.tb += '            </block>';

// algeoBlock.tb += '            <block type="look_location">';
// algeoBlock.tb += '              <field name="state">turnRight</field>';
// algeoBlock.tb += '              <value name="value">';
// algeoBlock.tb += '                  <block type="basic_input_value">';
// algeoBlock.tb += '                      <field name="value">10</field>';
// algeoBlock.tb += '                  </block>';
// algeoBlock.tb += '              </value>';
// algeoBlock.tb += '            </block>';

algeoBlock.tb += '            <block type="basic_input_value">';
algeoBlock.tb += '                <field name="value">0</field>';
algeoBlock.tb += '            </block>';

algeoBlock.tb += '    </category>';

algeoBlock.tb += '    <category name="%{BKY_CATVARIABLES}" custom="VARIABLE">';
algeoBlock.tb += '    </category>';

algeoBlock.tb += '    <category name="' + Blockly.Msg.CATEGORY_CONTROL_NAME + '">';
algeoBlock.tb += '           <block type="controls_repeat_ext">';
algeoBlock.tb += '                   <value name="TIMES">';
algeoBlock.tb += '                     <shadow type="math_number">';
algeoBlock.tb += '                       <field name="NUM">10</field>';
algeoBlock.tb += '                     </shadow>';
algeoBlock.tb += '                    <block type="basic_input_value">';
algeoBlock.tb += '                        <field name="value">10</field>';
algeoBlock.tb += '                    </block>';
algeoBlock.tb += '                   </value>';
algeoBlock.tb += '           </block>';

algeoBlock.tb += '           <block type="controls_whileUntil"></block>';

algeoBlock.tb += '            <block type="control_for">';
algeoBlock.tb += '                <value name="initial">';
algeoBlock.tb += '                    <block type="operator_assignment2">';
algeoBlock.tb += '                        <value name="variable">';
algeoBlock.tb += '                            <block type="variables_get"></block>';
algeoBlock.tb += '                        </value>';
algeoBlock.tb += '                        <field name="operator">assign</field>';
algeoBlock.tb += '                        <value name="value">';
algeoBlock.tb += '                            <block type="basic_input_value">';
algeoBlock.tb += '                                <field name="value">0</field>';
algeoBlock.tb += '                            </block>';
algeoBlock.tb += '                        </value>';
algeoBlock.tb += '                    </block>';
algeoBlock.tb += '                </value>';
algeoBlock.tb += '                <value name="end">';
algeoBlock.tb += '                    <block type="operator_comparison2">';
algeoBlock.tb += '                        <value name="variable">';
algeoBlock.tb += '                            <block type="variables_get"></block>';
algeoBlock.tb += '                        </value>';
algeoBlock.tb += '                        <field name="operator">lessThan</field>';
algeoBlock.tb += '                        <value name="value">';
algeoBlock.tb += '                            <block type="basic_input_value">';
algeoBlock.tb += '                                <field name="value">10</field>';
algeoBlock.tb += '                            </block>';
algeoBlock.tb += '                        </value>';
algeoBlock.tb += '                    </block>';
algeoBlock.tb += '                </value>';
algeoBlock.tb += '                <value name="step">';
algeoBlock.tb += '                    <block type="operator_assignment2">';
algeoBlock.tb += '                        <value name="variable">';
algeoBlock.tb += '                            <block type="variables_get"></block>';
algeoBlock.tb += '                        </value>';
algeoBlock.tb += '                        <field name="operator">addAndAssign</field>';
algeoBlock.tb += '                        <value name="value">';
algeoBlock.tb += '                            <block type="basic_input_value">';
algeoBlock.tb += '                                <field name="value">1</field>';
algeoBlock.tb += '                            </block>';
algeoBlock.tb += '                        </value>';
algeoBlock.tb += '                    </block>';
algeoBlock.tb += '                </value>';
algeoBlock.tb += '            </block>';
algeoBlock.tb += '                 <block type="controls_flow_statements"></block>';
algeoBlock.tb += '                 <block type="controls_if"></block>';
algeoBlock.tb += '                 <block type="logic_compare">';
algeoBlock.tb += '                       <value name="A">';
algeoBlock.tb += '                           <block type="variables_get"></block>';
algeoBlock.tb += '                       </value>';
algeoBlock.tb += '                       <value name="B">';
algeoBlock.tb += '                           <shadow type="math_number">';
algeoBlock.tb += '                             <field name="NUM">5</field>';
algeoBlock.tb += '                           </shadow>';
algeoBlock.tb += '                        <block type="basic_input_value">';
algeoBlock.tb += '                            <field name="value">5</field>';
algeoBlock.tb += '                        </block>';
algeoBlock.tb += '                       </value>';
algeoBlock.tb += '                 </block>';
algeoBlock.tb += '                 <block type="logic_operation">';
algeoBlock.tb += '                       <value name="A">';
algeoBlock.tb += '                           <block type="variables_get"></block>';
algeoBlock.tb += '                       </value>';
algeoBlock.tb += '                       <value name="B">';
algeoBlock.tb += '                           <block type="logic_boolean"></block>';
algeoBlock.tb += '                       </value>';
algeoBlock.tb += '                 </block>';
algeoBlock.tb += '                 <block type="logic_boolean"></block>';
algeoBlock.tb += '                 <block type="wait_seconds_basic_input">';
algeoBlock.tb += '                   <value name="SECONDS">';
algeoBlock.tb += '                        <block type="basic_input_value">';
algeoBlock.tb += '                            <field name="value">1.5</field>';
algeoBlock.tb += '                        </block>';
algeoBlock.tb += '                    </value>';
algeoBlock.tb += '                 </block>';
algeoBlock.tb += '    </category>';

algeoBlock.tb += '    <category name="' + Blockly.Msg.CATEGORY_ART_NAME + '">';
algeoBlock.tb += '            <block type="basic_color_value"></block>';
algeoBlock.tb += '            <block type="colour_random"></block>';
algeoBlock.tb += '            <block type="colour_rgb">';
algeoBlock.tb += '                    <value name="RED">';
algeoBlock.tb += '                          <shadow type="basic_input_value">';
algeoBlock.tb += '                              <field name="value">100</field>';
algeoBlock.tb += '                          </shadow>';
algeoBlock.tb += '                    </value>';
algeoBlock.tb += '                    <value name="GREEN">';
algeoBlock.tb += '                          <shadow type="basic_input_value">';
algeoBlock.tb += '                              <field name="value">50</field>';
algeoBlock.tb += '                          </shadow>';
algeoBlock.tb += '                    </value>';
algeoBlock.tb += '                    <value name="BLUE">';
algeoBlock.tb += '                          <shadow type="basic_input_value">';
algeoBlock.tb += '                              <field name="value">0</field>';
algeoBlock.tb += '                          </shadow>';
algeoBlock.tb += '                    </value>';
algeoBlock.tb += '             </block>';
algeoBlock.tb += '             <block type="colour_blend">';
algeoBlock.tb += '                 <value name="COLOUR1">';
algeoBlock.tb += '                     <shadow type="colour_picker">';
algeoBlock.tb += '                       <field name="COLOUR">#ff0000</field>';
algeoBlock.tb += '                     </shadow>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="COLOUR2">';
algeoBlock.tb += '                     <shadow type="colour_picker">';
algeoBlock.tb += '                       <field name="COLOUR">#3333ff</field>';
algeoBlock.tb += '                     </shadow>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="RATIO">';
algeoBlock.tb += '                     <shadow type="basic_input_value">';
algeoBlock.tb += '                       <field name="value">0.5</field>';
algeoBlock.tb += '                     </shadow>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '             </block>';

algeoBlock.tb += '             <block type="cube_shape">';
algeoBlock.tb += '                 <value name="shape">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '             </block>';
 
algeoBlock.tb += '             <block type="cube_material">';
algeoBlock.tb += '                 <value name="material">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '             </block>';
 
algeoBlock.tb += '             <block type="cube_alpha">';
algeoBlock.tb += '                 <value name="alpha">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">5</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '             </block>';
 
algeoBlock.tb += '             <block type="cube_color_rgb">';
algeoBlock.tb += '                 <value name="r">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">1</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="g">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">1</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="b">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">1</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '             </block>';

algeoBlock.tb += '             <block type="cube_xyz_color_rgb">';
algeoBlock.tb += '                 <value name="x">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="y">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="z">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="r">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="g">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="b">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '             </block>';

algeoBlock.tb += '             <block type="cube_xyz_alpha">';
algeoBlock.tb += '                 <value name="x">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="y">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="z">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="alpha">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">5</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '             </block>';

algeoBlock.tb += '             <block type="cube_xyz_material">';
algeoBlock.tb += '                 <value name="x">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="y">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="z">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="material">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '             </block>';

algeoBlock.tb += '             <block type="cube_xyz_shape">';
algeoBlock.tb += '                 <value name="x">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="y">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="z">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="shape">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '             </block>';

algeoBlock.tb += '             <block type="cube_xyz_axis_rgb">';
algeoBlock.tb += '                 <field name="state">x</field>';
algeoBlock.tb += '                 <value name="position">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="r">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">255</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="g">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">100</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="b">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">50</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '             </block>';

algeoBlock.tb += '             <block type="cube_xyz_axis_alpha">';
algeoBlock.tb += '                 <field name="state">x</field>';
algeoBlock.tb += '                 <value name="position">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="alpha">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">5</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '             </block>';
 
algeoBlock.tb += '             <block type="cube_xyz_axis_material">';
algeoBlock.tb += '                 <field name="state">x</field>';
algeoBlock.tb += '                 <value name="position">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="material">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '             </block>';

algeoBlock.tb += '             <block type="cube_xyz_axis_shape">';
algeoBlock.tb += '                 <field name="state">x</field>';
algeoBlock.tb += '                 <value name="position">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '                 <value name="shape">';
algeoBlock.tb += '                     <block type="basic_input_value">';
algeoBlock.tb += '                         <field name="value">0</field>';
algeoBlock.tb += '                     </block>';
algeoBlock.tb += '                 </value>';
algeoBlock.tb += '             </block>';

algeoBlock.tb += '    </category>';

algeoBlock.tb += '    <category name="' + Blockly.Msg.CATEGORY_FUNCTION_NAME + '" custom="PROCEDURE">';
algeoBlock.tb += '    </category>';

algeoBlock.tb += '</xml>';