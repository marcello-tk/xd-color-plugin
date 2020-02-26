/**
 * A React-esque object that encapsulates the '#input-num-of-colors'
 * input field to hold past values and do proper checks in the same JS
 * module.
 */

class ElementNumberInput {

    constructor (domElement) {
        this.component = document.querySelector(domElement);
        if (this.component === undefined) {
            console.warn(`ElementNumberInput could not find '${domElement}' DOM element!`)
        } else {
            this.minValue = 2;
            this.maxValue = 30;
            this.lastValue = this.component.value;

            this.component.addEventListener("change", () => {
                const newValue = this.validateInput();
                if (newValue) {
                    console.log(`Updating number value to ${newValue}`);
                    this.component.value = newValue;
                    this.lastValue = newValue;
                } else {
                    this.component.value = this.lastValue;
                }
            });
        }
    }

    getNumber () {
        return this.component.value;
    }

    validateInput () {
        // input field value is string, but implicit conversion
        // allows to test for number
        if (!isNaN(this.component.value)) {
            const newValue = this.clampInput();
            console.log(`New value ${newValue}`);
            return newValue;
        }
        return null;
    }

    clampInput () {
        let clamped = this.component.value;
        if (clamped > this.maxValue) {
            clamped = this.maxValue;
        } else if (clamped < this.minValue) {
            clamped = this.minValue;
        }
        return clamped;
    }
    
}

module.exports = {
    ElementNumberInput
};