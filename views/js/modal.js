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
    constructor({ title, type, elements }) {
        this.title = title;
        this.type = type;
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
        let values = []; //here
        this.elements.forEach(element => {
            let div = document.createElement('div');
            div.className = 'section';
            div.innerHTML = `<span>${element.title}</span>`;
            let elem;
            let errorElem = document.createElement('span');
            errorElem.className = 'ErrorElement';
            switch (element.type) {
                case 'input':
                    elem = document.createElement(element.type);
                    if (element.placeholder) elem.placeholder = element.placeholder;
                    div.append(elem, errorElem);
                    values.push({ target: elem, error: errorElem });
                    break;
                case 'selectors':
                    let obj = { values: [], error: errorElem };
                    let selectors = document.createElement('div');
                    selectors.className = 'selectorsDiv';
                    element.selectors.forEach((option, index) => {
                        obj.values[index] = false;
                        // if (index !== element.selectors.length - 1) subSection.innerHTML += `<div class="sep"></div>`;
                        let btn = document.createElement('button');
                        btn.innerHTML = `<i class="${option}"></i>`;
                        btn.onclick = () => {
                            btn.classList.toggle('selected');
                            obj.values[index] = !obj.values[index];
                        }
                        selectors.appendChild(btn);
                    });
                    values.push(obj);
                    div.append(selectors, errorElem);
                    break;
            }
            modal.appendChild(div);
        });
        let footer = document.createElement('div');

        let btn1 = document.createElement('button');
        btn1.innerText = `Cancel`;
        btn1.onclick = this.hide;
        let btn2 = document.createElement('button');
        btn2.onclick = () => {
            if (this.type === 'newProject') newProject(values);
        }
        btn2.innerText = `Create`;

        footer.append(btn1, btn2);
        modal.append(footer);
        modalContainer.replaceChildren(modal);
    }

    show() {
        modalContainer.classList.add('active');
    }

    hide() {
        modalContainer.classList.remove('active');
    }
}

async function newProject([title, platformsObj]) {
    let titleValue = title.target.value.trim();
    if (titleValue) title.error.innerText = '';
    else return title.error.innerText = 'The project needs a title';

    if (platformsObj.values.some(e => e)) platformsObj.error.innerText = '';
    else return platformsObj.error.innerText = 'At least one platform must be choosen';

    let plats = ['web', 'pc', 'mobile'];
    let platforms = [];
    for (let i = 0; i < plats.length; i++)
        if (platformsObj.values[i])
            platforms.push(plats[i]);

    Swal.fire({
        title: 'Creating project...', 
        text: 'We are building the project just for you!',
        allowOutsideClick: false,
    });
    Swal.showLoading();
    let res = await fetch('/newProject', {
        method: 'POST',
        body: JSON.stringify({
            title: titleValue,
            platforms
        }),
        headers: {
            'content-type': 'application/json',
        }
    });
    let data = await res.text();
    Swal.close();
    if (res.status === 201) location = `/projects/${data.substring(1, data.length - 1)}`;
    else Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data,
    });
}

export default Modal;