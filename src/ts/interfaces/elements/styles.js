"use strict";
exports.__esModule = true;
exports.stylesheetToPlain = exports.stylesheet = void 0;
var stylesheet = {
    global: {
        styling: {
            backgroundColor: {
                value: 'transparent',
                kind: 'style',
                type: 'color'
            },
            color: {
                value: 'black',
                kind: 'style',
                type: 'color'
            },
            borderRadius: {
                value: '15',
                kind: 'style',
                type: 'unit',
                keyboard: 'numeric',
                unit: ['px', '%']
            },
            padding: {
                value: '0',
                kind: 'style',
                type: 'unit',
                keyboard: 'numeric',
                unit: ['px', '%']
            },
            border: {
                value: 'none',
                kind: 'style',
                type: 'default'
            }
        }
    },
    text: {
        writing: {
            text: {
                value: '',
                kind: 'innerText',
                type: 'default'
            },
            fontSize: {
                value: '16',
                kind: 'style',
                type: 'unit',
                keyboard: 'numeric',
                unit: ['px', 'em']
            }
        }
    },
    button: {
        writing: {
            text: {
                value: '',
                kind: 'innerText',
                type: 'default'
            },
            fontSize: {
                value: '16',
                kind: 'style',
                type: 'unit',
                keyboard: 'numeric',
                unit: ['px', 'em']
            }
        },
        sizing: {
            width: {
                value: 'auto',
                kind: 'style',
                type: 'unit',
                unit: ['px', '%', 'em']
            },
            height: {
                value: 'auto',
                kind: 'style',
                type: 'unit',
                unit: ['px', '%', 'em']
            }
        }
    },
    image: {
        image: {
            source: {
                value: "https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png",
                kind: 'src',
                type: 'default'
            }
        },
        sizing: {
            width: {
                value: 'auto',
                kind: 'style',
                type: 'unit',
                unit: ['px', '%', 'em']
            },
            height: {
                value: 'auto',
                kind: 'style',
                type: 'unit',
                unit: ['px', '%', 'em']
            }
        }
    },
    screen: {},
    defaults: {
        button: {
            backgroundColor: {
                value: 'orange'
            },
            color: {
                value: 'white'
            },
            borderRadius: {
                value: '15px'
            },
            fontSize: {
                value: '16px'
            },
            padding: {
                value: '5px 15px'
            }
        },
        screen: {
            backgroundColor: {
                value: 'white'
            }
        },
        image: {
            width: {
                value: '50px'
            },
            height: {
                value: '50px'
            }
        }
    }
};
exports.stylesheet = stylesheet;
function stylesheetToPlain(stylesheet) {
    var obj = {};
    var categories = Object.keys(stylesheet);
    categories.forEach(function (category) {
        var styles = Object.keys(stylesheet[category]);
        styles.forEach(function (style) {
            obj[style] = stylesheet[category][style];
        });
    });
    return obj;
}
exports.stylesheetToPlain = stylesheetToPlain;
