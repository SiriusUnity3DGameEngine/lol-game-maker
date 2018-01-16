import { UiInteraction } from '../UiInteraction';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiDroppable(options) {
    UiInteraction.call(this, options);
    options = options || {};
}

UiDroppable.prototype = Object.create(UiInteraction.prototype);
UiDroppable.prototype.constructor = UiDroppable;

export { UiDroppable };