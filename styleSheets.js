function styleSheet() {
    return (`
    <style>
        #panel-container {
            padding: 12px;
        }

        .multiple-column-layout {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            padding-bottom: 6px;
        }

        .options {
            display: flex;
            justify-content: space-around;
        }

        .options div {
            align-content: center;
        }

        .options-label-container {
            width: 100px;
        }

        .input-color-container {
            margin-left: auto;
            margin-right: auto;
        }

        .input-color-container input {
            max-width: 78px;
            margin-left: auto;
            margin-right: auto;
        }

        .input-color-container label {
            position: relative;
            left: 11px;
            padding: 4px;
        }

        #input-num-of-colors {
            display: block;
            max-width: 66px;
        }

        #select-color-code-display {
            display: block;
            max-width: 66px;
        }

        .color-box {
            border-radius: 2px;
            border: 1px solid black;
            margin-left: auto;
            margin-right: auto;
            padding: 4px;
            width: 60px;
            height: 40px;
            background-color: #ccc;
        }

        .color-box-wide {
            border-radius: 2px;
            border: 1px solid black;
            margin-left: auto;
            margin-right: auto;
            padding: 4px;
            height: 40px;
            background-color: #ccc;
            text-align: center;
            vertical-align: center;
        }

        .color-box-wide img {
            width: 28px;
            height: 28px;
            cursor: pointer;
        }

        .color-box-wide img:hover {
            border-radius: 2px;
            border: 1px solid black;
        }

        #color-list li {
            position: relative;
            float: left;
            height: 40px;
            width: 40px;
        }

        #input-colors-panel {
            padding-bottom: 16px;
        }

        #button-generate-color {
            padding-bottom: 16px;
        }
    </style>
    `)
}

module.exports = {
    styleSheet
};