import { stylesheet_data } from './elements/styles'


// right inter. switch tabs (global/specific)
const rightStylesGroup: NodeListOf<HTMLElement> = document.querySelectorAll('.nav > button');
const underline: HTMLElement = document.querySelector('.underline');
const changeTabEvent = new CustomEvent("changeRightInterTab", { detail: {} });
rightStylesGroup.forEach((button, index) => button.onclick = () => switchTab(index));

//
function stylesToHTML(section: string, styles: any, inputs: { [key: string]: HTMLInputElement }) {
    const group = document.createElement('div');
    group.classList.add('group');   
    const header = document.createElement('span');
    header.classList.add('header');
    header.innerText = section.charAt(0).toUpperCase() + section.replace(/([A-Z])/g, ' $1').slice(1);
    group.append(header);
    Object.keys(styles).forEach(style => group.append(specificStyleToHTML(style, styles[style as keyof object], inputs)));
    return group;
}

function specificStyleToHTML(section: string, data: stylesheet_data, inputs: { [key: string]: HTMLInputElement }) {
    const { kind, type, unit, value } = data;
    const sect = document.createElement('div');
    sect.classList.add('section');
    const span = document.createElement('span');
    span.innerText = section.charAt(0).toUpperCase() + section.replace(/([A-Z])/g, ' $1').slice(1);
    const input = document.createElement('input');
    input.value = value;
    sect.append(span, input);
    inputs[section] = input;
    return sect;
}

function switchTab(index: number) { //changes the active tab button
    const otherElemIndex = (index + 1) % 2;
    rightStylesGroup[otherElemIndex].classList.remove('active');
    rightStylesGroup[index].classList.add('active');
    underline.style.setProperty('--active-index', index.toString());
    Object.assign(changeTabEvent.detail, { target: index });
    dispatchEvent(changeTabEvent);
}

const changeTab = (element: HTMLElement, sections: HTMLElement[][], newIndex:number) => element.replaceChildren(...sections[newIndex]);

export { specificStyleToHTML, stylesToHTML, changeTab, switchTab }