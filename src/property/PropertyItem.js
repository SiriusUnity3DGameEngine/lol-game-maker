import { PropertyType } from '../constant';

/**
 * @author tengge / https://github.com/tengge1
 */

function PropertyItem(options) {
    options = options || {};
    this.obj = options.obj || null;
    this.name = options.name || 'name';
    this.type = options.type || 'string';
    this.value = options.value || null;
}

PropertyItem.prototype.getObj = function() {
    return this.obj;
};

PropertyItem.prototype.setObj = function(obj) {
    this.obj = obj;
};

PropertyItem.prototype.getName = function() {
    return this.name;
};

PropertyItem.prototype.setName = function(name) {
    this.name = name;
};

PropertyItem.prototype.getType = function() {
    return this.type;
};

PropertyItem.prototype.setType = function(type) {
    this.type = type;
};

PropertyItem.prototype.getValue = function() {
    return this.value;
};

PropertyItem.prototype.setValue = function(value) {
    this.value = value;
};

export { PropertyItem };