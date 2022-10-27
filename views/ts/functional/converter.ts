import template from '../converter/template';

interface HTMLConverter {
    setTarget: (param: any) => void;
    convert: () => void;
}

function droppedToElem(elem: any) {
    let html = elem.getHtml();
    let clone = html.cloneNode();
    clone.setAttribute('src', html.getAttribute('src') || '');
    if (!['screen', 'div'].includes(elem.type)) clone.innerText = html.innerText;
    clone.setAttribute('class', elem.id);
    elem.children.get().forEach((child: any) => clone.append(droppedToElem(child)));
    console.log({html, clone});
    return clone;
    
}

class HTMLConverter {
    constructor() {
        let target: any;

        this.setTarget = param => target = param;
        this.convert = () => {
            const data = droppedToElem(target);
            const a = document.createElement('a');
            a.setAttribute('href', 'data:text/plain;charset=utf-8, ' + template + encodeURIComponent(data.outerHTML));
            a.download = 'index.html';
            a.click();            
        }
    }
}

export default HTMLConverter;