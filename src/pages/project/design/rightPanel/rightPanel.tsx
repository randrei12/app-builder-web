import { CSSProperties } from 'react';

import './rightPanel.script'
import './rightPanel.scss';

export default function RightPanel() {
    

    return (
        <div className="rightElements">
            <div className="topInfo">
                <span>Text1</span>
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