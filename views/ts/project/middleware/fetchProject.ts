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

async function fetchProject() {
    let res = await fetch('/fetchProject', {
        method: 'POST',
        body: JSON.stringify({ id: ID }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (res.status === 500) throw new Error();
    let data: ProjectCode = await res.json();
    dispatchEvent(new CustomEvent('fetchProject', { detail:data }));
}

async function fetchBlocklyToolbox() {
    let res = await fetch('/xml', { method: 'POST' });
    if (res.status === 500) throw new Error();
    const xml = await res.text();
    
    dispatchEvent(new CustomEvent('fetchBlocklyToolbox', { detail: { xml } }));
}

(async () => {
    try {
        await fetchBlocklyToolbox();
        await fetchProject();
        window.Swal.close();
    } catch {
        document.write('An error occurred');
    }

})();