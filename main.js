/*
 * Main file
 */

const chroma = require("./node_modules/chroma-js/chroma");
var color1 = `#FF850A`;
var color2 = `navy`;
var panel;
var numOfColors = 6;
var colorCodeDisplayText = 'HEX';

function generateLayout() {
    panel = document.createElement("panel");
    let container = document.createElement("div");
    container.innerHTML = `
    <style>
        #input-colors-panel {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
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

        #color-list li {
            position: relative;
            float: left;
            height: 40px;
            width: 40px;
        }
    </style>

    <div id="input-colors-panel">

        <div id="color-first" class="input-color-container">
            <div class="color-box" style="background-color: ${color1};"></div>
            <input type="text" value="${color1}" maxlength=7 />
        </div>
        <div id="color-second" class="input-color-container">
            <div class="color-box" style="background-color: ${color2};"></div>
            <input type="text" value="${color2}" maxlength=7 />
        </div>

    </div>

    <div id="generate-options">
        <table>
            <tr>
                <td>Number of generated colors<td>
                <td><input type="number" value="${numOfColors}" maxlength=2 min=3 /></td>
            </tr>
            <tr>
                <td>Primary color to display<td>
                <td>
                    <select id="color-code-display-list">
                        <option value="HEX">HEX</option>
                        <option value="RGB">RGB</option>
                        <option value="HSB">HSB</option>
                    </select>
                </td>
            </tr>
        </table>
    </div>

    <div style="text-align: center;">
        <button id="ok" type="button" uxp-variant="cta">Generate Colors</button>
    </div>

    <ul id="color-list"></ul>
    `;
    panel.appendChild(container);
}

function validateColorInput(text) {
    if (text.length === 7) {
        return true;
    }
}

function emptyDOMList(domObj) {
    while (domObj.firstChild) {
        domObj.removeChild(domObj.firstChild);
    }
}

function createInteraction() {
    const inputColor1 = document.querySelector("#color-first");
    const inputColor2 = document.querySelector("#color-second");

    // Handling input colors 1 and 2 -> change color on UI panel
    inputColor1.addEventListener('change', (event) => {
        color1 = `#${event.target.value}`;
        if (validateColorInput(color1)) {
            document.querySelector("#color-first .color-box").style.backgroundColor = color1;
        }
    });
    inputColor2.addEventListener('change', (event) => {
        color2 = `#${event.target.value}`;
        if (validateColorInput(color2)) {
            document.querySelector("#color-second .color-box").style.backgroundColor = color2;
        }
    });

    // Generate new colors in the LCH space when CTA is clicked
    document.querySelector("#ok").addEventListener("click", () => {
        const colorList = document.querySelector("#color-list");
        // empty color list
        emptyDOMList(colorList);

        let colors = chroma.scale([color1, color2]).mode("lch").colors(numOfColors);
        console.log(colors);
        for (const color of colors) {
            let colorListElement = document.createElement("li");
            colorListElement.innerHTML = `
            <div class="added-color">
                <div class="color-box" style="background-color: ${color};"></div>
            </div>           
            `;
            colorList.appendChild(colorListElement);    
        }
    });
}

function show(event) {
    generateLayout();
    event.node.appendChild(panel);
    createInteraction();
}

function hide(event) {
    event.node.firstChild.remove();
}

module.exports = {
    panels: {
        colorReveal: {
            show,
            hide
        }
    }
};