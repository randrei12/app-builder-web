import { ID } from '../projectVars';

interface ProjectCode {
    design: {
        name: string,
        type: string,
        styles: object,
        text: string,
        src: string,
        id: string,
        childs: object
    },
    blocks: {
        blocks: object,
        element: []
    }
}

window.Swal.fire({
    title: 'Loading...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
        window.Swal.showLoading()
    }
});

fetch('/fetchProject', {
    method: 'POST',
    body: JSON.stringify({ id: ID }),
    headers: { 'Content-Type': 'application/json' }
}).then(async res => {
    let data: ProjectCode = await res.json();
    dispatchEvent(new CustomEvent('fetchProject', { detail:data }));
    window.Swal.close();
}).catch();