import { useContext, useState, useEffect } from 'react';
import { Link, useLocation, matchRoutes } from 'react-router-dom';
import { Context } from '../hooks/context';
import '../scss/components/topBar.scss';

function TopBar() {
    const location = useLocation();
    const isProjectPath = matchRoutes([{ path:'/projects/:id/*' }], location);
    const [ activeTab, setActiveTab ] = useState<string>('');
    const { project } = useContext(Context);

    useEffect(() => {
        setActiveTab(isProjectPath ? isProjectPath[0].params['*'] as string : '');
    }, [location])

    return (        
        <div className="topBar">
            <div style={{ maxWidth: "33%" }}>
                <Link to="/projects" style={{ height: '100%' }}><img src="/assets/logo.png" alt="" /></Link>
                { isProjectPath && 
                    <>
                        <Link to={`${isProjectPath[0].pathnameBase}/design`}><button className={activeTab === 'design' ? 'current' : ''} data-nav="design">Design</button></Link>
                        <Link to={`${isProjectPath[0].pathnameBase}/blocks`}><button className={activeTab === 'blocks' ? 'current' : ''} data-nav="blocks">Blocks</button></Link>
                    </>
                }
            </div>

            { isProjectPath && 
                <div className="projectTitle">
                    <img src="/assets/icon.png" alt="" />
                    <h1>{project.title}</h1>
                </div> 
            }

            <div className="rightActions">
            { isProjectPath ?
                <>
                    <button><i className="fa-solid fa-share-nodes"></i></button>
                    <button><i className="fa-solid fa-book"></i></button>
                </>
                :
                <>
                    <button>PRO</button>
                </>
            }
                <img className="accountButton" src="/assets/doggie.png" />
            </div>
        </div>
    );
}

export default TopBar;