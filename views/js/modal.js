/** Modal Class
*   @param {String} title - The title of the modal
*   @param {Object[]} elements - The elements of the modal, containing objects with the sections properties
*   @param {String} elements[].title - The title of the section
*   @param {String} elements[].type - the type of the section
*   @param {String} elements[].placeholder - A placeholder for the section if it has an input
*   @param {Array[]} elements[].selectors - An array of arrays with select types
**/

const modalContainer = document.querySelector('.modalContainer');

class Modal {
    constructor({ title, elements }) {
        this.title = title;
        this.elements = elements;
    }

    generateHTML() {
        let code = document.createElement('div');
        code.className = 'modal';
        code.innerHTML += `<h1>${this.title}</h1>`;
        let close = document.createElement('i');
        close.className = "close fa-solid fa-xmark";
        close.onclick = this.hide;
        code.append(close);
        this.elements.forEach(element => {
            let div = document.createElement('div');
            div.className = 'section';
            div.innerHTML = `<span>${element.title}</span>`;
            let elem;
            switch (element.type) {
                case 'input':
                    elem = document.createElement(element.type);
                    if (element.placeholder) elem.placeholder = element.placeholder;
                    div.appendChild(elem);
                    break;
                case 'selectors':
                    let selectors = document.createElement('div');
                    selectors.className = 'selectorsDiv';
                    element.selectors.forEach(sect => {
                        let subSection = document.createElement('div');
                        subSection.className = 'selectorsSubsection';
                        sect.forEach((option, index) => {
                            console.log('btn' + index);
                            let btn = document.createElement('button');
                            btn.innerHTML = `<i class="${option}"></i>`;
                            btn.onclick = () => {
                                console.log('selected button #' + index);
                                btn.classList.toggle('selected');
                            }
                            subSection.appendChild(btn);
                            if (index !== sect.length - 1) subSection.innerHTML += `<div class="sep"></div>`;
                        });
                        selectors.appendChild(subSection);
                    });
                    div.appendChild(selectors);
                    break;
                    
            }
            code.appendChild(div);
        });
        modalContainer.replaceChildren(code);
    }

    show() {
        modalContainer.classList.add('active');
    }

    hide() {
        modalContainer.classList.remove('active');
    }
}

export default Modal;