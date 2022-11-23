const stylesheet = {
    global: {
        styling: {
            backgroundColor: {
                value: 'transparent',
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
        }
    },
    text: {
        writing: {
            text: {
                value: "text",
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
                value: "text",
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
            },
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
            },
        }
    },
    screen: {},
    defaults: {
        button: {
            backgroundColor: {
                value: 'white'
            },
            borderRadius: {
                value: '5px'
            },
            border: {
                value: '1px solid black'
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
}


interface stylesheet_data {
    value: string,
    kind: string,
    type: string,
    keyboard?: string,
    unit?: string[]
}

function stylesheetToPlain(stylesheet: { [x: string]: { [x: string]: stylesheet_data; }; }) {
    let obj: any = {};
    let categories = Object.keys(stylesheet);
    categories.forEach(category => {
        let styles = Object.keys(stylesheet[category]);
        styles.forEach(style => {
            obj[style] = stylesheet[category][style];
        });
    });
    return obj;
}

export { stylesheet, stylesheet_data, stylesheetToPlain };