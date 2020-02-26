/*****************
 * Main file
 *****************
 */

/**
 * Main imports
 */
const application = require("application");
const clipboard = require("clipboard");
const assets = require("assets");
const chroma = require("./node_modules/chroma-js/chroma");

/**
 * My imports
 */
const { ElementColorInput } = require("./elementColorInput");
const { ElementNumberInput } = require("./elementNumberInput");
const { styleSheet } = require("./styleSheets");
const { Color } = require("scenegraph");

/**
 * Resources
 */
var icon_add = "resources/icons/icon_add.png";
var icon_copy = "resources/icons/icon_copy.png";

/**
 * Globals
 */
var color1 = "#FF850A";
var color2 = "#000080";
var panel;
var elementMaxColorNumInput = null;
var elementColorInput1 = null;
var elementColorInput2 = null;
var BreakException = {};

function generateLayout() {
    panel = document.createElement("panel");
    let container = document.createElement("div");
    container.setAttribute("id", "panel-container");
    container.innerHTML = styleSheet() + `
    <div id="input-colors-panel" class="multiple-column-layout">

        <div id="color-first" class="input-color-container">
            <label>Color #1</label>
            <div class="color-box" style="background-color: ${color1};"></div>
            <input type="text" value="${color1}" maxlength=7 />
        </div>
        <div id="color-second" class="input-color-container">
            <label>Color #2</label>
            <div class="color-box" style="background-color: ${color2};"></div>
            <input type="text" value="${color2}" maxlength=7 />
        </div>

    </div>

    <div id="generate-options">

        <div class="options">
            <div class="options-label-container">
                <label>Number of generated colors:</label>
            </div>
            <div>
                <input id="input-num-of-colors" type="number" value=6 maxlength=2 />
            </div>
        </div>

        <div class="options">
            <div class="options-label-container">
                <label>Primary color to display:</label>
            </div>
            <div>
            <select id="select-color-code-display">
                <option value="HEX" selected="selected">HEX</option>
                <option value="RGB">RGB</option>
                <option value="HSB">HSB</option>
            </select>
            </div>
        </div>

    </div>

    <div style="text-align: center;">
        <button id="button-generate-color" type="button"
        title="Generate specified number of colors from gradient" uxp-variant="cta">Generate Colors</button>
    </div>

    <hr />

    <ul id="list-color"></ul>
    `;
    panel.appendChild(container);
}

function setupComponents () {
    elementColorInput1 = new ElementColorInput("#color-first", color1);
    elementColorInput2 = new ElementColorInput("#color-second", color2);
    elementMaxColorNumInput = new ElementNumberInput("#input-num-of-colors");
}

function emptyDOMList(domObj) {
    while (domObj.firstChild) {
        domObj.removeChild(domObj.firstChild);
    }
}

function createInteraction() {
    // Handle color generation options
    document.querySelector("#select-color-code-display").addEventListener("change", () => {
        console.log("Selected color display text changed");
    });

    // Generate new colors in the LCH space when CTA is clicked
    document.querySelector("#button-generate-color").addEventListener("click", () => {
        const colorList = document.querySelector("#list-color");
        // empty color list
        emptyDOMList(colorList);

        const numOfColors = elementMaxColorNumInput.getNumber();
        const colors = chroma.scale([elementColorInput1.getColor(), elementColorInput2.getColor()])
            .mode("lch")
            .colors(numOfColors);

        console.log(`Generated ${colors.length} colors`);

        colorList.addEventListener("click", (e) => {
            // BreakException is a way for me to break out of a forEach loop
            try {
                document.querySelectorAll("p[id^=text-color]").forEach(p => {
                    const color = p.innerHTML;
                    if (e.target && e.target.id == `icon-add-${color}`) {
                        application.editDocument(() => assets.colors.add([new Color(color)]) );
                        throw BreakException;
                    } else if (e.target && e.target.id == `icon-copy-${color}`) {
                        clipboard.copyText(color);
                        throw BreakException;
                    }
                });
            } catch (e) {
                if (e !== BreakException) throw e;
            }
        });

        for (const color of colors) {
            let colorListElement = document.createElement("li");
            colorListElement.innerHTML = `
            <div class="added-color">
                <div class="color-box-wide row" style="color: white; background-color: ${color};">
                    <p style="font-size: 12pt;">${color}</p>
                    <div style="position: absolute; right: 24px;">
                        <img id="icon-add-${color}" src="${icon_add}" alt="Add" title="Add to assets"/>
                        <img id="icon-copy-${color}" src="${icon_copy}" alt="Copy" title="Copy to clipboard"/>
                    </div>
                </div>
            </div>           
            `;
            colorList.appendChild(colorListElement);
        }
    });
}

function show(event) {
    generateLayout();
    event.node.appendChild(panel);
    setupComponents();
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