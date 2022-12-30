import { stylesheet_data } from "../elements/styles";

export interface IF_buildFromObject {
    name?: string, 
    type: string, 
    childs?: IF_buildFromObject[],
    styles?: { [key: string]: string },
    text?: string,
    src?: string,
    id?: string,
    elem?: HTMLElement,
    parent?: IF_DroppedElement;
}

export interface IF_DroppedElement {
    id: string;
    type: string;
    name: string;
    children: {
        add: (elem: IF_DroppedElement) => void,
        remove: (elem: IF_DroppedElement) => void,
        get: () => IF_DroppedElement[],
    };
    styles: { [key: string]: stylesheet_data },
    style: {
        set: (styles: { [key: string]: stylesheet_data}) => void,
        remove: (styles: String[]) => void
    },
    text: string,
    src?: string,
    focused: boolean;
    parent: IF_DroppedElement;
    buildFromObject: (obj: IF_buildFromObject) => this,
    generateElement: (parent: HTMLElement) => HTMLElement;
    remove: (topOfTree?: boolean) => void;
    createInputs: () => void;
    focus: () => void;
    unfocus: () => void;
    getElement: () => HTMLElement;
    export: () => { name: string; type: string; styles: { [key: string]: stylesheet_data; }; text: string; src: string; id: string; childs: any[]; };
}