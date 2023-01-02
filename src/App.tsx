import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/topBar';
import Root from './pages/root';
import ProjectsList from './pages/projectsList';
import Project from './pages/project';
import './scss/components/scrollBar.scss';

function App() {
    return (
        <BrowserRouter>
            <TopBar />
            <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/projects">
                    <Route path=":id/*" element={<Project />} />
                    <Route path="" element={<ProjectsList />} />
                </Route>
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;