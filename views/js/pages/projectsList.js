import Modal from "../modal.js";

const inputDiv = document.querySelector('.searchInput');
const newProjectButton = document.querySelector('.createProject');

inputDiv.onclick = () => inputDiv.children[1].focus(); //automatically focus on input when user clicks any child of the input div

newProjectButton.onclick = () => {
    let modal = new Modal({ title: 'Create a new project', elements: [{ title: 'Name', type: 'input' }, { title: 'Select platforms', type: 'selectors', selectors: ['fa-solid fa-globe', 'fa-brands fa-apple', 'fa-brands fa-linux'] }] });
    modal.generateHTML();
    modal.show();
}

newProjectButton.click();