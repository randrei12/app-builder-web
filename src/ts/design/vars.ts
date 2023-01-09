import { IF_DroppedElement } from "ts/interfaces/DroppedElements/class";

export let screenElements: IF_DroppedElement[] = [];
let currentScreenElementValue: IF_DroppedElement;
export let currentScreenElement = {
    set: (value: IF_DroppedElement) => {
        currentScreenElementValue = value;
    },

    get: () => currentScreenElementValue
};

//* for debbuging
window.screenElements = screenElements;
window.currentScreenElement = currentScreenElement;