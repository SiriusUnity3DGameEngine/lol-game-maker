import { PropertyType } from '../constant';
import { BaseProperty } from '../BaseProperty';
import { PropertyItem } from '../PropertyItem';

/**
 * @author tengge / https://github.com/tengge1
 */

function MaterialProperty(options) {
    BaseProperty.call(this, options);
    options = options || {};
    this.items = this.items.concat([
        new PropertyItem()
    ]);
}

MaterialProperty.prototype = Object.create(BaseProperty.prototype);
MaterialProperty.prototype.constructor = MaterialProperty;

export { MaterialProperty };