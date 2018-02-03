import { TextField } from './TextField';

/**
 * @author tengge / https://github.com/tengge1
 */

function DateField(options) {
    TextField.call(this, options);
    this.type = 'color';
}

DateField.prototype = Object.create(TextField.prototype);
DateField.prototype.constructor = DateField;

export { DateField };