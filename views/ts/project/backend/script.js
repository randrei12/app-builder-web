import Blockly from 'blockly';
import HTMLConverter from '../../functional/converters/html';
import JSConverter from '../../functional/converters/javascript';
import { javascriptGenerator } from 'blockly/javascript';
const {theme, ...blocks} = require('./blocks');
Object.assign(Blockly.Blocks, blocks); //adding custom blocks to blockly blocks
import * as codes from './blocks_code';
Object.assign(javascriptGenerator, codes); //adding custom blocks' code to javascript generator
import xml from './toolbox';
import { generateError } from './utils';

let jsCompileTemplate = {};

window.JS = javascriptGenerator;
window.workspace = Blockly.inject('blockly', { toolbox: xml, zoom: { controls: true, wheel: true, startScale: 1, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 }, theme });
window.Blockly = Blockly;
window.xml = xml;

addEventListener('elementsChange', e => {
    jsCompileTemplate.nodes = [];
    htmlConverter.setTarget(e.detail[0]);
    let copy_xml = xml.cloneNode(true);
    e.detail.forEach(element => {
        jsCompileTemplate.nodes.push(element.id);
        let category = document.createElement('category');
        category.setAttribute('name', element.id);
        category.setAttribute('colour', '#A8A8A8');
        copy_xml.appendChild(category);
    });
    workspace.updateToolbox(copy_xml);
});

const convertBtn = document.querySelector('#convertBtn');

const htmlConverter = new HTMLConverter();
const jsConverter = new JSConverter();
jsConverter.setTemplate(jsCompileTemplate);

convertBtn.addEventListener('click', () => {
    const jsCode = jsConverter.convert();
    htmlConverter.setJavaScript(jsCode);
    htmlConverter.convert();
});

// Blockly.Msg.TEXTS_HUE = '#FFD800';
// Blockly.Msg.LOGIC_HUE = '#FFD800';
// Blockly.Msg.MATH_HUE = '#FFD800';
// Blockly.Msg.LOGIC_BOOLEAN_HELPURL = 'sdsad'
// Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP = 'hgeiuwe'