/**
 * @author tengge / https://github.com/tengge1
 */

function BaseProperty(options) {
    options = options || {};
    this.app = options.app || null;
    this.items = options.item || []; // PropertyItem Array
}

BaseProperty.prototype.filter = function() {
    return false;
};

BaseProperty.prototype.getValue = function(name) {

};

BaseProperty.prototype.setValue = function(name, value) {

};

export { BaseProperty };