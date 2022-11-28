import Blockly from 'blockly';
import HTMLConverter from '../../functional/converters/html';
import JSConverter from '../../functional/converters/javascript';
import { updateCategories, updateElementsDropdown } from "./dynamic";
import { javascriptGenerator } from 'blockly/javascript';
const { theme, ...blocks } = require('./blocks');
Object.assign(Blockly.Blocks, blocks); //adding custom blocks to blockly blocks
import * as codes from './blocks_code';
Object.assign(javascriptGenerator, codes); //adding custom blocks' code to javascript generator
import xml from './toolbox';
import saveBlocksState from './blocks_state';
import { generateError } from './utils';

const id = location.href.substring(location.href.indexOf('projects/') + 9, location.href.lastIndexOf('/'));

let jsCompileTemplate = {};
const workspace = Blockly.inject('blockly', { toolbox: xml, zoom: { controls: true, wheel: true, startScale: 1, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 }, theme });
const convertBtn = document.querySelector('#convertBtn');

const htmlConverter = new HTMLConverter();
const jsConverter = new JSConverter();
jsConverter.setTemplate(jsCompileTemplate);

addEventListener('elementsChange', e => {
    let elements = e.detail;
    updateCategories({xml, elements, workspace, js: jsCompileTemplate, htmlConverter});
    updateElementsDropdown({Blockly, workspace, elements});
});

convertBtn.addEventListener('click', () => {
    const jsCode = jsConverter.convert({js: javascriptGenerator, workspace});
    htmlConverter.setJavaScript(jsCode);
    htmlConverter.convert();
});

workspace.addChangeListener(Blockly.Events.disableOrphans); //disable unconnected blocks
workspace.addChangeListener(saveBlocksState); //activate save blocks state listener

//load blocks from database
// fetch('/getProjectCode', {
//     method: 'POST',
//     body: JSON.stringify({
//         id
//     }),
//     headers: {'Content-Type': 'application/json'},
// }).then(res => {
//     if (res.status === 200) res.json().then(data => {
//         if (data) Blockly.serialization.workspaces.load(data, workspace); //load into workspace blocks' state but only if the object is not empty
//     }); 
//     else location.href = '/';
// });


//* for debbuging
window.JS = javascriptGenerator;
window.workspace = workspace;
window.Blockly = Blockly;
window.xml = xml;