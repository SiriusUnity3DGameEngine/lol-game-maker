import { UiInteraction } from '../UiInteraction';
import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiDroppable(options) {
    UiInteraction.call(this, options);
    options = options || {};
}

UiDroppable.prototype = Object.create(UiInteraction.prototype);
UiDroppable.prototype.constructor = UiDroppable;

UiDroppable.prototype.apply = function(control) {
    if (control instanceof UiControl) {
        $(control.el).droppable();
    } else {
        $(control).droppable();
    }
};

export { UiDroppable };