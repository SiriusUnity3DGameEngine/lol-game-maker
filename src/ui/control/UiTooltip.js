import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiTooltip(options) {
    UiControl.call(this, options);
    options = options || {};
}

UiTooltip.prototype = Object.create(UiControl.prototype);
UiTooltip.prototype.constructor = UiTooltip;

UiTooltip.prototype.render = function() {
    $(document).tooltip();
};

export { UiTooltip };