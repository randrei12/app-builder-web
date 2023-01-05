import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { createProject } from './createProject';
import './list.scss';

function List() {
    let [loaded, setLoaded] = useState(false);
    let [projects, setProjects] = useState<Array<any>>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER}/projects`, {
            method: 'POST'
        }).then(async res => {
            let data = await res.json();
            setLoaded(true);
            setProjects(data);
        })
    }, []);

    return (
        <div className="projectsList">
            <>
                { loaded ?
                    <div className="createProject" onClick={() => createProject().then(e => e ? navigate(`${e}`) : '')}>
                        <div>
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </div> 
                    :
                    <span>Loading...</span>
                }
                {loaded && projects.map(project => (
                    <div className="project" key={project._id}>
                        <Link to={`/projects/${project._id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="header">
                            <img src="/assets/icon.png" alt="" />
                            <h1>{project.title}</h1>
                        </Link>
                        <div className="footer">
                            <div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div>
                                <button><i className="fa-solid fa-share-nodes"></i></button>
                                <button><i className="fa-solid fa-ellipsis-vertical"></i></button>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        </div>
    );
}

export default List;