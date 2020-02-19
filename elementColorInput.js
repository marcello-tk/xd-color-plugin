/**
 * A React-esque object that encapsulates the '#input-num-of-colors'
 * input field to hold past values and do proper checks in the same JS
 * module.
 */

class ElementColorInput {

    constructor (domElement, defaultValue) {
        this.component = document.querySelector(domElement);
        if (this.component === undefined) {
            console.warn(`ElementColorInput could not find '${domElement}' DOM element!`)
        } else {
            this.inputField = document.querySelector(`${domElement} input`);
            this.display = document.querySelector(`${domElement} .color-box`);
            this.display.style.backgroundColor = defaultValue;
            this.maxLength = 7;
            this.lastValue = this.inputField.value;

            this.inputField.addEventListener("change", () => {
                const newValue = this.validateColorInput();
                if (newValue) {
                    console.log(`Updating color value to ${newValue}`);
                    this.inputField.value = newValue;
                    this.display.style.backgroundColor = newValue;
                    this.lastValue = newValue;
                } else {
                    this.inputField.value = this.lastValue;
                }
            });
        }
    }

    getColor () {
        return this.inputField.value;
    }

    validateColorInput () {
        if (!this.isEmpty()) {
            console.log("Not empty");
            const newValue = this.truncateInputLength();
            console.log(`Truncated value ${newValue}`);
            if (this.testForHex(newValue)) {
                return newValue;
            }
        }
        return null;
    }

    isEmpty () {
        return this.inputField.value.length === 0 ? true : false;
    }

    truncateInputLength () {
        let truncated = this.inputField.value;
        if (this.inputField.value.length > this.maxLength) {
            if (this.inputField.value.substring(0, 1) === '#') { 
                truncated = this.inputField.value.substring(0, this.maxLength)
            } else {
                truncated = "#" + this.inputField.value.substring(0, this.maxLength-1)
            }
        }
        return truncated;
    }
    
    testForHex (input) {
        let regexp = /^#?[0-9a-fA-F]+$/;
        if (regexp.test(input)) {
            console.log('input is HEX')
            return true;
        }
        console.log('input is not HEX')
        return false;
    }

}

module.exports = {
    ElementColorInput
};