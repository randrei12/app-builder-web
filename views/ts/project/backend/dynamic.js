import Blockly from 'blockly';
import * as PROJECT from '../projectVars';

const BLOCKS_TYPES = ['element_on_click'];
Blockly.Extensions.register('set_elements', () => {});

function updateCategories({xml, elements, workspace, js}) {
    js.nodes = [];
    let copy_xml = xml.cloneNode(true);
    elements.forEach(element => {
        js.nodes.push(element.id);
        let category = document.createElement('category');
        category.innerHTML = `
        <block type="element_on_click"><field name="ELEMENT">${element.id}</field></block>
        <block type="element_on_load"><field name="ELEMENT">${element.id}</field></block>`; 
        category.setAttribute('name', element.name);
        category.setAttribute('colour', '#A8A8A8');
        copy_xml.appendChild(category);
    });
    workspace.updateToolbox(copy_xml);
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