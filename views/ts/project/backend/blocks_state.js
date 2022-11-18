import Blockly from 'blockly';

// this is the function that records user's actions and save the workspace in cloud;

//multiple events tend to fire at once (for example create block and disable orphans) so we need a break to be sure that we don't overload our database;
let lastTime = new Date().getTime();
//we also want to be sure that the code actually changed, it'd be useless to override the same code in the db;
let lastCode = `{}`;
let finishedLoading = false; //we don't want to run the save block state if everything isn't loaded yet

export default function saveBlocksState(event) {
    if (event.type === Blockly.Events.FINISHED_LOADING) return finishedLoading = true; //we set finishedLoading to true then stop the function (it'd be useless to save this state)
    if (!finishedLoading) return; // stop if not loaded yet
    if (event.isUiEvent) return; //ignore ui events
    // if ([Blockly.Events.FINISHED_LOADING].includes(event.type)) return; //these are the event types that we want to ignore
    let currentTime = new Date().getTime();
    if (currentTime - lastTime < 10) return;
    let newCode = JSON.stringify(Blockly.serialization.workspaces.save(Blockly.getMainWorkspace()));
    if (newCode === lastCode) return;
    lastTime = currentTime;
    lastCode = newCode;
    fetch('/updateProjectCode/blocks', {
        method: 'POST',
        body: JSON.stringify({
            code: newCode,
            id: window.project.id //this is set on script.js
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    //! debbuging
    console.log(event);
}