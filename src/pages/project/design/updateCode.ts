import { io } from "socket.io-client";
import { screenElements } from "ts/design/vars";

const socket = io('http://localhost:2219');

let timeout: NodeJS.Timeout;
addEventListener('updateDesignCode', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        console.log('updated design code');
        socket.emit('updateDesign', {
            id: location.pathname.split('/')[2],
            target: screenElements[0].export()
        });
    }, 1000);
});