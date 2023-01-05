import { createContext, useState } from "react";
export const BlocklyContext = createContext('');
export const ContextProviderBlockly = ({ children }: { children: any }) => {
    const [ blockly, setBlockly ] = useState('<xml xmlns="https://developers.google.com/blockly/xml"></xml>');

    return (
        <BlocklyContext.Provider value={{ blockly, setBlockly } as any}>
            { children }
        </BlocklyContext.Provider>
    );
}