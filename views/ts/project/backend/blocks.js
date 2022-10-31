const Blockly = require('blockly');

const colors = ['#29b33b', '', '', '', '', '', '', ''];

class NewToolbox extends Blockly.ToolboxCategory {
    /** @override */
    addColourBorder_(color) {
        this.rowDiv_.setAttribute('style', `--color: ${color}`);
    }
}

Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM, Blockly.ToolboxCategory.registrationName, NewToolbox, true)

// let theme = Blockly.Theme.defineTheme('themeName', {
//     base: Blockly.Themes.Classic,
// });
// theme.blockStyles.list_blocks.colourPrimary = '#FF00DC';
// theme.blockStyles.logic_blocks.colourPrimary = '#FF00DC';
// window.theme = theme;
// window.color = theme.blockStyles;

// exports.theme = theme;
exports.go_to = {
    init: function () {
        this.jsonInit({
            "type": "go_to",
            "message0": "go to screen %1 %2",
            "args0": [
                {
                    "type": "input_value",
                    "name": "LOCATION",
                    "check": "String"
                },
                {
                    "type": "input_dummy",
                    "name": "VALUE",
                }
            ],
            "previousStatement": null,
            "colour": `${colors[0]}`,
            "tooltip": "",
            "helpUrl": ""
        });
    }
}

exports.set_timeout = {
    init: function () {
        this.jsonInit({
            "type": "set_timeout",
            "message0": "after %1 seconds do %2 %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "TIME",
                    "check": "Number"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "CODE"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": `${colors[0]}`,
            "tooltip": "",
            "helpUrl": ""
        });
    }
}

exports.set_interval = {
    init: function () {
        this.jsonInit({
            "type": "set_interval",
            "message0": "each %1 seconds do %2 %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "TIME",
                    "check": "Number"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "CODE"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": `${colors[0]}`,
            "tooltip": "",
            "helpUrl": ""
        });
    }
}

exports.test_true_false = {
    init: function () {
        this.jsonInit({
            "type": "test_true_false",
            "message0": "test %1 if true %2 if false %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "LOGIC"
                },
                {
                    "type": "input_value",
                    "name": "TRUE"
                },
                {
                    "type": "input_value",
                    "name": "FALSE"
                }
            ],
            "output": null,
            "colour": `${colors[0]}`,
            "tooltip": "",
            "helpUrl": ""
        });
    }
}

exports.foreach = {
    init: function () {
        this.jsonInit({
            "type": "foreach",
            "message0": "for each %1 in list %2 do %3",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "ELEMENT",
                    "variable": "element",
                },
                {
                    "type": "input_value",
                    "name": "LIST",
                    "check": "Array"
                },
                {
                    "type": "input_statement",
                    "name": "DO"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": `${colors[0]}`,
            "tooltip": "",
            "helpUrl": ""
        });
    }
}

exports.open_url = {
    init: function () {
        this.jsonInit({
            "type": "open_url",
            "message0": "open url %1 as %2 tab",
            "args0": [
                {
                    "type": "input_value",
                    "name": "URL",
                    "check": "String"
                },
                {
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        [
                            "new",
                            "blank"
                        ],
                        [
                            "current",
                            "self"
                        ]
                    ]
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": `${colors[0]}`,
            "tooltip": "",
            "helpUrl": ""
        });
    }
}

exports.newline = {
    init: function () {
        this.jsonInit({
            "type": "newline",
            "message0": "newline",
            "output": null,
            "colour": `${colors[3]}`,
            "tooltip": "",
            "helpUrl": ""
        });
    }
}