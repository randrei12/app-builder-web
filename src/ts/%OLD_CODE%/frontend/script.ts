import './ux/leftSeparator';
import * as _ from 'lodash';
import socket from '../../socket';
import { IF_DroppedElement } from 'ts/interfaces/DroppedElements/class';
import { stylesToHTML, switchTab, setTabs } from './ux/rightInter'
import { specialTypes } from '../../interfaces/elements/types';
import { stylesheet, stylesheet_data, stylesheetToPlain } from '../../interfaces/elements/styles';

const id = location.href.substring(location.href.indexOf('projects/') + 9, location.href.lastIndexOf('/'));

const topInfoTitle: HTMLElement = document.querySelector('.topInfo > span');
const topInfoInput: HTMLInputElement = document.querySelector('.topInfo > input');
const deleteButton: HTMLButtonElement = document.querySelector('.topInfo button');
const rightContent: HTMLElement = document.querySelector('.rightElements > .content');
const buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.elementsPanel > .container > button');
const screenElements: DroppedElement[] = [];

declare global {
    interface HTMLElement {
        src: string;
    }
}

interface DroppedElement extends IF_DroppedElement {}

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
                            this.src = element.src = style.value;
                            break;
                        case 'innerText':
                            this.text = element.innerText = style.value;                            
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

        this.buildFromObject = ({ name, type, childs = [], styles = {}, text, src, id, parent }) => {
            screenElements.push(this);
            this.id = id || type + (screenElements.filter(e => e.type === type).length + 1);
            this.name = name || this.id.charAt(0).toUpperCase() + this.id.slice(1);
            this.type = type;
            
            if (type === 'screen') element = document.querySelector('.deviceScreen');
            else this.generateElement(parent.getElement());
            
            children = childs.map(child => new DroppedElement().buildFromObject({ ...child, parent: this }));
            this.styles = _.merge({}, stylesheetToPlain(stylesheet.global), stylesheetToPlain(stylesheet[this.type as keyof object] || {}), stylesheet.defaults[this.type as keyof object] || {}, styles); //we will merge all the styles with priority as follows: custom added styles > default styles > element styles > global styles            
            elementAllStyles = {...stylesheet.global, ...stylesheet[this.type as keyof object] as object};

            if (src) this.src = src;
            element.onclick = e => {
                if (e.composedPath()[0] === element)
                    this.focus();
            }
            
            this.style.set(this.styles);
            if (this.styles.text && !text) this.style.set({text: { value: this.type, kind: 'innerText', type: 'default'}});
            this.createInputs();
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
addEventListener('fetchProject', (e: CustomEvent) => {
    data = JSON.parse(e.detail.design);
    if (Object.keys(data).length) {
        deviceScreen = new DroppedElement().buildFromObject(data);
    } else {
        deviceScreen = new DroppedElement().buildFromObject({ type: 'screen' });
    }
    deviceScreen.focus();
    setTimeout(() => dispatchEvent(new CustomEvent('elementsChange', { detail: screenElements })));
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            let elemType = button.dataset.type;
            const elem = new DroppedElement().buildFromObject({ type: elemType, parent: deviceScreen });
            deviceScreen.children.add(elem);
            console.log(screenElements);
            elem.focus();
            dispatchEvent(new CustomEvent('elementsChange', { detail: screenElements }));
        });
    });

    //for test purposes
    window.screenElements = screenElements;
    window.deviceScreen = deviceScreen;
    window.socket = socket;
});

let countdown: NodeJS.Timeout;
addEventListener('updateDesignCode', () => {
    clearTimeout(countdown);
    countdown = setTimeout(() => {
        console.log('design updated');
        socket.emit('updateDesign', { id, target: deviceScreen.export() });
    }, 2000);
});

//for test purposes
declare global {
    interface Window { deviceScreen: DroppedElement, socket: any, screenElements: DroppedElement[] }
}