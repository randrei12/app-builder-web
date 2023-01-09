import Swal from 'sweetalert2';
import { useContext, useEffect } from 'react';
import './leftPanel.scss';
import { projectContext } from 'hooks/context/project';
import Project from 'ts/interfaces/project';

export default function LeftPanel() {
    let { project } = useContext(projectContext);

    useEffect(() => {
        Swal.fire({
            title: 'Loading...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(null);
            }
        });

        Promise.all([import('./scripts/newElements'), import('./scripts/sectionsUI')]).then(modules => {
            if (!Object.keys(project).length) return;
            modules[0].default((project as Project).data.design);
            modules[1].default();
            Swal.close();
        });
        
    }, [project]);

    return (
        <div className="leftElements">
            <div className="organisationPanel">
                <div className="top">
                    <i className="fa-solid fa-angle-right"></i>
                    <span>Layout</span>
                </div>
                <div className="container">
                    <button>shit1</button>
                    <button>shit2</button>
                    <button>shit3</button>
                </div>
            </div>
            <div className="elementsPanel">
                <div className="top">
                    <i className="fa-solid fa-angle-right"></i>
                    <span>Elements</span>
                </div>
                <div className="container" style={{ borderBottom: "none" }}>
                    <button data-type="text">Text</button>
                    <button data-type="button">Button</button>
                    <button data-type="image">Image</button>
                </div>
            </div>
        </div>
    );
}