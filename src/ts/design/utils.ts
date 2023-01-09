import { stylesheet_data } from "ts/interfaces/elements/styles";

export function stylesToHTML({ section, elem }: { section: string, elem: string }, styles: any, inputs: { [key: string]: HTMLInputElement }) {
    const group = document.createElement('div');
    group.classList.add('group');   
    const header = document.createElement('span');
    header.classList.add('header');
    header.innerText = section.charAt(0).toUpperCase() + section.replace(/([A-Z])/g, ' $1').slice(1);
    group.append(header);
    Object.keys(styles).forEach(style => group.append(specificStyleToHTML(style, elem, styles[style as keyof object], inputs)));
    return group;
}

export function specificStyleToHTML(section: string, elem: string, data: stylesheet_data, inputs: { [key: string]: HTMLInputElement }) {
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