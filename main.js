/*
 * Main file
 */

const chroma = require("./node_modules/chroma-js/chroma");
var color1 = `#FF850A`;
var color2 = `navy`;
var panel;

function generateLayout() {
    panel = document.createElement("panel");
    let container = document.createElement("div");
    container.innerHTML = `
    <style>
        .input-color-container {
            position: relative;
            height: 40px;
        }
        .input-color-container input {
            padding-left: 20px;
        }

        .color-box {
            width: 20px;
            height: 20px;
            display: inline-block;
            background-color: #ccc;
            position: absolute;
            left: 5px;
            top: 5px;
        }

        #color-list li {
            position: relative;
            float: left;
            height: 40px;
            width: 40px;
        }
    </style>
    <ul id="color-list">
        <li>
            <div id="color-first" class="input-color-container">
                <input type="text" value="Orange" maxlength=6 />
                <div class="color-box" style="background-color: ${color1};"></div>
            </div>
        </li>
        <li>
            <div id="color-second" class="input-color-container">
                <input type="text" value="Blue" maxlength=6 />
                <div class="color-box" style="background-color: ${color2};"></div>
            </div>
        </li>
    </ul>
    <div style="text-align: center;">
        <button id="ok" type="button" uxp-variant="cta">Generate Colors</button>
    </div>
    `;
    panel.appendChild(container);
}

function validateColorInput(text) {
    if (text.length === 7) {
        return true;
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
    inputColor2.addEventListener('change', (value) => {
        color2 = `#${value}`;
        const asd = document.querySelector("#color-first .color-box");
        asd.style.backgroundColor = color2;
    });

    // Generate new colors in the LCH space when CTA is clicked
    document.querySelector("#ok").addEventListener("click", () => {
        let colors = chroma.scale([color1, color2]).mode("lch").colors(6);
        console.log(colors);
        for (const color of colors) {
            let colorListElement = document.createElement("li");
            colorListElement.innerHTML = `
            <div class="added-color">
                <div class="color-box" style="background-color: ${color};"></div>
            </div>           
            `;
            document.querySelector("#color-list").appendChild(colorListElement);    
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