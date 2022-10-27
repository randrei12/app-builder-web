const specialTypes = {
    screen: 'body',
    text: 'span',
    image: 'img',
}

interface element_template {
    type: string;
    id: string;
    prebuild?: HTMLElement;
}

export { specialTypes, element_template };