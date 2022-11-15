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
        let modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML += `<h1>${this.title}</h1>`;
        let close = document.createElement('i');
        close.className = "close fa-solid fa-xmark";
        close.onclick = this.hide;
        modal.append(close);
        this.elements.forEach(element => {
            let div = document.createElement('div');
            div.className = 'section';
            div.innerHTML = `<span>${element.title}</span>`;
            let elem;
            let values = []; //here
            switch (element.type) {
                case 'input':
                    elem = document.createElement(element.type);
                    if (element.placeholder) elem.placeholder = element.placeholder;
                    div.appendChild(elem);
                    break;
                case 'selectors':
                    let selectors = document.createElement('div');
                    selectors.className = 'selectorsDiv';
                    element.selectors.forEach((option, index) => {
                        // if (index !== element.selectors.length - 1) subSection.innerHTML += `<div class="sep"></div>`;
                        let btn = document.createElement('button');
                        btn.innerHTML = `<i class="${option}"></i>`;
                        btn.onclick = () => btn.classList.toggle('selected');
                        selectors.appendChild(btn);
                    });
                    div.appendChild(selectors);
                    break;
            }
            modal.appendChild(div);
        });
        let footer = document.createElement('div');

        let btn1 = document.createElement('button');
        btn1.innerText = `<button>Cancel</button>`;
        btn1.onclick = () => this.hide;
        let btn2 = document.createElement('button');
        btn.onclick = () => {
            newProject({  }) //and here
        }
        btn2.innerText = `<button>Create</button>`;

        footer.append(btn1, btn2);
        modalContainer.replaceChildren(modal);
    }

    show() {
        modalContainer.classList.add('active');
    }

    hide() {
        modalContainer.classList.remove('active');
    }
}

function newProject({ title, platforms }) {

}

export default Modal;