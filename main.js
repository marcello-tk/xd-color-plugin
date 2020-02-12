/*
 * Main file
 */

const chroma = require("./node_modules/chroma-js/chroma");
var color1 = `#FF850A`;
var color2 = `#000080`;
var panel;

function generateLayout() {
    panel = document.createElement("panel");
    let container = document.createElement("div");
    container.innerHTML = `
    <style>
        .multiple-column-layout {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            padding-bottom: 6px;
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

        #input-num-of-colors {
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

        #color-list li {
            position: relative;
            float: left;
            height: 40px;
            width: 40px;
        }

        #input-colors-panel {
            padding-bottom: 16px;
        }

        #generate-options {
            padding-bottom: 16px;
        }

        #button-generate-color {
            padding-bottom: 16px;
        }
    </style>

    <div id="input-colors-panel" class="multiple-column-layout">

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

        <div class="multiple-column-layout">
            <p>Number of generated colors</p>
            <input id="input-num-of-colors" type="number" value="6" maxlength=2 min=2 />
        </div>

        <div class="multiple-column-layout">
            <p>Primary color to display</p>
            <select id="select-color-code-display">
                <option value="HEX" selected="selected">HEX</option>
                <option value="RGB">RGB</option>
                <option value="HSB">HSB</option>
            </select>
        </div>

    </div>

    <div style="text-align: center;">
        <button id="button-generate-color" type="button" uxp-variant="cta">Generate Colors</button>
    </div>

    <ul id="list-color"></ul>
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
    // Handling input colors 1 and 2 -> change color on UI panel
    document.querySelector("#color-first").addEventListener("change", (event) => {
        color1 = `#${event.target.value}`;
        if (validateColorInput(color1)) {
            document.querySelector("#color-first .color-box").style.backgroundColor = color1;
        }
    });
    document.querySelector("#color-second").addEventListener("change", (event) => {
        color2 = `#${event.target.value}`;
        if (validateColorInput(color2)) {
            document.querySelector("#color-second .color-box").style.backgroundColor = color2;
        }
    });

    // Handle color generation options
    document.querySelector("#select-color-code-display").addEventListener("change", () => {
        console.log("Selected color display text changed");
    });

    // Generate new colors in the LCH space when CTA is clicked
    document.querySelector("#button-generate-color").addEventListener("click", () => {
        const colorList = document.querySelector("#list-color");
        // empty color list
        emptyDOMList(colorList);

        const numOfColors = document.querySelector("#input-num-of-colors").value;
        const colors = chroma.scale([color1, color2]).mode("lch").colors(numOfColors);
        //console.log(colors);
        for (const color of colors) {
            let colorListElement = document.createElement("li");
            colorListElement.innerHTML = `
            <div class="added-color">
                <div class="color-box-wide" style="color: white; background-color: ${color};">${color}</div>
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