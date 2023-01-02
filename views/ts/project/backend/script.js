import Blockly from 'blockly';
import { updateCategories, updateElementsDropdown } from "./dynamic";
const { theme, ...blocks } = require('./blocks');
Object.assign(Blockly.Blocks, blocks); //adding custom blocks to blockly blocks
import saveBlocksState from './blocks_state';
import * as PROJECT from '../projectVars';
import { generateError } from './utils';

let workspace;

addEventListener('fetchBlocklyToolbox', e => {
    const xml = e.detail.xml;
    workspace = Blockly.inject('blockly', { toolbox: xml, zoom: { controls: true, wheel: true, startScale: 1, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 }, theme });
    addEventListener('elementsChange', e => {
        let elements = e.detail;
        updateCategories({ xml, elements, workspace });
        updateElementsDropdown({ workspace, elements });
    });
    
    workspace.addChangeListener(Blockly.Events.disableOrphans); //disable unconnected blocks
    workspace.addChangeListener(saveBlocksState); //activate save blocks state listener
});

addEventListener('fetchProject', e => {
    if (e.detail.data.blocks !== '{}') {
        let data = JSON.parse(e.detail.data.blocks);
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

//* for debbuging
window.workspace = workspace;
window.Blockly = Blockly;