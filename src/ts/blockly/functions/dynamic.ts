import Blockly from 'blockly';
import { cloneDeep } from 'lodash';
import { IF_DroppedElement } from 'ts/interfaces/DroppedElements/class';

const BLOCKS_TYPES = ['element_on_click'];
Blockly.Extensions.register('set_elements', () => {});

function updateCategories({ json, elements, workspace }: { json: any, elements: IF_DroppedElement[], workspace: Blockly.WorkspaceSvg }) {
    let clone = JSON.parse(JSON.stringify(json));
    elements.forEach(element => {
        clone.contents.push({
            kind: "CATEGORY",
            name: element.name,
            colour: "#A8A8A8",
            contents: [
                {
                    kind: "BLOCK",
                    blockxml: `<block type="element_on_click"><field name="ELEMENT">${element.id}</field></block>`,
                    type: "element_on_click"
                },
                {
                    kind: "BLOCK",
                    blockxml: `<block type="element_on_load"><field name="ELEMENT">${element.id}</field></block>`,
                    type: "element_on_load"
                }
            ]
        });
    });
    workspace.updateToolbox(clone);
}

function updateElementsDropdown({ workspace, elements }: { workspace: Blockly.WorkspaceSvg, elements: IF_DroppedElement[] }) {
    let options = elements.map(elem => [elem.name, elem.id]);
    let workspaceBlocks = BLOCKS_TYPES.map(type => workspace.getBlocksByType(type, false)).flat(1);
    workspaceBlocks.forEach(block => (block as any).getField('ELEMENT').menuGenerator_ = options);
    Blockly.Extensions.unregister('set_elements');
    Blockly.Extensions.register('set_elements', function (this: any) {
        let dropdown = new Blockly.FieldDropdown(options);
        this.inputList[0].removeField('ELEMENT');
        this.inputList[0].insertFieldAt(1, dropdown, 'ELEMENT');
    });
}

export { updateCategories, updateElementsDropdown };