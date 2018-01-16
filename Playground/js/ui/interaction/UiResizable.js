import { UiInteraction } from '../UiInteraction';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiResizable(options) {
    UiInteraction.call(this, options);
    options = options || {};
}

UiResizable.prototype = Object.create(UiInteraction.prototype);
UiResizable.prototype.constructor = UiResizable;

export { UiResizable };