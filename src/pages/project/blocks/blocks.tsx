import io from 'socket.io-client';
import { merge } from 'lodash';
import { useEffect, useContext, useState, useRef } from 'react';
import { useBlocklyWorkspace } from 'react-blockly';
import { projectContext } from 'hooks/context/project';
import { BlocklyContext } from 'hooks/context/blockly';
import toolbox from 'ts/blockly/toolbox.json';
import theme from 'ts/blockly/blocks';

import Backend from 'ts/blockly/main';
import './blockly.scss';

import Blockly from 'blockly';
import Project from 'ts/interfaces/project'

const socket = io('http://localhost:2219');

window.Blockly = Blockly;
let updateTimeout: NodeJS.Timeout;

export default function Blocks() {
    let { project, setProject } = useContext(projectContext);
    let { blockly, setBlockly } = useContext(BlocklyContext) as any;
    const blocklyRef = useRef(null);

    let blocklyWorkspace = useBlocklyWorkspace({
        ref: blocklyRef,
        toolboxConfiguration: toolbox,
        initialXml: blockly,
        workspaceConfiguration: { zoom: { controls: true, wheel: true, startScale: 1, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 }, theme },
        onWorkspaceChange: (workspace: any) => {
            if (Object.keys(project).length && blocklyWorkspace.xml !== blockly) {
                let code = JSON.stringify(Blockly.serialization.workspaces.save(workspace));
                if (code !== (project as Project).data.blocks) {
                    clearTimeout(updateTimeout);
                    updateTimeout = setTimeout(() => {
                        socket.emit('updateCode', {
                            id: (project as Project)._id,
                            code
                        });
                        setBlockly(blocklyWorkspace.xml);
                        console.log('updated');
                    }, 1000);
                }
            }
        }
    } as any);

    useEffect(() => {
        if (Object.keys(project).length) {
            Blockly.serialization.workspaces.load(JSON.parse((project as Project).data.blocks), Blockly.getMainWorkspace());
            console.log('loaded');
        }
    }, [project]);

    // if (Object.keys(project).length) {
    //     let code = JSON.parse((project as Project).data.blocks);
        
    //     console.log(Blockly.getMainWorkspace());
        
        
    //     Blockly.serialization.workspaces.load(Blockly.getMainWorkspace(), code);
    // }
    
    // if (Object.keys(project).length) {
    //     console.log('loaded');
    // }
    // useEffect(() => {
    //     if (Object.keys(project).length && blocklyWorkspace.workspace) {
    //         let code = JSON.parse((project as Project).data.blocks);
    //         console.log(code);
    //         Blockly.serialization.workspaces.load(blocklyWorkspace.workspace, code);
    //     }
        
        
            
            
        
    // }, [project]);

    return (
        <div id="blockly" ref={blocklyRef}></div>
    );
}