import DroppedElement from "ts/design";
import { screenElements } from "ts/design/vars";

export default (design: string) => {
    screenElements.length = 0;
    let deviceScreen = new DroppedElement().buildFromObject(Object.assign({ type: 'screen' }, JSON.parse(design)));
    deviceScreen.focus();
    
    const containerButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.elementsPanel > .container > button');
    containerButtons.forEach(button => {
        button.onclick = () => {
            let element = new DroppedElement().buildFromObject({ type: button.dataset.type as string, parent: deviceScreen});
            element.focus();
        };
    });
}
