import './ux/leftSeparator';
import { stylesToHTML, switchTab, changeTab } from './ux/rightInter'
import { specialTypes, element_template } from './ux/elements/types';
import { stylesheet } from './ux/elements/styles';

const topInfoTitle: HTMLElement = document.querySelector('.topInfo > span');
const topInfoInput: HTMLInputElement = document.querySelector('.topInfo > input');
const deleteButton: HTMLButtonElement = document.querySelector('.topInfo button');
const rightContent: HTMLElement = document.querySelector('.rightElements > .content');
const buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.elementsPanel > .container > button');
const screenElements: DroppedElement[] = [];

interface DroppedElement {
    id: string;
    type: string;
    name: string;
    isFocused: boolean;
    generateElement: (parent_element: HTMLElement) => HTMLElement;
    focus: () => void;
    unfocus: () => void;
    getHtml: () => HTMLElement;
    remove: () => void;
    style: { set: (styles: object) => void; get: () => CSSStyleDeclaration; };
    innerText: { set: (text: string) => void; get: () => string; };
    src: { set: (source: string) => any; get: () => any; };
    children: { add: (elem: DroppedElement) => void; get: () => DroppedElement[]; remove: (elem: DroppedElement) => void; clear: () => void};
    parent: DroppedElement;
}

class DroppedElement {
    constructor(obj: element_template) {
        this.type = obj.type;
        this.id = obj.id;
        this.isFocused = false;
        let name: string = this.type + (screenElements.filter(e => e.type === this.type).length + 1);
        this.name = name.charAt(0).toUpperCase() + name.slice(1);
        let element: any;
        let children: DroppedElement[] = [];
        
        let styles: object[] = [stylesheet.global, stylesheet[this.type as keyof object] as object];

        if (obj.prebuild) element = obj.prebuild;

        this.generateElement = (parent_element: HTMLElement) => {
            element = document.createElement(specialTypes[this.type as keyof object] || this.type);
            element.innerText = this.type;
            element.setAttribute('style', 'font-size: 25px;');
            parent_element.append(element);
            return element;
        }

        let ev: any;
        const tabsArray: HTMLElement[][] = styles.map(style => Object.keys(style).map(section => stylesToHTML(section, style)));
        let inputs: HTMLInputElement[] = tabsArray.map(tabs => tabs.map(tab => Array.from(tab.querySelectorAll('input')))).flat(2);        
        let inputCloseEvent = (e: Event) => {
            if (![topInfoInput, topInfoTitle].includes(e.composedPath()[0] as HTMLElement)) {
                topInfoTitle.removeAttribute('style');
                this.name = topInfoTitle.innerText = topInfoInput.value;
                topInfoInput.style.display = 'none';
            }
        }
        let props: {[key: string]: any} = {};
        styles.forEach(style => Object.values(style).forEach (e => Object.assign(props, e)));
        let defaultStyles: {[key: string]: {}} = stylesheet.defaults[this.type as keyof object];
        if (defaultStyles) Object.keys(defaultStyles).forEach(style => props[style] = {...props[style], ...defaultStyles[style]});
        this.focus = () => {
            topInfoTitle.onclick = () => {
                topInfoInput.removeAttribute('style');
                topInfoInput.value = topInfoTitle.innerText;
                topInfoTitle.style.display = 'none';
                addEventListener('click', inputCloseEvent);
            }
            deleteButton.onclick = () => this.remove();
            this.isFocused = true;
            
            element.classList.add('clicked');
            topInfoTitle.innerText = this.name;
            rightContent.replaceChildren(); //remove old inputs (of the last selected element)
            
            inputs.forEach((input, i) => {
                const modifiedName: string = Object.keys(props)[i];
                const modifiedKind = props[modifiedName as keyof object].kind;
                input.value = props[modifiedName as keyof object].value;
                //  = modifiedInput;
                
                switch (modifiedKind) {
                    case 'style':
                        this.style.set({ [modifiedName]: input.value });
                        break;
                    case 'innerText':
                        this.innerText.set(input.value);
                        break;
                    case 'src':
                        this.src.set(input.value);
                        break;
                }
            });

            const updateInputsOnChangeTabs = () => {
                inputs.forEach((input, i) => {  
                    const modifiedName: string = Object.keys(props)[i];
                    const modifiedKind = props[modifiedName as keyof object].kind;
                    // const modifiedInput = props[modifiedName as keyof object].value;
                    // input.value = modifiedInput;
                    
                    switch (modifiedKind) {
                        case 'style':
                            this.style.set({ [modifiedName]: input.value });
                            break;
                        case 'innerText':
                            this.innerText.set(input.value);
                            break;
                        case 'src':
                            this.src.set(input.value);
                            break;
                    }
                    
                    input.oninput = () => {
                        const modifiedName: string = Object.keys(props)[i];
                        const modifiedKind = props[modifiedName as keyof object].kind;
                        const modifiedInput = input.value;

                        props[modifiedName as keyof object].value = modifiedInput;
                        switch (modifiedKind) {
                            case 'style':
                                this.style.set({ [modifiedName]: modifiedInput });
                                break;
                            case 'innerText':
                                this.innerText.set(modifiedInput);
                                break;
                            case 'src':
                                this.src.set(modifiedInput);
                                break;
                        }
                    }
                });
            }
            ev = (e: CustomEvent) => { changeTab(rightContent, tabsArray, e.detail.target); updateInputsOnChangeTabs() };
            addEventListener('changeRightInterTab', ev);
            switchTab(0);
        }
        this.unfocus = () => {
            if (ev) removeEventListener('changeRightInterTab', ev);
            this.isFocused = false;
            element.classList.remove('clicked');
        };
        this.getHtml = () => element;
        this.style = {
            set: styles => Object.assign(element.style, styles),
            get: () => element.style
        };
        this.innerText = {
            set: text => element.innerText = text,
            get: () => element.innerText
        };
        this.src = {
            set: source => element.src = source,
            get: () => element.src
        };
        this.children = {
            add: (elem: DroppedElement) => { children.push(elem) },
            get: () => children,
            remove: (elem: DroppedElement) => { children.splice(children.indexOf(elem), 1) },
            clear: () => children = children.filter(e => Object.keys(e).length > 0)
        };
        this.remove = () => {
            if (this.type === 'screen') return;
            this.unfocus();
            let detail = this.id;
            let parent = this.parent;
            element.remove();
            children.forEach(child => child.remove());
            Object.keys(this).forEach(key => delete this[key as keyof Object]);
            parent.focus();
            parent.children.clear();
            dispatchEvent(new CustomEvent("removeDroppedElement", { detail }));
        }
    }
}

const deviceScreen = new DroppedElement({ type: 'screen', id: 'screen1', prebuild: document.querySelector('.deviceScreen') });
deviceScreen.focus();
screenElements.push(deviceScreen);
setTimeout(() => dispatchEvent(new CustomEvent('elementsChange', { detail: screenElements })), 0);

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let elemType = button.dataset.type;
        const elem: DroppedElement = new DroppedElement({
            type: elemType,
            id: elemType + screenElements.map(elem => elem.type === elemType).length
        });
        elem.generateElement(deviceScreen.getHtml());
        screenElements.push(elem);
        dispatchEvent(new CustomEvent('elementsChange', { detail: screenElements }));
        deviceScreen.children.add(elem);
        elem.parent = deviceScreen;
        screenElements.forEach(elem => elem.unfocus());
        elem.focus();
        console.log(screenElements);  
    });
});

window.onclick = e => {
    const path = e.composedPath();
    if (!path.includes(deviceScreen.getHtml())) return;
    screenElements.forEach(elem => elem.unfocus());
    const target = screenElements.filter(elem => elem.getHtml() === path[0])[0];
    target.focus();
}

addEventListener('removeDroppedElement', (e: CustomEvent) => {
    screenElements.splice(screenElements.indexOf(e.detail), 1);
    dispatchEvent(new CustomEvent('elementsChange', { detail: screenElements }));
});