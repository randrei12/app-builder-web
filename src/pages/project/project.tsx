import { useContext } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { projectContext } from 'hooks/context/project';
import Swal from 'sweetalert2';
import Design from './design';
import Blocks from './blocks';
import { ContextProviderBlockly } from 'hooks/context/blockly';
import './project.scss';

export default function Project() {
    const { project, setProject } = useContext(projectContext);
    const { id } = useParams();
    
    //@ts-ignore
    if (project._id !== id) {
        Swal.fire({
            title: 'Loading...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(null);
            }
        });
        fetch(`${import.meta.env.VITE_SERVER}/fetchProject`, {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(async res => {
            let data = await res.json();
            setProject(data);
            Swal.close();
        });
    }

    return (
        <ContextProviderBlockly>
            <Routes>
                <Route path="design" element={<Design />}/>
                <Route path="blocks" element={<Blocks />}/>
                <Route path="*" element={<Navigate to="design" />} />
            </Routes>
        </ContextProviderBlockly>
    );
}