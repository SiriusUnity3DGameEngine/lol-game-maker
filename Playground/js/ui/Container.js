import { Control } from './Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function Container(options) {
    Control.call(this, options);

    options = options || {};
    this.parent = options.parent || null;
    this.children = options.children || [];
}

Container.prototype = Object.create(Control.prototype);
Container.prototype.constructor = Container;

Container.prototype.getParent = function() {
    return this.parent;
};

Container.prototype.setParent = function(parent) {
    this.parent = parent;
};

Container.prototype.add = function(control) {
    this.children.push(control);
};

Container.prototype.remove = function(control) {
    var index = this.children.indexOf(control);
    if (index > -1) {
        this.children.splice(index, 1);
    }
};

Container.prototype.removeAt = function(index) {
    this.children.splice(index, 1);
};

Container.prototype.render = function() {
    this.children.forEach((n, i) => {
        n.parent = this;
        n.render.call(n);
    });
};

export { Container };