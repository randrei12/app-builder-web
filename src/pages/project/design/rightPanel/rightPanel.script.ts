import { stylesheet_data } from 'ts/interfaces/elements/styles';

let groups: HTMLElement[][];
let rightContent: HTMLElement;
function setTabs(rightElem: HTMLElement, tabs: HTMLElement[][]) {
    rightContent = rightElem;
    groups = tabs;
}

// right inter. switch tabs (global/specific)
const rightStylesGroup: NodeListOf<HTMLElement> = document.querySelectorAll('.nav > button');
const underline = document.querySelector('.underline') as HTMLElement;
rightStylesGroup.forEach((button, index) => button.onclick = () => switchTab(index));

//
function stylesToHTML({ section, elem }: { section: string, elem: string }, styles: any, inputs: { [key: string]: HTMLInputElement }) {
    const group = document.createElement('div');
    group.classList.add('group');   
    const header = document.createElement('span');
    header.classList.add('header');
    header.innerText = section.charAt(0).toUpperCase() + section.replace(/([A-Z])/g, ' $1').slice(1);
    group.append(header);
    Object.keys(styles).forEach(style => group.append(specificStyleToHTML(style, elem, styles[style as keyof object], inputs)));
    return group;
}

function specificStyleToHTML(section: string, elem: string, data: stylesheet_data, inputs: { [key: string]: HTMLInputElement }) {
    const { kind, type, unit, value } = data;
    const sect = document.createElement('div');
    sect.classList.add('section');
    const span = document.createElement('span');
    span.innerText = section.charAt(0).toUpperCase() + section.replace(/([A-Z])/g, ' $1').slice(1);
    const input = document.createElement('input');
    input.value = value;
    if (kind === 'innerText') input.value = elem;
    sect.append(span, input);
    inputs[section] = input;
    return sect;
}

function switchTab(index: number) {
    //changes the active tab button
    const otherElemIndex = (index + 1) % 2;
    rightStylesGroup[otherElemIndex].classList.remove('active');
    rightStylesGroup[index].classList.add('active');
    underline.style.setProperty('--active-index', index.toString());
    if (rightContent) rightContent.replaceChildren(...groups[index]);
}

export { specificStyleToHTML, stylesToHTML, setTabs, switchTab }