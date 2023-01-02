import { createContext, useState } from "react";
import Project from 'ts/interfaces/project';
export const projectContext = createContext({} as { project: Project | {}, setProject: (value: {}) => void });
export const ContextProviderProject = ({ children }: { children: any }) => {
    const [ project, setProject ] = useState<Project | {}>({});

    return (
        <projectContext.Provider value={{ project, setProject }}>
            { children }
        </projectContext.Provider>
    );
}