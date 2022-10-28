const { javascriptGenerator } = require('blockly/javascript');

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

