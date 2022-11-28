import template from './html_template';

interface HTMLConverter {
    setTarget: (param: any) => void;
    setJavaScript: (code: any) => void;
    convert: () => void;
}

function droppedToElem(elem: any) {
    let html = elem.getElement();
    let clone = html.cloneNode();
    clone.setAttribute('src', html.getAttribute('src') || '');
    if (!['screen', 'div'].includes(elem.type)) clone.innerText = html.innerText;
    clone.setAttribute('class', elem.id);
    elem.children.get().forEach((child: any) => clone.append(droppedToElem(child)));
    return clone;
}

class HTMLConverter {
    constructor() {
        let target: any;
        let javascript = '';

        this.setTarget = param => target = param;
        this.convert = () => {
            const data = droppedToElem(target);
            const a = document.createElement('a');
            a.setAttribute('href', 'data:text/plain;charset=utf-8, ' + template + encodeURIComponent(data.outerHTML) + javascript);
            console.log(template + data.outerHTML + javascript);
            a.download = 'index.html';
            a.click();            
        }

        this.setJavaScript = code => javascript = `<script type="module">${code}</script>`;
    }
}

export default HTMLConverter;

// exports.HTMLConverter = HTMLConverter;
// exports.droppedToElem = droppedToElem;