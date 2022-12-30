import { createContext, useState } from "react";
import Project from 'ts/interfaces/project';
export const Context = createContext({} as { project: Project | {}, setProject: (value: {}) => void });
export const ContextProvider = ({ children }: { children: any }) => {
    const [ project, setProject ] = useState<Project | {}>({});

    return (
        <Context.Provider value={{ project, setProject }}>
            { children }
        </Context.Provider>
    );
}