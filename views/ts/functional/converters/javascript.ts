interface JSConverter {
    setTemplate: (temp: template) => void;
    convert: () => void;
}

type template = {
    nodes?: string[];
}

class JSConverter {
    constructor() {
        let template: template;

        this.setTemplate = (temp: template) => template = temp
        this.convert = () => {
            let code = '';
            template.nodes.forEach(node => {
                code += `const ${node} = document.querySelector('.${node}');\n`;
            });
            return code;
        };
    }
}

export default JSConverter;