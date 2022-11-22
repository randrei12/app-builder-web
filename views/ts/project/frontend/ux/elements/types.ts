const specialTypes = {
    screen: 'body',
    text: 'span',
    image: 'img',
}

const styleTypes = {

}

interface element_template {
    type?: string;
    id?: string;
    prebuild?: HTMLElement;
    name?: string;
    from?: any;
}

export { specialTypes, styleTypes, element_template };