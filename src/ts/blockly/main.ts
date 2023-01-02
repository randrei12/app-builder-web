import Blockly from 'blockly';
import io from 'socket.io-client';
import { generateError } from './utils';
import Project from 'ts/interfaces/project';
import theme from './blocks';

import update from './functions/update';

const socket = io('http://localhost:2219');

interface Backend {
    workspace: Blockly.WorkspaceSvg
    project: Project
    xml: string
    setXml: (xml: string) => string
    update: (event: any) => void
    createBlockly: () => void;
    serialize: { save: () => { [key: string]: any; }; load: (data: string) => void; };
}

class Backend {
    elements: any[];
    constructor({ project }: { project: Project }) {
        this.project = project;
        this.elements = [];

        this.setXml = (xml: string) => this.xml = xml;
        this.createBlockly = () => {
            this.workspace = Blockly.inject('blockly', { toolbox: this.xml, zoom: { controls: true, wheel: true, startScale: 1, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 }, theme });
            this.workspace.addChangeListener(Blockly.Events.disableOrphans); //disable unconnected blocks
        },
        this.serialize = {
            save: () => Blockly.serialization.workspaces.save(this.workspace),
            load: data => Blockly.serialization.workspaces.load(this.workspace, JSON.parse(data))
        }
        this.update = (event: any) => update(event, socket, this.project, this.elements);

    }


}


export default Backend;



//* for debbuging
declare global {
    interface Window {
        [key: string]: any
    }
}

Object.assign(window, Backend.prototype);
window.Blockly = Blockly;