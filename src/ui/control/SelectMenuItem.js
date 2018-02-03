import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function SelectMenuItem(options) {
    Control.call(this, options);
    options = options || {};
    this.text = options.text || 'Item';
}

SelectMenuItem.prototype = Object.create(Control.prototype);
SelectMenuItem.prototype.constructor = SelectMenuItem;

SelectMenuItem.prototype.render = function() {
    this.el.option = document.createElement('option');
    this.el.option.innerHTML = this.text;
    this.parent.appendChild(this.el.option);
};

export { SelectMenuItem };