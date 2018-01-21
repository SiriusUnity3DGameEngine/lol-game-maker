import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiDatepicker(options) {
    UiControl.call(this, options);
    options = options || {};
}

UiDatepicker.prototype = Object.create(UiControl.prototype);
UiDatepicker.prototype.constructor = UiDatepicker;

UiDatepicker.prototype.render = function() {
    this.el.input = document.createElement('input');
    this.parent.appendChild(this.el.input);
    $(this.el.input).datepicker();
};

export { UiDatepicker };