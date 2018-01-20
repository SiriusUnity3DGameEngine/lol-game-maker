import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiAutocomplete(options) {
    UiControl.call(this, options);
    options = options || {};
    this.source = options.source || [];
}

UiAutocomplete.prototype = Object.create(UiControl.prototype);
UiAutocomplete.prototype.constructor = UiAutocomplete;

UiAutocomplete.prototype.render = function() {
    this.el.input = document.createElement('input');
    this.parent.appendChild(this.el.input);
    $(this.el.input).autocomplete({
        source: this.source
    });
};

export { UiAutocomplete };