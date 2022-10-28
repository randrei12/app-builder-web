const xml = document.createElement('xml');
xml.innerHTML = `
<category name="Structures" colour="#29b33b">
    <block type="go_to" colour="#29b33b">
        <value name="LOCATION">
            <shadow type="text"></shadow>
        </value>
    </block>
    <block type="controls_if"></block>
    <block type="controls_if"><mutation else="1"></mutation></block>
    <block type="controls_repeat_ext" colour="#29741d">
        <value name="TIMES">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
    </block>
    <block type="controls_whileUntil" colour="#29741d"></block>
    <block type="controls_for">
        <field name="VAR">i</field>
        <value name="FROM">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="TO">
            <shadow type="math_number">
                <field name="NUM">10</field>
            </shadow>
        </value>
        <value name="BY">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>
    <block type="controls_flow_statements">
        <field name="FLOW">BREAK</field>
    </block>
    <block type="set_timeout" colour="#29b33b">
        <value name="TIME">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>

    </block>
</category>
<category name="Logic" colour="200">
    <block type="logic_compare"><field name="OP">EQ</field></block>
    <block type="logic_compare"><field name="OP">LT</field></block>
    <block type="logic_compare"><field name="OP">GT</field></block>
    <block type="logic_boolean"><field name="BOOL">TRUE</field></block>
    <block type="logic_boolean"><field name="BOOL">FALSE</field></block>
    <block type="logic_operation"><field name="OP">AND</field></block>
    <block type="logic_operation"><field name="OP">OR</field></block>
    <block type="logic_negate"></block>
</category>
<category name="Math" colour="230">
    <block type="math_number"></block>
    <block type="math_constant"></block>
    <block type="math_arithmetic"><field name="OP">ADD</field></block>
    <block type="math_arithmetic"><field name="OP">MINUS</field></block>
    <block type="math_arithmetic"><field name="OP">MULTIPLY</field></block>
    <block type="math_arithmetic"><field name="OP">DIVIDE</field></block>
    <block type="math_arithmetic"><field name="OP">POWER</field></block>
    <block type="math_modulo"></block>
    <block type="math_round"></block>
    <block type="math_single"></block>
    <block type="math_trig"></block>
    <block type="math_number_property"></block>
    <block type="math_random_int"></block>
</category>
<category name="Text" colour="20">
    <block type="text"></block>
    <!-- <block type="text_multiline"></block> -->
    <block type="text_join"></block>
    <block type="text_append">
    <value name="TEXT">
        <shadow type="text"></shadow>
    </value>
    </block>
    <block type="text_length">
    <value name="VALUE">
        <shadow type="text">
        <field name="TEXT">abc</field>
        </shadow>
    </value>
    </block>
    <block type="text_isEmpty">
    <value name="VALUE">
        <shadow type="text">
        <field name="TEXT"></field>
        </shadow>
    </value>
    </block>
    <block type="text_indexOf">
    <value name="VALUE">
        <block type="variables_get">
        <field name="VAR">text</field>
        </block>
    </value>
    <value name="FIND">
        <shadow type="text">
        <field name="TEXT">abc</field>
        </shadow>
    </value>
    </block>
    <block type="text_charAt">
    <value name="VALUE">
        <block type="variables_get">
        <field name="VAR">text</field>
        </block>
    </value>
    </block>
    <block type="text_getSubstring">
    <value name="STRING">
        <block type="variables_get">
        <field name="VAR">text</field>
        </block>
    </value>
    </block>
    <block type="text_changeCase">
    <value name="TEXT">
        <shadow type="text">
        <field name="TEXT">abc</field>
        </shadow>
    </value>
    </block>
    <block type="text_trim">
    <value name="TEXT">
        <shadow type="text">
        <field name="TEXT">abc</field>
        </shadow>
    </value>
    </block>
    <block type="text_count">
    <value name="SUB">
        <shadow type="text"></shadow>
    </value>
    <value name="TEXT">
        <shadow type="text"></shadow>
    </value>
    </block>
    <block type="text_replace">
    <value name="FROM">
        <shadow type="text"></shadow>
    </value>
    <value name="TO">
        <shadow type="text"></shadow>
    </value>
    <value name="TEXT">
        <shadow type="text"></shadow>
    </value>
    </block>
    <block type="text_reverse">
    <value name="TEXT">
        <shadow type="text"></shadow>
    </value>
    </block>
</category>
<category name="Variabile" custom="VARIABLE" colour="#56aeff"></category>
<category name="Functions" colour="#995ba5" custom="PROCEDURE"></category>
`

export default xml;