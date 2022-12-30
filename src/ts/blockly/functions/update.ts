import Blockly from 'blockly';

// this is the function that records user's actions and save the workspace in cloud;
// multiple events tend to fire at once (for example create block and disable orphans) so we need a break to be sure that we don't overload our database;
let lastTime = new Date().getTime();
// we also want to be sure that the code actually changed, it'd be useless to override the same code in the db;
let lastCode = `{}`;

export default function update(event: any, socket: any, project: any, elements: any) {
    if (event.isUiEvent) return; //ignore ui events

    let currentTime = new Date().getTime();
    if (currentTime - lastTime < 1000) return;

    let newCode = JSON.stringify({ ...Blockly.serialization.workspaces.save(Blockly.getMainWorkspace()), elems: elements });
    if (newCode === lastCode) return;

    lastTime = currentTime;
    lastCode = newCode;

    console.log('code updated');
    socket.emit('updateCode', { 
        code: newCode,
        id: project._id
    });
}

