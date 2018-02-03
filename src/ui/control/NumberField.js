import { TextField } from './TextField';

/**
 * @author tengge / https://github.com/tengge1
 */

function NumberField(options) {
    TextField.call(this, options);
    this.type = 'number';
}

NumberField.prototype = Object.create(TextField.prototype);
NumberField.prototype.constructor = NumberField;

export { NumberField };