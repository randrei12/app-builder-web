import { CSSProperties, useEffect } from 'react';
import Swal from 'sweetalert2';


import './rightPanel.scss';

export default function RightPanel() {
    useEffect(() => {
        Swal.fire({
            title: 'Loading...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(null);
            }
        });
        Promise.all([import('./rightPanel.script')]).then(() => {
            Swal.close();
        })
    })

    return (
        <div className="rightElements">
            <div className="topInfo">
                <span></span>
                <input type="text" style={{ display: "none" }} />
                <button>D</button>
            </div>
            <div className="nav">
                <button className="active">Global</button>
                <button>Specific</button>
                <div style={{ "--active-index": "0" } as CSSProperties} className="underline"></div>
            </div>
            <div className="content"></div>
        </div>
    );
}