import React from 'react';
import { focusInputOnClick } from './search.script';
import './search.scss';

export default function Search() {
    return (
        <div className="searchDiv">
            <div className="searchInput" onClick={e => focusInputOnClick(e.target as HTMLElement)}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search projects..." />
            </div>
        </div>
    );
}