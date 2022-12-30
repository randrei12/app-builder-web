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
    update: (event: any) => void;
}

class Backend {
    elements: any[];
    constructor({ xml, project }: { xml: string, project: Project }) {
        this.workspace = Blockly.inject('blockly', { toolbox: xml, zoom: { controls: true, wheel: true, startScale: 1, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 }, theme });
        this.project = project;
        this.elements = [];

        this.update = (event: any) => update(event, socket, Backend.prototype.project, Backend.prototype.elements);
        this.workspace.addChangeListener(Blockly.Events.disableOrphans); //disable unconnected blocks
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