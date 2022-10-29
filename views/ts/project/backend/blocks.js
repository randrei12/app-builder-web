const colors = ['#29b33b']

exports.go_to = {
    init: function () {
        this.jsonInit({
            "type": "go_to",
            "message0": "go to %1 %2",
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