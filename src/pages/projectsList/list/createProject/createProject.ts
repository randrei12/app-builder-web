import Swal from "sweetalert2";
import './createProject.scss';

function createProject() {
    return Swal.fire({
        title: "Create Project",
        text: "Name",
        // inputLabel: 'Name',
        html: `
        <div class='section'>
            <span>Name</span>
            <input>
        <div class='section'>
            <span>Name</span>
            <div class="selectorsDiv">
                <button onclick="this.classList.toggle('selected')" data-plat="web"><i class="fa-solid fa-globe"></i></button>
                <button onclick="this.classList.toggle('selected')" data-plat="pc"><i class="fa-solid fa-computer"></i></button>
                <button onclick="this.classList.toggle('selected')" data-plat="mobile"><i class="fa-solid fa-mobile"></i></button>
            </div>
        </div>`,
        reverseButtons: true,
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: 'Create',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            const input = document.querySelector('.section > input') as HTMLInputElement;
            const selectors = [...document.querySelectorAll('.selectorsDiv > .selected')] as HTMLElement[];
            let platforms = selectors.map(selector => selector.dataset.plat);
            let res = await fetch(`${import.meta.env.VITE_SERVER}/newProject`, {
                method: 'POST',
                body: JSON.stringify({
                    title: input.value,
                    platforms
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            
            if (res.ok) return await res.text();
            else return Swal.showValidationMessage('An error occurred while creating a new project.');
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then(e => e.value);
};

export { createProject };