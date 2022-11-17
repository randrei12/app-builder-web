import Modal from "../modal.js";

const inputDiv = document.querySelector('.searchInput');
const newProjectButton = document.querySelector('.createProject');

inputDiv.onclick = () => inputDiv.children[1].focus(); //automatically focus on input when user clicks any child of the input div

newProjectButton.onclick = () => {
    let modal = new Modal({ title: 'Create a new project', type: 'newProject', elements: [{ title: 'Name', type: 'input' }, { title: 'Select platforms', type: 'selectors', selectors: ['fa-solid fa-globe', 'fa-solid fa-computer', 'fa-solid fa-mobile'] }] });
    modal.generateHTML();
    modal.show();
}

//projects list actions

const projects = [...document.querySelectorAll('.projectsList > .project')];
projects.forEach(project => {
    const projectFooter = project.children[1].children[1];
    project.onclick = e => {
        if (e.path.includes(projectFooter)) return;
        location.href += `/${project.dataset.id}`;
    }
});