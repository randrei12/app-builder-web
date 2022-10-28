import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
console.log(javascriptGenerator);
import xml from './toolbox';
import { generateError } from './utils';
console.log(Blockly);
Blockly.Blocks['go_to'] = {
    init: function () {
        this.jsonInit({
            "type": "go_to",
            "message0": "Go to %1 %2",
            "args0": [
              {
                "type": "input_value",
                "name": "LOCATION",
                "check": "String"
              },
              {
                "type": "input_dummy",
                "name": "VALUE",
              }
            ],
            "previousStatement": null,
            "colour": '#29741d',
            "tooltip": "",
            "helpUrl": ""
        });
    }
};

javascriptGenerator['go_to'] = block => {
    const operator = block.getFieldValue('LOCATION');
    const text = javascriptGenerator.valueToCode(block, "LOCATION", javascriptGenerator.ORDER_NONE);
    return text ? `location = ${text} + '.html'` : generateError('"GO TO" value is invalid');
}

window.workspace = Blockly.inject('blockly', { toolbox: xml, zoom: { controls: true, wheel: true, startScale: 1, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 } });
window.Blockly = Blockly;

console.log(workspace);