import './ux/leftSeparator';
import { stylesToHTML, switchTab, changeTab } from './ux/rightInter'
import { specialTypes, element_template } from './ux/elements/types';
import { stylesheet, stylesheetToPlain } from './ux/elements/styles';

const id = location.href.substring(location.href.indexOf('projects/') + 9, location.href.lastIndexOf('/'));

const topInfoTitle: HTMLElement = document.querySelector('.topInfo > span');
const topInfoInput: HTMLInputElement = document.querySelector('.topInfo > input');
const deleteButton: HTMLButtonElement = document.querySelector('.topInfo button');
const rightContent: HTMLElement = document.querySelector('.rightElements > .content');
const buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.elementsPanel > .container > button');
const screenElements: DroppedElement[] = [];

// interface DroppedElement {
//     id: string;
//     type: string;
//     name: string;
//     isFocused: boolean;
//     generateElement: (parent_element: HTMLElement) => HTMLElement;
//     focus: () => void;
//     unfocus: () => void;
//     getHtml: () => HTMLElement;
//     remove: () => void;
//     export: () => object;
//     style: { set: (styles: object) => void; get: () => CSSStyleDeclaration; };
//     innerText: { set: (text: string) => void; get: () => string; };
//     src: { set: (source: string) => any; get: () => any; };
//     children: { add: (elem: DroppedElement) => void; get: () => DroppedElement[]; remove: (elem: DroppedElement) => void; clear: () => void};
//     parent: DroppedElement;
// }

interface buildFromObject {
    name?: string, 
    type: string, 
    children?: buildFromObject[],
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
    children: DroppedElement[];
    styles: { [key: string]: string },
    style: {
        add: (styles: object) => void,
        remove: (styles: String[]) => void
    },
    text: string,
    src?: string,
    buildFromObject: (obj: buildFromObject) => this,
    generateElement: (parent: HTMLElement) => HTMLElement;
    remove: () => void;
    createInputs: () => void;
    focus: () => void;
    applyStyles: () => void;
}

class DroppedElement {
    constructor() {
        let element: HTMLElement;
        let elementAllStyles = {};
        let rightGroups: HTMLElement[] = [];
        let inputs: { [key: string]: HTMLInputElement } = {};

        this.generateElement = parent => {
            element = document.createElement(specialTypes[this.type as keyof object] || this.type);
            element.innerText = this.text;
            parent.appendChild(element);
            return element;
        }

        this.style = {
            add: styles => {
                Object.assign(this.styles, styles);
                let properties = Object.keys(styles);
                properties.forEach(property => {
                    inputs[property].value = styles[property as keyof object];
                    element.style[property as keyof object] = styles[property as keyof object];
                });
            },
            remove: styles => {
                styles.forEach(style => {
                    element.style[style as keyof object] = '';
                    delete this.styles[style as keyof object];
                });
            }
        }

        this.remove = () => {
            if (this.type === 'screen') return;
            Object.keys(this).forEach(key => delete this[key as keyof object]);
            this.children.forEach(child => child.remove());
        }

        this.createInputs = () => {
            // rightSections = 
            console.log(elementAllStyles);
            
            let sections = Object.keys(elementAllStyles);
            sections.forEach(section => {
                rightGroups.push(stylesToHTML(section, elementAllStyles[section as keyof object], inputs));
                
                // let styles = Object.keys(elementAllStyles[section as keyof object]);
                // styles.forEach(style => {

                // });
            });
            console.log(inputs);
            console.log(rightGroups);
            
        }
        
        this.applyStyles = () => {
            //*i have to make this work
            console.log({styles: this.styles});
            this.style.add(this.styles);
        }

        this.buildFromObject = ({ name, type, children = [], styles = {}, text, src, id, elem }) => {
            this.id = id || type + (screenElements.filter(e => e.type === type).length + 1);
            this.name = name || this.id.charAt(0).toUpperCase() + this.id.slice(1);
            this.type = type;
            this.children = children.map(child => new DroppedElement().buildFromObject(child));
            this.styles = {...stylesheetToPlain(stylesheet.global), ...stylesheetToPlain(stylesheet[this.type as keyof object] || {}), ...styles};
            elementAllStyles = {...stylesheet.global, ...stylesheet[this.type as keyof object] as object};
            console.log({1: this.styles, 2: elementAllStyles});
            
            this.text = text || this.name;
            if (src) this.src = src;
            if (elem) element = elem;
            return this;
        }

        this.focus = () => {
            topInfoTitle.onclick = () => {
                topInfoInput.removeAttribute('style');
                topInfoInput.value = topInfoTitle.innerText;
                topInfoTitle.style.display = 'none';
            }
            deleteButton.onclick = () => this.remove();
            element.classList.add('clicked');
            rightContent.append(...rightGroups);
        }
    }
}

// class DroppedElement {
//     constructor(obj: element_template) {
//         let name: string;
//         let children: DroppedElement[] = [];
//         let element: any;

//         if (obj.from) {
//             if (obj.from.public.type === 'screen') element = document.querySelector('.deviceScreen');
//             Object.assign(this, obj.from.public);
//             name = obj.from.private.name;
//             screenElements.push(this);
//             obj.from.private.children.forEach((el: object) => {
//                 let child = new DroppedElement({ from: el });
//                 child.generateElement(element);
//                 children.push(child);
//             });
//         } else {
//             this.type = obj.type;
//             this.id = obj.id;
//             this.isFocused = false;
//             name = obj.name || this.type + (screenElements.filter(e => e.type === this.type).length + 1);
//             this.name = name.charAt(0).toUpperCase() + name.slice(1);
//         }
        
        
//         let styles: object[] = [stylesheet.global, stylesheet[this.type as keyof object] as object];

//         if (obj.prebuild) element = obj.prebuild;

//         this.generateElement = (parent_element: HTMLElement) => {
//             element = document.createElement(specialTypes[this.type as keyof object] || this.type);
//             element.innerText = this.type;
//             element.setAttribute('style', 'font-size: 25px;');
//             parent_element.append(element);
//             return element;
//         }

//         let ev: any;
//         const tabsArray: HTMLElement[][] = styles.map(style => Object.keys(style).map(section => stylesToHTML(section, style)));
//         let inputs: HTMLInputElement[] = tabsArray.map(tabs => tabs.map(tab => Array.from(tab.querySelectorAll('input')))).flat(2);        
//         let inputCloseEvent = (e: Event) => {
//             if (![topInfoInput, topInfoTitle].includes(e.composedPath()[0] as HTMLElement)) {
//                 topInfoTitle.removeAttribute('style');
//                 this.name = topInfoTitle.innerText = topInfoInput.value;
//                 topInfoInput.style.display = 'none';
//             }
//         }
//         let props: {[key: string]: any} = {};
//         styles.forEach(style => Object.values(style).forEach (e => Object.assign(props, e)));
//         let defaultStyles: {[key: string]: {}} = stylesheet.defaults[this.type as keyof object];
//         if (defaultStyles) Object.keys(defaultStyles).forEach(style => props[style] = {...props[style], ...defaultStyles[style]});
//         this.focus = () => {
//             topInfoTitle.onclick = () => {
//                 topInfoInput.removeAttribute('style');
//                 topInfoInput.value = topInfoTitle.innerText;
//                 topInfoTitle.style.display = 'none';
//                 addEventListener('click', inputCloseEvent);
//             }
//             deleteButton.onclick = () => this.remove();
//             this.isFocused = true;
            
//             element.classList.add('clicked');
//             topInfoTitle.innerText = this.name;
//             rightContent.replaceChildren(); //remove old inputs (of the last selected element)
            
//             inputs.forEach((input, i) => {
//                 const modifiedName: string = Object.keys(props)[i];
//                 const modifiedKind = props[modifiedName as keyof object].kind;
//                 input.value = props[modifiedName as keyof object].value;
//                 //  = modifiedInput;
                
//                 switch (modifiedKind) {
//                     case 'style':
//                         this.style.set({ [modifiedName]: input.value });
//                         break;
//                     case 'innerText':
//                         this.innerText.set(input.value);
//                         break;
//                     case 'src':
//                         this.src.set(input.value);
//                         break;
//                 }
//             });
            

//             const updateInputsOnChangeTabs = () => {
//                 inputs.forEach((input, i) => {  
//                     const modifiedName: string = Object.keys(props)[i];
//                     const modifiedKind = props[modifiedName as keyof object].kind;
//                     // const modifiedInput = props[modifiedName as keyof object].value;
//                     // input.value = modifiedInput;
                    
//                     switch (modifiedKind) {
//                         case 'style':
//                             this.style.set({ [modifiedName]: input.value });
//                             break;
//                         case 'innerText':
//                             this.innerText.set(input.value);
//                             break;
//                         case 'src':
//                             this.src.set(input.value);
//                             break;
//                     }
                    
//                     input.oninput = () => {
//                         const modifiedName: string = Object.keys(props)[i];
//                         const modifiedKind = props[modifiedName as keyof object].kind;
//                         const modifiedInput = input.value;

//                         props[modifiedName as keyof object].value = modifiedInput;
//                         switch (modifiedKind) {
//                             case 'style':
//                                 this.style.set({ [modifiedName]: modifiedInput });
//                                 break;
//                             case 'innerText':
//                                 this.innerText.set(modifiedInput);
//                                 break;
//                             case 'src':
//                                 this.src.set(modifiedInput);
//                                 break;
//                         }
//                     }
//                 });
//             }
//             ev = (e: CustomEvent) => { changeTab(rightContent, tabsArray, e.detail.target); updateInputsOnChangeTabs() };
//             addEventListener('changeRightInterTab', ev);
//             switchTab(0);
//         }
//         this.unfocus = () => {
//             if (ev) removeEventListener('changeRightInterTab', ev);
//             this.isFocused = false;
//             element.classList.remove('clicked');
//         };
//         this.getHtml = () => element;
//         this.style = {
//             set: styles => {
//                 Object.assign(element.style, styles);
//                 updateDB();
//             },
//             get: () => element.style
//         };
//         this.innerText = {
//             set: text => {
//                 element.innerText = text;
//                 updateDB();
//             },
//             get: () => element.innerText
//         };
//         this.src = {
//             set: source => {
//                 element.src = source;
//                 updateDB();
//             },
//             get: () => element.src
//         };
//         this.children = {
//             add: (elem: DroppedElement) => { 
//                 children.push(elem);
//                 updateDB();
//             },
//             get: () => children,
//             remove: (elem: DroppedElement) => { 
//                 children.splice(children.indexOf(elem), 1);
//                 updateDB(); 
//             },
//             clear: () => { 
//                 children = children.filter(e => Object.keys(e).length > 0);
//                 updateDB();
//             }
//         };
//         this.remove = () => {
//             if (this.type === 'screen') return;
//             this.unfocus();
//             let detail = this.id;
//             let parent = this.parent;
//             element.remove();
//             children.forEach(child => child.remove());
//             Object.keys(this).forEach(key => delete this[key as keyof Object]);
//             parent.focus();
//             parent.children.clear();
//             dispatchEvent(new CustomEvent("removeDroppedElement", { detail }));
//         }

//         this.export = () => {
//             return { public: this, private: { name, children: children.map(e => e.export()) } };
//         }
//     }

// }

let deviceScreen: DroppedElement;
deviceScreen = new DroppedElement().buildFromObject({type: 'text', elem: document.querySelector('.deviceScreen'), styles: {backgroundColor: 'red'}}); 
deviceScreen.createInputs();
deviceScreen.applyStyles();
deviceScreen.focus();

declare global {
    interface Window { deviceScreen: DroppedElement }
}
window.deviceScreen = deviceScreen;
// let data;
// (async () => {
//     let res = await fetch('/getProjectDesign', {
//         method: 'POST',
//         body: JSON.stringify({ id }),
//         headers: { 'Content-Type': 'application/json' }
//     });
//     data = await res.json() || {};
    
//     if (data) {
//         deviceScreen = new DroppedElement({ from: data });
//         //we have to focus each element then unfocus so the saved styles of elements are applied
//         screenElements.forEach(e => {
//             e.focus()
//             e.unfocus();
//         });
//     } else {
//         deviceScreen = new DroppedElement({ type: 'screen', id: 'screen1', prebuild: document.querySelector('.deviceScreen') });
//         updateDB();
//     }
    
//     deviceScreen.focus();
    
//     screenElements.push(deviceScreen);
//     setTimeout(() => dispatchEvent(new CustomEvent('elementsChange', { detail: screenElements })), 0);
    
//     buttons.forEach(button => {
//         button.addEventListener('click', () => {
//             let elemType = button.dataset.type;
//             const elem: DroppedElement = new DroppedElement({
//                 type: elemType,
//                 id: elemType + screenElements.map(elem => elem.type === elemType).length
//             });
//             elem.generateElement(deviceScreen.getHtml());
//             screenElements.push(elem);
//             dispatchEvent(new CustomEvent('elementsChange', { detail: screenElements }));
//             deviceScreen.children.add(elem);
//             elem.parent = deviceScreen;
//             screenElements.forEach(elem => elem.unfocus());
//             elem.focus();
//             console.log(screenElements);
//             updateDB();
//         });
//     });
    
//     window.onclick = e => {
//         const path = e.composedPath();
//         if (!path.includes(deviceScreen.getHtml())) return;
//         screenElements.forEach(elem => elem.unfocus());
//         const target = screenElements.filter(elem => elem.getHtml() === path[0])[0];
//         target.focus();
//     }
    
//     addEventListener('removeDroppedElement', (e: CustomEvent) => {
//         screenElements.splice(screenElements.indexOf(e.detail), 1);
//         dispatchEvent(new CustomEvent('elementsChange', { detail: screenElements }));
//         updateDB();
//     });
// })();


// let lastDate = new Date().getTime();
// function updateDB() {
//     let currentDate = new Date().getTime();
//     if (currentDate - lastDate < 1000) return;
//     lastDate = currentDate;
//     fetch('/updateProjectCode/design', {
//         method: 'POST',
//         body: JSON.stringify({
//             target: deviceScreen.export(),
//             id
//         }),
//         headers: { 'Content-Type': 'application/json' }
//     });
//     console.log('new fetch for design')
// }