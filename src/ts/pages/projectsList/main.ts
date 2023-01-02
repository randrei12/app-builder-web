// import selectorsModal from '../modals/selectors';
const inputDiv = document.querySelector('.searchInput') as HTMLDivElement;
inputDiv.onclick = () => (inputDiv.children[1] as HTMLElement).focus(); //automatically focus on input when user clicks any child of the input div

const projects = document.querySelectorAll('.projectsList > .project') as NodeListOf<HTMLButtonElement>;
projects.forEach(project => {
    const projectFooter = project.children[1].children[1];
    project.onclick = e => {
        if (e.composedPath().includes(projectFooter)) return;
        location.href += `/${project.dataset.id}`;
    }
});


export {};