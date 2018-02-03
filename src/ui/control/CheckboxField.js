import { TextField } from './TextField';

/**
 * @author tengge / https://github.com/tengge1
 */

function CheckboxField(options) {
    TextField.call(this, options);
    this.type = 'checkbox';
}

CheckboxField.prototype = Object.create(TextField.prototype);
CheckboxField.prototype.constructor = CheckboxField;

export { CheckboxField };