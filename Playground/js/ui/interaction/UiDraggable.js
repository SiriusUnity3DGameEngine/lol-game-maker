import { UiInteraction } from '../UiInteraction';
import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiDraggable(options) {
    UiInteraction.call(this, options);
}

UiDraggable.prototype = Object.create(UiInteraction.prototype);
UiDraggable.prototype.constructor = UiDraggable;

UiDraggable.prototype.apply = function(control) {
    if (control instanceof UiControl) {
        $(control.el).draggable();
    } else {
        $(control).draggable();
    }
};

export { UiDraggable };