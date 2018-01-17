import { UiInteraction } from '../UiInteraction';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiSelectable(options) {
    UiInteraction.call(this, options);
    options = options || {};
}

UiSelectable.prototype = Object.create(UiInteraction.prototype);
UiSelectable.prototype.constructor = UiSelectable;

export { UiSelectable };