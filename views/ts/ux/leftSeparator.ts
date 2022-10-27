const sides: NodeListOf<HTMLElement> = document.querySelectorAll('.leftElements > div');
const containers: NodeListOf<HTMLElement> = document.querySelectorAll('.leftElements .container');
const tops: NodeListOf<HTMLElement> = document.querySelectorAll('.leftElements .top');

tops.forEach((top, index) => {
    top.onclick = () => {
        top.classList.toggle('closed');
        containers[index].classList.toggle('collaped');  
        sides[index].classList.toggle('collaped');
        // if (top.classList.contains('closed') && tops[1 - index].classList.contains('closed')) tops[1].setAttribute('style', 'border-top: none');
        // else tops[1].removeAttribute('style');
    }
});

// containers.forEach((e, i) => e.setAttribute('style', `background: ${['blue', 'orange'][i]}`))

// const separators: NodeListOf<HTMLElement> = document.querySelectorAll('.separator');
// sides.forEach(side => {
//     side.style.height = (window.screen.height / 3) + 'px';
// });
// separators.forEach((sep, index) => {
//     sep.addEventListener('dragstart', e => {
//         // console.log(e);
//     });
//     let nextHeight = parseInt(sides[index + 1].style.height);
//     sep.addEventListener('drag', e => {
//         console.log(e.clientY);
//         // sides[index].style.height = e.y + 'px';
//         sides[index].style.height = `${e.clientY}px`;
//         sides[index + 1].style.height = `${2 * nextHeight - parseInt(sides[index].style.height)}px`;
//     });
//     // sep.onclick = () => {
//     //     sep.onmousemove = e => {
//     //         // sides[index].
//     //     }
//     // }
// });

