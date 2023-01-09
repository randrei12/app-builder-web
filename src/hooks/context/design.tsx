import { createContext, useState } from "react";
export const DesignContext = createContext('');
export const ContextProviderDesign = ({ children }: { children: any }) => {
    const [ design, setDesign ] = useState([]);

    return (
        <DesignContext.Provider value={{ design, setDesign } as any}>
            { children }
        </DesignContext.Provider>
    );
}