import Blockly from 'blockly';
// import { generateError } from './utils';
import theme from './blocks';


//* for debbuging
declare global {
    interface Window {
        [key: string]: any
    }
}

window.Blockly = Blockly;