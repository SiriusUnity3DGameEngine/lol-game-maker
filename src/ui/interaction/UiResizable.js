import { UiInteraction } from '../UiInteraction';
import { UiControl } from '../UiControl';
import { UiHelper } from '../UiHelper';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiResizable(options) {
    UiInteraction.call(this, options);
    options = options || {};
    this.animate = options.animate || true;
    this.helper = options.helper || 'ui-resizable-helper';

    UiHelper.addCssRule('.ui-resizable-helper', ' border: 2px dotted #00F; ');
}

UiResizable.prototype = Object.create(UiInteraction.prototype);
UiResizable.prototype.constructor = UiResizable;

UiResizable.prototype.apply = function(control) {
    this.target = control instanceof UiControl ? control.el : control;
    $(this.target).resizable({
        animate: this.animate,
        helper: this.helper
    });
};

export { UiResizable };