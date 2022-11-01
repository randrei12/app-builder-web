const { javascriptGenerator } = require('blockly/javascript');
const { generateError } = require('./utils');

exports.go_to = block => {
    const operator = block.getFieldValue('LOCATION');
    const text = javascriptGenerator.valueToCode(block, "LOCATION", javascriptGenerator.ORDER_NONE);
    return text ? `location = ${text} + '.html'` : generateError('"GO TO" value is invalid');
}

exports.set_timeout = block => {
    const seconds = javascriptGenerator.valueToCode(block, "TIME", javascriptGenerator.ORDER_NONE);
    let code = javascriptGenerator.statementToCode(block, 'CODE');
    return seconds ? `setTimeout(() => ${code}, ${seconds * 1000})` : generateError('"AFTER X SECONDS DO" value is invalid');
}

exports.set_interval = block => {
    const seconds = javascriptGenerator.valueToCode(block, "TIME", javascriptGenerator.ORDER_NONE);
    let code = javascriptGenerator.statementToCode(block, 'CODE');
    return seconds ? `setInterval(() => ${code}, ${seconds * 1000})` : generateError('"EACH X SECONDS DO" value is invalid');
}

exports.test_true_false = block => {
    var value_logic = javascriptGenerator.valueToCode(block, 'LOGIC', javascriptGenerator.ORDER_ATOMIC);
    var value_true = javascriptGenerator.valueToCode(block, 'TRUE', javascriptGenerator.ORDER_ATOMIC);
    var value_false = javascriptGenerator.valueToCode(block, 'FALSE', javascriptGenerator.ORDER_ATOMIC);
    return `${value_logic} ? ${value_true} : ${value_false}`;
    // console.log({value_logic, value_true, value_false});
}

exports.foreach = block => {
    var variable_element = javascriptGenerator.nameDB_.getName(block.getFieldValue('ELEMENT'), 'VARIABLE');
    var value_list = javascriptGenerator.valueToCode(block, 'LIST', javascriptGenerator.ORDER_ATOMIC);
    var statements_do = javascriptGenerator.statementToCode(block, 'DO');
    try {
        return Array.isArray(JSON.parse(value_list.replaceAll(`'`, `"`))) ? `${value_list}.forEach(${variable_element} => {${statements_do}})` : generateError(`"FOREACH X IN LIST X DO X" must have a list value`);
    } catch {
        return generateError(`"FOREACH X IN LIST X DO X" must have a list value`);
    }
}

exports.open_url = block => {
    var value_url = javascriptGenerator.valueToCode(block, 'URL', javascriptGenerator.ORDER_ATOMIC);
    var dropdown_type = block.getFieldValue('TYPE');
    return `window.open(${value_url}, '_${dropdown_type}')`;
}

exports.newline = block => '\n';

exports.colour_hsv = block => {
    const hue = javascriptGenerator.valueToCode(block, 'HUE', javascriptGenerator.ORDER_NONE) || 0;
    const saturation = javascriptGenerator.valueToCode(block, 'SATURATION', javascriptGenerator.ORDER_NONE) || 0;
    const value = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_NONE) || 0;
    const functionName = javascriptGenerator.provideFunction_('colourHsv', `
  function ${javascriptGenerator.FUNCTION_NAME_PLACEHOLDER_}(h, s, v) {
    h /= 60;
	s /= 100;
	v /= 100;
	const hi = Math.floor(h) % 6;

	const f = h - Math.floor(h);
	const p = 255 * v * (1 - s);
	const q = 255 * v * (1 - (s * f));
	const t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;


    let r, g, b;

	switch (hi) {
		case 0:
			r = v, g = t, b = p;
		case 1:
			r = q, g = v, b = p;
		case 2:
			r = p, g = v, b = t;
		case 3:
			r = p, g = q, b = v;
		case 4:
			r = t, g = p, b = v;
		case 5:
			r = v, g = p, b = q;
	}

    r = Math.max(Math.min(Number(r), 100), 0) * 2.55;
    g = Math.max(Math.min(Number(g), 100), 0) * 2.55;
    b = Math.max(Math.min(Number(b), 100), 0) * 2.55;
    r = ('0' + (Math.round(r) || 0).toString(16)).slice(-2);
    g = ('0' + (Math.round(g) || 0).toString(16)).slice(-2);
    b = ('0' + (Math.round(b) || 0).toString(16)).slice(-2);
    return '#' + r + g + b;
  }
  `);
    const code = functionName + '(' + hue + ', ' + saturation + ', ' + value + ')';
    return code;
}