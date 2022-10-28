import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import * as blocks from './blocks';
Object.assign(Blockly.Blocks, blocks); //adding custom blocks to blockly blocks
import * as codes from './blocks_code';
Object.assign(javascriptGenerator, codes); //adding custom blocks' code to javascript generator
import xml from './toolbox';
import { generateError } from './utils';
// Blockly.Msg.TEXTS_HUE = '#FFD800';
// Blockly.Msg.LOGIC_HUE = '#FFD800';
// Blockly.Msg.MATH_HUE = '#FFD800';
// Blockly.Msg.LOGIC_BOOLEAN_HELPURL = 'sdsad'
// Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP = 'hgeiuwe'

window.JS = javascriptGenerator;
window.workspace = Blockly.inject('blockly', { toolbox: xml, zoom: { controls: true, wheel: true, startScale: 1, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 } });
window.Blockly = Blockly;