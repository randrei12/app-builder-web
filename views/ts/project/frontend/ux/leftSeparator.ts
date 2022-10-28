const sides: NodeListOf<HTMLElement> = document.querySelectorAll('.leftElements > div');
const containers: NodeListOf<HTMLElement> = document.querySelectorAll('.leftElements .container');
const tops: NodeListOf<HTMLElement> = document.querySelectorAll('.leftElements .top');

tops.forEach((top, index) => {
    top.onclick = () => {
        top.classList.toggle('closed');
        containers[index].classList.toggle('collaped');  
        sides[index].classList.toggle('collaped');
    }
});