import { BaseProperty } from '../BaseProperty';

/**
 * @author tengge / https://github.com/tengge1
 */

function GeometryProperty(options) {
    BaseProperty.call(this, options);
    options = options || {};
}

GeometryProperty.prototype = Object.create(BaseProperty.prototype);
GeometryProperty.prototype.constructor = GeometryProperty;

GeometryProperty.prototype.filter = function(obj) {

};

export { GeometryProperty };