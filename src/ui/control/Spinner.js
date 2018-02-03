import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function Spinner(options) {
    Control.call(this, options);
    options = options || {};
}

Spinner.prototype = Object.create(Control.prototype);
Spinner.prototype.constructor = Spinner;

Spinner.prototype.render = function() {
    this.el.input = document.createElement('input');
    this.parent.appendChild(this.el.input);
    $(this.el.input).spinner();
};

export { Spinner };