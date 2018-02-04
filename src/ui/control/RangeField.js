import { TextField } from './TextField';

/**
 * @author tengge / https://github.com/tengge1
 */

function RangeField(options) {
    TextField.call(this, options);
    this.type = 'range';
}

RangeField.prototype = Object.create(TextField.prototype);
RangeField.prototype.constructor = RangeField;

export { RangeField };