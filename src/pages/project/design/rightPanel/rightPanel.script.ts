import { chunk } from "lodash";
import { currentScreenElement } from "ts/design/vars";
import { stylesheet } from "ts/interfaces/elements/styles";

const topInfoTitle = document.querySelector('.topInfo > span') as HTMLElement;
window.x = topInfoTitle;

const topInfoInput = document.querySelector('.topInfo > input') as HTMLInputElement;
const deleteButton = document.querySelector('.topInfo button') as HTMLElement;
const rightContent = document.querySelector('.rightElements > .content') as HTMLElement;

let groups: HTMLElement[][];

// right inter. switch tabs (global/specific)
const rightStylesGroup: NodeListOf<HTMLElement> = document.querySelectorAll('.nav > button');
const underline = document.querySelector('.underline') as HTMLElement;
rightStylesGroup.forEach((button, index) => button.onclick = () => switchTab(index));

export function switchTab(index: number) {
    //changes the active tab button
    const otherElemIndex = (index + 1) % 2;
    rightStylesGroup[otherElemIndex].classList.remove('active');
    rightStylesGroup[index].classList.add('active');
    underline.style.setProperty('--active-index', index.toString());
    if (rightContent) rightContent.replaceChildren(...groups[index] || '');
}

function closeChangeName() {
    currentScreenElement.get().name = topInfoTitle.innerHTML = topInfoInput.value.trim();
    topInfoInput.style.display = 'none';
    topInfoTitle.removeAttribute('style');
    dispatchEvent(new CustomEvent('updateDesignCode'));
}

topInfoTitle.onclick = () => {
    topInfoInput.removeAttribute('style');
    topInfoInput.onkeyup = e => {
        if (e.key === 'Enter') closeChangeName();
    }
    topInfoInput.value = topInfoTitle.innerText;
    topInfoTitle.style.display = 'none';
}

onclick = e => {
    if (topInfoTitle.style.display === 'none' && ![topInfoInput, topInfoTitle].includes(e.composedPath()[0] as HTMLElement))
        closeChangeName();
}

addEventListener('elementFocused', e => {
    let current = currentScreenElement.get();
    topInfoTitle.innerText = current.name;
    groups = chunk(current.styleGroups, Object.keys(stylesheet.global).length);
    switchTab(0);
    // console.log(current);
    
    deleteButton.onclick = () => {
        current.remove();
    }
});