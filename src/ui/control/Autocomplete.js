import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function Autocomplete(options) {
    Control.call(this, options);
    options = options || {};
    this.source = options.source || [];
}

Autocomplete.prototype = Object.create(Control.prototype);
Autocomplete.prototype.constructor = Autocomplete;

Autocomplete.prototype.render = function() {
    this.el.input = document.createElement('input');
    this.parent.appendChild(this.el.input);
    $(this.el.input).autocomplete({
        source: this.source
    });
};

export { Autocomplete };