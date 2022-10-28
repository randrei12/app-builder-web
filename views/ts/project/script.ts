import './frontend/script';
import './backend/script';

window.history.pushState = new Proxy(window.history.pushState, {
    apply: (target, thisArg, argArray) => {
        // trigger here what you need
        console.log('url');
        return target.apply(thisArg, argArray);
    },
});

const navButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.topZone > div > button'); //design/blocks buttons
const components: NodeListOf<HTMLElement> = document.querySelectorAll('.component'); //component divs
navButtons.forEach((btn, index) => {
    btn.onclick = () => {
        history.pushState('', '', new URL(btn.dataset.nav, location.href).toString()); //changing top url based on button dataset
        btn.className = 'current';
        components[index].classList.add('active'); //setting the active class to other component
        navButtons[1 - index].className = ''; //remove current class from other button
        components[1 - index].classList.remove('active'); //remove active class from other component div
    }
});

if (screen.width < 830) document.body.innerText = 'Studio cannot work properly on this device. Please use a PC';