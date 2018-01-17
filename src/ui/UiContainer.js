import { UiControl } from './UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiContainer(options) {
    UiControl.call(this, options);

    options = options || {};
    this.children = options.children || [];
}

UiContainer.prototype = Object.create(UiControl.prototype);
UiContainer.prototype.constructor = UiContainer;

UiContainer.prototype.add = function(control) {
    this.children.push(control);
};

UiContainer.prototype.insert = function(index, control) {
    this.children.splice(index, 0, control);
};

UiContainer.prototype.remove = function(control) {
    var index = this.children.indexOf(control);
    if (index > -1) {
        this.removeAt(index);
    }
};

UiContainer.prototype.removeAt = function(index) {
    this.children.splice(index, 1);
};

UiContainer.prototype.render = function() {
    this.el = document.createElement('div');
    this.children.forEach((n, i) => {
        n.parent = this.el;
        n.render.call(n);
    });
};

export { UiContainer };