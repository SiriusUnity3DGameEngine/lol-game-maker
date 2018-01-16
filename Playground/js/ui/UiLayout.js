import { UiContainer } from './UiContainer';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiLayout(options) {
    UiContainer.call(this, options);
    options = options || null;
}

UiLayout.prototype = Object.create(UiContainer.prototype);
UiLayout.prototype.constructor = UiLayout;

export { UiLayout };