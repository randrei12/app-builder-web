import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
const {theme, ...blocks} = require('./blocks');
Object.assign(Blockly.Blocks, blocks); //adding custom blocks to blockly blocks
import * as codes from './blocks_code';
Object.assign(javascriptGenerator, codes); //adding custom blocks' code to javascript generator
import xml from './toolbox';
import { generateError } from './utils';


window.JS = javascriptGenerator;
window.workspace = Blockly.inject('blockly', { toolbox: xml, zoom: { controls: true, wheel: true, startScale: 1, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 }, theme });
window.Blockly = Blockly;
window.xml = xml;

addEventListener('elementsChange', e => {
    let copy_xml = xml.cloneNode(true);
    e.detail.forEach(element => {
        let category = document.createElement('category');
        category.setAttribute('name', element.id);
        category.setAttribute('colour', '#A8A8A8');
        copy_xml.appendChild(category);
    })
    console.log(xml, copy_xml);
    workspace.updateToolbox(copy_xml);
});



// Blockly.Msg.TEXTS_HUE = '#FFD800';
// Blockly.Msg.LOGIC_HUE = '#FFD800';
// Blockly.Msg.MATH_HUE = '#FFD800';
// Blockly.Msg.LOGIC_BOOLEAN_HELPURL = 'sdsad'
// Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP = 'hgeiuwe'