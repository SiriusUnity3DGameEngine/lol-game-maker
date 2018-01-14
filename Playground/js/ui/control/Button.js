import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function Button(options) {
    Control.call(this, options);
}

Button.prototype = Object.create(Control.prototype);
Button.prototype.constructor = Button;

export { Button };