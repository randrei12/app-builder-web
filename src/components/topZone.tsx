import { Link } from "react-router-dom";
import 'scss/components/project/topZone.scss';

export default function topZone() {
    return (
        <div className="topZone">
            <div style={{ maxWidth: '33%' }}>
                <img src="/assets/logo.png" alt="Logo"><Link to="/"></Link></img>
                <button className="current" data-nav="design">Design</button>
                <button data-nav="blocks">Blocks</button>
            </div>
            <div className="projectTitle">
                <img src="/assets/icon.png" alt=""></img>
                <h1>Project1</h1>
            </div>
            <div className="rightActions">
                <button><i className="fa-solid fa-play"></i></button>
                <button><i className="fa-solid fa-share-nodes"></i></button>
                <button><i className="fa-solid fa-book"></i></button>
                <img className="accountButton" src="/assets/doggie.png"></img>
            </div>
        </div>
    );
}