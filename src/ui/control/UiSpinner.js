import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiSpinner(options) {
    UiControl.call(this, options);
    options = options || {};
}

UiSpinner.prototype = Object.create(UiControl.prototype);
UiSpinner.prototype.constructor = UiSpinner;

UiSpinner.prototype.render = function() {
    this.el.input = document.createElement('input');
    this.parent.appendChild(this.el.input);
    $(this.el.input).spinner();
};

export { UiSpinner };