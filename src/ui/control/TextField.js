import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function TextField(options) {
    Control.call(this, options);
    options = options || {};
    this.label = options.label || null;
    this.value = options.value || null;
}

TextField.prototype = Object.create(Control.prototype);
TextField.prototype.constructor = TextField;

TextField.prototype.render = function() {
    this.el.div = document.createElement('div');
    this.parent.appendChild(this.el.div);
    if (this.label) {
        this.el.label = document.createElement('label');
        this.el.label.innerHTML = this.label;
        this.el.div.appendChild(this.el.label);
    }
    this.el.input = document.createElement('input');
    this.el.input.setAttribute('type', 'text');
    this.el.input.setAttribute('value', this.value);
    this.el.div.appendChild(this.el.input);
    $(this.el.div).controlgroup();
};

export { TextField };