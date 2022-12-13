import Blockly from 'blockly';
import { updateCategories, updateElementsDropdown } from "./dynamic";
import { javascriptGenerator } from 'blockly/javascript';
const { theme, ...blocks } = require('./blocks');
Object.assign(Blockly.Blocks, blocks); //adding custom blocks to blockly blocks
import * as codes from './blocks_code';
Object.assign(javascriptGenerator, codes); //adding custom blocks' code to javascript generator
import xml from './toolbox';
import saveBlocksState from './blocks_state';
import * as PROJECT from '../projectVars';
import { generateError } from './utils';

let jsCompileTemplate = {};
const workspace = Blockly.inject('blockly', { toolbox: xml, zoom: { controls: true, wheel: true, startScale: 1, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 }, theme });

addEventListener('elementsChange', e => {
    let elements = e.detail;
    updateCategories({ xml, elements, workspace, js: jsCompileTemplate, htmlConverter });
    updateElementsDropdown({ workspace, elements });
});

workspace.addChangeListener(Blockly.Events.disableOrphans); //disable unconnected blocks
workspace.addChangeListener(saveBlocksState); //activate save blocks state listener

addEventListener('fetchProject', e => {
    if (e.detail.blocks !== '{}') {
        let data = JSON.parse(e.detail.blocks);
        Blockly.serialization.workspaces.load(data, workspace); //load into workspace blocks' state but only if the object is not empty
        setTimeout(() => { //make sure to wait for workspace to load retrived data
            //set the saved value to each block
            data.blocks.blocks.forEach(block => {
                switch (block.type) {
                    case "element_on_click":
                        workspace.getBlockById(block.id).setFieldValue(block.fields.ELEMENT, 'ELEMENT');
                        break;
                }
                
            });
        }, 10);
    }
});


//load blocks from database
// fetch('/getProjectCode', {
//     method: 'POST',
//     body: JSON.stringify({
//         id: PROJECT.ID
//     }),
//     headers: {'Content-Type': 'application/json'},
// }).then(res => {
//     if (res.status === 200) res.json().then(data => {
//         console.log('got', data);
//         if (data) Blockly.serialization.workspaces.load(data, workspace); //load into workspace blocks' state but only if the object is not empty
//     }); 
//     // else location.href = '/';
// });

//* for debbuging
window.JS = javascriptGenerator;
window.workspace = workspace;
window.Blockly = Blockly;
window.xml = xml;