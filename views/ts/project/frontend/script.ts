import './ux/leftSeparator';
import * as _ from 'lodash';
import io from 'socket.io-client';
import { stylesToHTML, switchTab, setTabs } from './ux/rightInter'
import { specialTypes } from './ux/elements/types';
import { stylesheet, stylesheet_data, stylesheetToPlain } from './ux/elements/styles';

const id = location.href.substring(location.href.indexOf('projects/') + 9, location.href.lastIndexOf('/'));
const socket = io('http://localhost:2219');

const topInfoTitle: HTMLElement = document.querySelector('.topInfo > span');
const topInfoInput: HTMLInputElement = document.querySelector('.topInfo > input');
const deleteButton: HTMLButtonElement = document.querySelector('.topInfo button');
const rightContent: HTMLElement = document.querySelector('.rightElements > .content');
const buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.elementsPanel > .container > button');
const screenElements: DroppedElement[] = [];

declare global {
    interface Window { Swal: any }
    interface HTMLElement {
        src: string;
    }
}

interface buildFromObject {
    name?: string, 
    type: string, 
    childs?: buildFromObject[],
    styles?: { [key: string]: string },
    text?: string,
    src?: string,
    id?: string,
    elem?: HTMLElement,
}

interface DroppedElement {
    id: string;
    type: string;
    name: string;
    children: {
        add: (elem: DroppedElement) => void,
        remove: (elem: DroppedElement) => void,
        get: () => DroppedElement[],
    };
    styles: { [key: string]: stylesheet_data },
    style: {
        set: (styles: { [key: string]: stylesheet_data}) => void,
        remove: (styles: String[]) => void
    },
    text: string,
    src?: string,
    focused: boolean;
    buildFromObject: (obj: buildFromObject) => this,
    generateElement: (parent: HTMLElement) => HTMLElement;
    remove: (topOfTree?: boolean) => void;
    createInputs: () => void;
    focus: () => void;
    unfocus: () => void;
    getElement: () => HTMLElement;
    export: () => { name: string; type: string; styles: { [key: string]: stylesheet_data; }; text: string; src: string; id: string; childs: any[]; };
}

declare global {

}
const Swal = window.Swal;

class DroppedElement {
    constructor() {
        let element: HTMLElement;
        let elementAllStyles = {};
        let rightGroups: HTMLElement[] = [];
        let inputs: { [key: string]: HTMLInputElement } = {};
        let children: DroppedElement[] = [];

        this.generateElement = parent => {
            element = document.createElement(specialTypes[this.type as keyof object] || this.type);
            element.innerText = this.text;
            parent.appendChild(element);
            return element;
        }

        this.getElement = () => element;

        this.style = {
            set: styles => {
                Object.assign(this.styles, styles);
                let properties = Object.keys(styles);
                properties.forEach(property => {
                    let style = styles[property as keyof object];
                    switch (style.kind) {
                        case 'style':
                            element.style[property as keyof object] = styles[property as keyof object].value;
                            break;
                        case 'src':
                            element.src = style.value;
                            break;
                        case 'innerText':
                            element.innerText = style.value;
                            break;

                    }                    
                });
            },
            remove: styles => {
                styles.forEach(style => {
                    element.style[style as keyof object] = '';
                    delete this.styles[style as keyof object];
                });
                dispatchEvent(new CustomEvent('updateDesignCode'));
            }
        }

        this.remove = (topOfTree = true) => {
            if (this.type === 'screen') return;
            screenElements.splice(screenElements.indexOf(this), 1);
            children.forEach(child => child.remove(false));
            Object.keys(this).forEach(key => delete this[key as keyof object]);
            element.remove();
            Object.keys(inputs).forEach(input => inputs[input].remove());
            if (topOfTree) dispatchEvent(new CustomEvent('elementsChange', { detail: screenElements }));
            dispatchEvent(new CustomEvent('updateDesignCode'));
            screenElements[0].focus();
        }

        this.createInputs = () => {
            let sections = Object.keys(elementAllStyles);
            sections.forEach(section => {
                rightGroups.push(stylesToHTML({ section, elem: this.text}, elementAllStyles[section as keyof object], inputs));
            });
            let inputsAsArray = Object.keys(inputs);
            inputsAsArray.forEach(prop => {
                let input = inputs[prop as keyof object];
                input.oninput = () => {
                    this.styles[prop as keyof object].value = input.value;
                    this.style.set({[prop]: this.styles[prop as keyof object]});
                    dispatchEvent(new CustomEvent('updateDesignCode'));
                }
            });
        }

        this.buildFromObject = ({ name, type, childs = [], styles = {}, text, src, id, elem }) => {
            this.id = id || type + (screenElements.filter(e => e.type === type).length + 1);
            this.name = name || this.id.charAt(0).toUpperCase() + this.id.slice(1);
            this.type = type;
            let customStyles: { [key: string]: { value: string } } = {};
            Object.keys(styles).forEach(style => customStyles[style] = { value: styles[style]});
            children = childs.map(child => new DroppedElement().buildFromObject(child));
            this.styles = _.merge({}, stylesheetToPlain(stylesheet.global), stylesheetToPlain(stylesheet[this.type as keyof object] || {}), stylesheet.defaults[this.type as keyof object] || {}, customStyles); //we will merge all the styles with priority as follows: custom added styles > default styles > element styles > global styles
            elementAllStyles = {...stylesheet.global, ...stylesheet[this.type as keyof object] as object};
            this.text = text || this.type;
            if (src) this.src = src;
            element = elem ? elem : this.generateElement(deviceScreen.getElement());
            element.onclick = e => {
                if (e.composedPath()[0] === element)
                    this.focus();
            }
            this.style.set(this.styles);
            this.createInputs();
            if (this.styles.text) this.style.set({text: { value: this.text, kind: 'innerText', type: 'default'}});
            dispatchEvent(new CustomEvent('updateDesignCode'));
            return this;
        }

        this.unfocus = () => {
            this.focused = false;
            element.classList.remove('clicked');
        }

        this.focus = () => {
            screenElements.filter(e => e.focused).forEach(e => e.unfocus());
            this.focused = true;
            let closeInput = () => {
                this.name = topInfoTitle.innerHTML = topInfoInput.value.trim();
                topInfoInput.style.display = 'none';
                topInfoTitle.removeAttribute('style');
            }

            onclick = e => {
                if (topInfoTitle.style.display === 'none' && ![topInfoInput, topInfoTitle].includes(e.composedPath()[0] as HTMLElement))
                    closeInput();
            }

            topInfoTitle.onclick = () => {
                topInfoInput.removeAttribute('style');
                topInfoInput.onkeyup = e => {
                    if (e.key === 'Enter') closeInput();
                }
                topInfoInput.value = topInfoTitle.innerText;
                topInfoTitle.style.display = 'none';
                dispatchEvent(new CustomEvent('updateDesignCode'));
            }
            topInfoTitle.innerText = this.name;
            deleteButton.onclick = () => this.remove();
            element.classList.add('clicked');

            setTabs(rightContent, _.chunk(rightGroups, Object.keys(stylesheet.global).length));
            switchTab(0);
        }

        this.children = {
            add: child => children.push(child),
            remove: child => children.splice(children.indexOf(child), 1),
            get: () => children
        }

        this.export = () => {
            let childs = children.map(e => e.export());
            return {
                name: this.name,
                type: this.type,
                styles: this.styles,
                text: this.text,
                src: this.src,
                id: this.id,
                childs
            };
        }
    }
}

let deviceScreen: DroppedElement;
let data;
(async () => {
    Swal.showLoading();
    let res = await fetch('/getProjectDesign', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' }
    });
    data = await res.json() || {};    
    console.log(data);
    Swal.close();

    if (Object.keys(data).length) {
        deviceScreen = new DroppedElement().buildFromObject(data);
    } else {
        deviceScreen = new DroppedElement().buildFromObject({ type: 'screen', elem: document.querySelector('.deviceScreen') });
    }
    deviceScreen.focus();
    screenElements.push(deviceScreen);
    setTimeout(() => dispatchEvent(new CustomEvent('elementsChange', { detail: screenElements })));
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            let elemType = button.dataset.type;
            const elem = new DroppedElement().buildFromObject({ type: elemType });
            screenElements.push(elem);
            deviceScreen.children.add(elem);
            console.log(screenElements);
            elem.focus();
            dispatchEvent(new CustomEvent('elementsChange', { detail: screenElements }));
        });
    });
})();

let countdown: NodeJS.Timeout;
addEventListener('updateDesignCode', () => {
    clearTimeout(countdown);
    countdown = setTimeout(() => {
        socket.emit('updateDesign', deviceScreen.export());
    }, 2000);
});

//for test purposes
declare global {
    interface Window { deviceScreen: DroppedElement, socket: any }
}

window.deviceScreen = deviceScreen;
window.socket = socket;