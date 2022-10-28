const xml = document.createElement('xml');
xml.innerHTML = `
        <category name="Structures" colour="#29741d">
            <block type="go_to" colour="#29741d">
                <value name="LOCATION">
                    <shadow type="text"></shadow>
                </value>
            </block>
            <block type="controls_if" colour="#29741d"></block>
			<block type="controls_if" colour="#29741d"><mutation else="1"></mutation></block>
            <block type="controls_repeat_ext" colour="#29741d"></block>
			<block type="controls_whileUntil" colour="#29741d"></block>
			<block type="controls_for">
				<field name="VAR">i</field>
				<value name="FROM">
				  <block type="math_number">
					<field name="NUM">1</field>
				  </block>
				</value>
				<value name="TO">
				  <block type="math_number">
					<field name="NUM">10</field>
				  </block>
				</value>
				<value name="BY">
				  <block type="math_number">
					<field name="NUM">1</field>
				  </block>
				</value>
			</block>
            <block type="controls_flow_statements">
              <field name="FLOW">BREAK</field>
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
            <block type="text_join"></block>
        </category>
		<category name="Variabile" custom="VARIABLE" colour="#56aeff"></category>
        <category name="Functions" colour="#995ba5" custom="PROCEDURE"></category>
		<!-- <category name="Citiri, afișari" colour="190">
		 	<block type="text_prompt"><field name="TYPE">NUMBER</field></block>
		 	<block type="text_print"></block>
		</category> -->
`

export default xml;