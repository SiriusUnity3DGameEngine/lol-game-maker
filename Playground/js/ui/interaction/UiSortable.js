import { UiInteraction } from '../UiInteraction';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiSortable(options) {
    UiInteraction.call(this, options);
    options = options || {};
}

UiSortable.prototype = Object.create(UiInteraction.prototype);
UiSortable.prototype.constructor = UiSortable;

export { UiSortable };