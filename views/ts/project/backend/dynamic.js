import Blockly from 'blockly';
import * as PROJECT from '../projectVars';

const BLOCKS_TYPES = ['element_on_click'];
Blockly.Extensions.register('set_elements', () => {});

function updateCategories({ xml, elements, workspace }) {
    xml = xml.replace('</xml>', '');
    elements.forEach(element => {
        xml += `
        <category name="${element.name}" colour="#A8A8A8">
            <block type="element_on_click"><field name="ELEMENT">${element.id}</field></block>
            <block type="element_on_load"><field name="ELEMENT">${element.id}</field></block>
        </category>`;
    });
    xml += '</xml>';
    workspace.updateToolbox(xml);
}

function updateElementsDropdown({ workspace, elements }) {
    let options = elements.map(elem => [elem.name, elem.id]);
    PROJECT.updateELements(options);
    let workspaceBlocks = BLOCKS_TYPES.map(type => workspace.getBlocksByType(type)).flat(1);
    workspaceBlocks.forEach(block => block.getField('ELEMENT').menuGenerator_ = options);
    Blockly.Extensions.unregister('set_elements');
    Blockly.Extensions.register('set_elements', function () {
        let dropdown = new Blockly.FieldDropdown(options);
        this.inputList[0].removeField('ELEMENT');
        this.inputList[0].insertFieldAt(1, dropdown, 'ELEMENT');
    });
}

export { updateCategories, updateElementsDropdown };