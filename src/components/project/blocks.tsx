import { useEffect, useContext } from 'react';
import { projectContext } from 'hooks/context/project';
import * as _ from 'lodash';

import Project from 'ts/interfaces/project';
import Backend from 'ts/blockly/main';
import 'scss/components/project/blockly.scss';

export default function Blocks() {
    let { project, setProject } = useContext(projectContext);
    useEffect(() => {
        console.log(project);
        
        let backend = new Backend({ project: project as Project });
        (async () => {
            let xml = await fetch(`${import.meta.env.VITE_SERVER}/xml`, {
                method: 'POST'
            }).then(res => res.text());
            backend.setXml(xml);
            backend.createBlockly();
            backend.serialize.load((project as Project).data.blocks)
        })();

        return () => {
            try {
                setProject(_.merge({}, project, { data: { blocks: backend.serialize.save()} }));
            } catch {}
        };
    }, []);

    return (
        <div id="blockly"></div>
    );
}