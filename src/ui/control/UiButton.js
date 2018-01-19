import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiButton(options) {
    Control.call(this, options);
}

UiButton.prototype = Object.create(Control.prototype);
UiButton.prototype.constructor = UiButton;

UiButton.prototype.render = function() {

};

export { UiButton };