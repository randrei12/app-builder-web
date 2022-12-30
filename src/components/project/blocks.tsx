import { useEffect, useContext } from 'react';
import { Context } from 'hooks/context';

import Project from 'ts/interfaces/project';
import Backend from 'ts/blockly/main';
import 'scss/components/project/blockly.scss';

export default function Blocks() {
    let { project } = useContext(Context);
    useEffect(() => {
        (async () => {
            let xml = await fetch(`${import.meta.env.VITE_SERVER}/xml`, {
                method: 'POST'
            }).then(res => res.text());
            let blockly = new Backend({ xml, project: project as Project });
        })();
    }, []);

    return (
        <div id="blockly"></div>
    );
}