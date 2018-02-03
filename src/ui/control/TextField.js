import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function TextField(options) {
    Control.call(this, options);
    options = options || {};
    this.type = options.type || 'text';
    this.label = options.label || null;
    this.labelWidth = options.labelWidth || '35px';
    this.value = options.value || '';
}

TextField.prototype = Object.create(Control.prototype);
TextField.prototype.constructor = TextField;

TextField.prototype.render = function() {
    this.el.div = document.createElement('div');
    this.el.div.style.margin = '3px 0';
    this.parent.appendChild(this.el.div);
    if (this.label) {
        this.el.label = document.createElement('label');
        this.el.label.innerHTML = this.label;
        this.el.label.style.width = this.labelWidth;
        this.el.label.style.display = 'inline-block';
        this.el.label.style.textAlign = 'right';
        this.el.div.appendChild(this.el.label);
    }
    this.el.input = document.createElement('input');
    this.el.input.setAttribute('type', this.type);
    this.el.input.setAttribute('value', this.value);
    this.el.input.style.marginLeft = '5px';
    this.el.div.appendChild(this.el.input);
};

TextField.prototype.getValue = function() {
    return this.el.input.value;
};

TextField.prototype.setValue = function(value) {
    this.value = value;
    this.el.input.setAttribute('value', this.value);
};

export { TextField };