const Blockly = require('blockly');

const colors = ['#29b33b', '#00C7FF', '#12159f', '#ac8304', '#FFA100', '#56aeff', '#deb569', '#AD006A', '#ADB212'];

class NewToolbox extends Blockly.ToolboxCategory {
    /** @override */
    addColourBorder_(color) {
        this.rowDiv_.setAttribute('style', `--color: ${color}`);
    }
}

Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM, Blockly.ToolboxCategory.registrationName, NewToolbox, true)

let theme = Blockly.Theme.defineTheme('default', {
    base: Blockly.Themes.Classic,
});
theme.blockStyles.loop_blocks.colourPrimary = colors[0];
theme.blockStyles.logic_blocks.colourPrimary = colors[1];
theme.blockStyles.math_blocks.colourPrimary = colors[2];
theme.blockStyles.text_blocks.colourPrimary = colors[3];
theme.blockStyles.list_blocks.colourPrimary = colors[4];
theme.blockStyles.variable_blocks.colourPrimary = colors[5];
theme.blockStyles.procedure_blocks.colourPrimary = colors[6];
theme.blockStyles.colour_blocks.colourPrimary = colors[7];
// window.theme = theme;
window.color = theme.blockStyles;

exports.theme = theme;
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

exports.controls_if = {
    init: function () {
        this.jsonInit({
            'type': 'controls_if',
            'message0': '%{BKY_CONTROLS_IF_MSG_IF} %1',
            'args0': [
                {
                    'type': 'input_value',
                    'name': 'IF0',
                    'check': 'Boolean',
                },
            ],
            'message1': '%{BKY_CONTROLS_IF_MSG_THEN} %1',
            'args1': [
                {
                    'type': 'input_statement',
                    'name': 'DO0',
                },
            ],
            'colour': `${colors[0]}`,
            'previousStatement': null,
            'nextStatement': null,
            'helpUrl': '%{BKY_CONTROLS_IF_HELPURL}',
            'suppressPrefixSuffix': true,
            'mutator': 'controls_if_mutator',
            'extensions': ['controls_if_tooltip'],
        });
    }
}

exports.math_on_list = {
    init: function () {
        this.jsonInit({
            'type': 'math_on_list',
            'message0': '%1 %2',
            'args0': [
                {
                    'type': 'field_dropdown',
                    'name': 'OP',
                    'options': [
                        ['%{BKY_MATH_ONLIST_OPERATOR_SUM}', 'SUM'],
                        ['%{BKY_MATH_ONLIST_OPERATOR_MIN}', 'MIN'],
                        ['%{BKY_MATH_ONLIST_OPERATOR_MAX}', 'MAX'],
                        ['%{BKY_MATH_ONLIST_OPERATOR_AVERAGE}', 'AVERAGE'],
                        ['%{BKY_MATH_ONLIST_OPERATOR_MEDIAN}', 'MEDIAN'],
                        ['%{BKY_MATH_ONLIST_OPERATOR_MODE}', 'MODE'],
                        ['%{BKY_MATH_ONLIST_OPERATOR_STD_DEV}', 'STD_DEV'],
                        ['%{BKY_MATH_ONLIST_OPERATOR_RANDOM}', 'RANDOM'],
                    ],
                },
                {
                    'type': 'input_value',
                    'name': 'LIST',
                    'check': 'Array',
                },
            ],
            'output': 'Number',
            'colour': `${colors[4]}`,
            'helpUrl': '%{BKY_MATH_ONLIST_HELPURL}',
            'mutator': 'math_modes_of_list_mutator',
            'extensions': ['math_op_tooltip'],
        });
    }
}

exports.colour_rgb = {
    init: function () {
        this.jsonInit({
            'type': 'colour_rgb',
            'message0': 'color with %{BKY_COLOUR_RGB_RED} %1 %{BKY_COLOUR_RGB_GREEN} %2 %{BKY_COLOUR_RGB_BLUE} %3',
            'args0': [
                {
                    'type': 'input_value',
                    'name': 'RED',
                    'check': 'Number',
                    'align': 'RIGHT',
                },
                {
                    'type': 'input_value',
                    'name': 'GREEN',
                    'check': 'Number',
                    'align': 'RIGHT',
                },
                {
                    'type': 'input_value',
                    'name': 'BLUE',
                    'check': 'Number',
                    'align': 'RIGHT',
                },
            ],
            'output': 'Colour',
            'helpUrl': '%{BKY_COLOUR_RGB_HELPURL}',
            'style': 'colour_blocks',
            'tooltip': '%{BKY_COLOUR_RGB_TOOLTIP}',
        })
    }
}

exports.current_time = {
    init: function () {
        this.jsonInit({
            "type": "from_current_time_get",
            "message0": "from current time get %1",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "OPTION",
                    "options": [
                        [
                            "year",
                            "YEAR"
                        ],
                        [
                            "month",
                            "MONTH"
                        ],
                        [
                            "day of the month",
                            "DAYM"
                        ],
                        [
                            "day of the week",
                            "DAYW"
                        ],
                        [
                            "hour",
                            "HOUR"
                        ],
                        [
                            "minute",
                            "MINUTE"
                        ],
                        [
                            "second",
                            "SECOND"
                        ],
                        [
                            "millisecond",
                            "MILLISECOND"
                        ]
                    ]
                }
            ],
            "inputsInline": false,
            "output": null,
            "colour": `${colors[8]}`,
            "tooltip": "",
            "helpUrl": ""
        });
    }
}

exports.seconds_since_1970 = {
    init: function () {
        this.jsonInit({
            "type": "seconds_since_1970",
            "message0": "seconds elapsed since 1970",
            "output": null,
            "colour": `${colors[8]}`,
            "tooltip": "",
            "helpUrl": ""
        });
    }
}

exports.screen_info = {
    init: function () {
        this.jsonInit({
            "type": "screen_info",
            "message0": "screen's  %1",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PROP",
                    "options": [
                        [
                            "width",
                            "WIDTH"
                        ],
                        [
                            "height",
                            "HEIGHT"
                        ],
                        [
                            "aspect-ratio",
                            "ASP-RATIO"
                        ],
                        [
                            "color-depth",
                            "COLOR-DPT"
                        ]
                    ]
                }
            ],
            "output": null,
            "colour": `${colors[8]}`,
            "tooltip": "",
            "helpUrl": ""
        })
    }
}