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