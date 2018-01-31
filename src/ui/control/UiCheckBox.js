import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiCheckBox(options) {
    UiControl.call(this, options);
    options = options || {};
    this.label = options.label || null;
    this.value = options.value || null;
}

UiCheckBox.prototype = Object.create(UiControl.prototype);
UiCheckBox.prototype.constructor = UiCheckBox;

UiCheckBox.prototype.render = function() {
    this.el.div = document.createElement('div');
    this.parent.appendChild(this.el.div);
    if (this.label) {
        this.el.label = document.createElement('label');
        this.el.label.innerHTML = this.label;
        this.el.div.appendChild(this.el.label);
    }
    this.el.input = document.createElement('input');
    this.el.input.setAttribute('type', 'checkbox');
    this.el.input.setAttribute('value', this.value);
    this.el.div.appendChild(this.el.input);
    $(this.el.div).controlgroup();
};

export { UiCheckBox };