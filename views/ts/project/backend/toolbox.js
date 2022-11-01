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
    <block type="foreach"></block>
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
    <block type="set_interval" colour="#29b33b">
        <value name="TIME">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
    </block>
    <block type="test_true_false"></block>
    <block type="open_url">
        <value name="URL">
            <shadow type="text">
                <field name="TEXT">https://www.google.com</field>
            </shadow>
        </value>
    </block>
</category>
<category name="Logic" colour="#00C7FF">
    <block type="logic_compare">
        <field name="OP">EQ</field>
        <value name="A">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="B">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>
    <block type="logic_compare">
        <field name="OP">LT</field>
        <value name="A">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="B">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>
    <block type="logic_compare">
        <field name="OP">GT</field>
        <value name="A">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="B">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>
    <block type="logic_operation"><field name="OP">AND</field></block>
    <block type="logic_operation"><field name="OP">OR</field></block>
    <block type="logic_boolean"><field name="BOOL">TRUE</field></block>
    <block type="logic_boolean"><field name="BOOL">FALSE</field></block>
    <block type="logic_negate"></block>
</category>
<category name="Math" colour="#12159f">
    <block type="math_number"></block>
    <block type="math_constant"></block>
    <block type="math_arithmetic">
        <field name="OP">ADD</field>
        <value name="A">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="B">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>
    <block type="math_arithmetic">
        <field name="OP">MINUS</field>
        <value name="A">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="B">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>
    <block type="math_arithmetic">
        <field name="OP">MULTIPLY</field>
        <value name="A">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="B">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>
    <block type="math_arithmetic">
        <field name="OP">DIVIDE</field>
        <value name="A">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="B">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>
    <block type="math_arithmetic">
        <field name="OP">POWER</field>
        <value name="A">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="B">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>
    <block type="math_modulo"></block>
    <block type="math_round"></block>
    <block type="math_single"></block>
    <block type="math_trig"></block>
    <block type="math_number_property"></block>
    <block type="math_random_int"></block>
</category>
<category name="Text" colour="#ac8304">
    <block type="text"></block>
    <!-- <block type="text_multiline"></block> -->
    <block type="text_join">
        <value name="ADD0">
            <block type="text">
                <field name="TEXT">Hello,</field>
            </block>
        </value>
        <value name="ADD1">
            <block type="text">
                <field name="TEXT">World!</field>
            </block>
        </value>
    </block>
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
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
        <value name="FIND">
            <shadow type="text">
                <field name="TEXT">abc</field>
            </shadow>
        </value>
    </block>
    <block type="text_charAt">
        <value name="VALUE">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
    </block>
    <block type="text_getSubstring">
        <value name="STRING">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
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
    <block type="newline"></block>
</category>
<category name="Lists" colour="#FFA100">
    <block type="lists_create_with">
        <mutation items="3">
        </mutation>
        <value name="ADD0">
            <block type="text">
                <field name="TEXT">a</field>
            </block>
        </value>
        <value name="ADD1">
            <block type="text">
                <field name="TEXT">b</field>
            </block>
        </value>
        <value name="ADD2">
            <block type="text">
                <field name="TEXT">c</field>
            </block>
        </value>
    </block>
    <block type="lists_create_with">
        <mutation items="0"></mutation>
    </block>
    <block type="math_on_list"><field name="OP">RANDOM</field></block>
    <block type="lists_length">
        <value name="VALUE">
            <block type="lists_create_with">
                <mutation items="2"></mutation>
                <value name="ADD0">
                    <block type="text">
                        <field name="TEXT">a</field>
                    </block>
                </value>
                <value name="ADD1">
                    <block type="text">
                        <field name="TEXT">b</field>
                    </block>
                </value>
            </block>
        </value>
    </block>
    <!-- <block type="list_shuffle">
        <value name="LIST">
            <block type="lists_create_with">
                <mutation items="3"></mutation>
                <value name="ADD0">
                    <block type="math_number">
                        <field name="NUM">1</field>
                    </block>
                </value>
                <value name="ADD1">
                    <block type="math_number">
                        <field name="NUM">2</field>
                    </block>
                </value>
                <value name="ADD2">
                    <block type="math_number">
                        <field name="NUM">3</field>
                    </block>
                </value>
            </block>
        </value>
    </block> -->
    <!-- <block type="list_contains">
        <value name="LIST">
            <block type="lists_create_with">
                <mutation items="2"></mutation>
                <value name="ADD0">
                    <block type="text">
                        <field name="TEXT">a</field>
                    </block>
                </value>
                <value name="ADD1">
                    <block type="text">
                        <field name="TEXT">b</field>
                    </block>
                </value>
            </block>
        </value>
        <value name="ITEM">
            <shadow type="text">
                <field name="TEXT">b</field>
            </shadow>
        </value>
    </block> -->
    <block type="lists_indexOf">
        <field name="END">FIRST
        </field>
        <value name="VALUE">
            <block type="lists_create_with">
                <mutation items="2"></mutation>
                <value name="ADD0">
                    <block type="text">
                        <field name="TEXT">a</field>
                    </block>
                </value>
                <value name="ADD1">
                    <block type="text">
                        <field name="TEXT">b</field>
                    </block>
                </value>
            </block>
        </value>
        <value name="FIND">
            <shadow type="text">
                <field name="TEXT">b</field>
            </shadow>
        </value>
    </block>
    <block type="lists_getIndex">
        <mutation statement="false" at="true"></mutation>
        <field name="MODE">GET</field>
        <field name="WHERE">FROM_START</field>
        <value name="VALUE">
            <block type="lists_create_with">
                <mutation items="2"></mutation>
                <value name="ADD0">
                    <block type="text">
                        <field name="TEXT">a</field>
                    </block>
                </value>
                <value name="ADD1">
                    <block type="text">
                        <field name="TEXT">b</field>
                    </block>
                </value>
            </block>
        </value>
        <value name="AT">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>
    <block type="lists_setIndex">
        <mutation at="false"></mutation>
        <field name="MODE">INSERT</field>
        <field name="WHERE">LAST</field>
        <value name="TO">
            <shadow type="text">
                <field name="TEXT">abc</field>
            </shadow>
        </value>
    </block>
    <block type="lists_setIndex">
        <mutation at="true"></mutation>
        <field name="MODE">SET</field>
        <field name="WHERE">FROM_START</field>
        <value name="AT">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="TO">
            <shadow type="text">
                <field name="TEXT">a</field>
            </shadow>
        </value>
    </block>
    <block type="lists_getIndex">
        <mutation statement="true" at="true"></mutation>
        <field name="MODE">REMOVE</field>
        <field name="WHERE">FROM_START</field>
        <value name="AT">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>
    <block type="math_on_list">
        <mutation op="SUM"></mutation>
        <field name="OP">SUM</field>
    </block>
    <block type="lists_sort">
        <field name="TYPE">NUMERIC</field>
        <field name="DIRECTION">1</field>
        <value name="LIST">
            <block type="lists_create_with">
                <mutation items="2"></mutation>
                <value name="ADD0">
                    <block type="text">
                        <field name="TEXT">a</field>
                    </block>
                </value>
                <value name="ADD1">
                    <block type="text">
                        <field name="TEXT">b</field>
                    </block>
                </value>
            </block>
            </block>
        </value>
    </block>
    <block type="lists_getSublist">
        <mutation at1="true" at2="true"></mutation>
        <field name="WHERE1">FROM_START</field>
        <field name="WHERE2">FROM_START</field>
        <value name="LIST">
            <block type="lists_create_with">
                <mutation items="3"></mutation>
                <value name="ADD0">
                    <block type="text">
                        <field name="TEXT">a</field>
                    </block>
                </value>
                <value name="ADD1">
                    <block type="text">
                        <field name="TEXT">b</field>
                    </block>
                </value>
                <value name="ADD2">
                    <block type="text">
                        <field name="TEXT">c</field>
                    </block>
                </value>
            </block>
        </value>
        <value name="AT1">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="AT2">
            <shadow type="math_number">
                <field name="NUM">2</field>
            </shadow>
        </value>
    </block>
    <!-- <block type="list_generate_num_list">
        <value name="START_NUM">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="END_NUM">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
        <value name="INCREMENT">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block> -->
    <block type="lists_repeat">
        <value name="NUM">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
        <value name="ITEM">
            <shadow type="text">
                <field name="TEXT">a</field>
            </shadow>
        </value>
    </block>
    <block type="lists_split">
        <mutation mode="SPLIT"></mutation>
        <field name="MODE">SPLIT</field>
        <value name="DELIM">
            <shadow type="text">
                <field name="TEXT">,</field>
            </shadow>
        </value>
    </block>
    <block type="lists_isEmpty"></block>
</category>
<category name="Variables" custom="VARIABLE" colour="#56aeff"></category>
<category name="Functions" colour="#deb569" custom="PROCEDURE"></category>
<sep></sep>
`;

export default xml;