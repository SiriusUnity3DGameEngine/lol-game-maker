import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiTooltip(options) {
    Control.call(this, options);
    options = options || {};
}

UiTooltip.prototype = Object.create(Control.prototype);
UiTooltip.prototype.constructor = UiTooltip;

UiTooltip.prototype.render = function() {
    $(document).tooltip();
};

export { UiTooltip };