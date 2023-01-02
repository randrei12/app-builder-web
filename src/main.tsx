import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './main.scss';
import './scss/components/scrollBar.scss';
import { ContextProviderProject } from 'hooks/context/project';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ContextProviderProject> {
        +import.meta.env.VITE_PRODUCTION ? <App /> : <React.StrictMode><App /></React.StrictMode>
    } </ContextProviderProject>
)