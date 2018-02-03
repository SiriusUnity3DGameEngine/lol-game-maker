import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function Datepicker(options) {
    Control.call(this, options);
    options = options || {};
}

Datepicker.prototype = Object.create(Control.prototype);
Datepicker.prototype.constructor = Datepicker;

Datepicker.prototype.render = function() {
    this.el.input = document.createElement('input');
    this.parent.appendChild(this.el.input);
    $(this.el.input).datepicker();
};

export { Datepicker };