import { SvgElement } from './element/SvgElement';

/**
 * @author tengge / https://github.com/tengge1
 */

function SvgGroup(options) {
    SvgElement.call(this, options);
    options = options || {};
    this.fill = options.fill || null;
    this.children = [];
}

SvgGroup.prototype = Object.create(SvgElement.prototype);
SvgGroup.prototype.constructor = SvgGroup;

SvgGroup.prototype.add = function(element) {
    this.children.push(element);
};

SvgGroup.prototype.insert = function(index, element) {
    this.children.splice(index, 0, element);
};

SvgGroup.prototype.remove = function(element) {
    var index = this.children.indexOf(element);
    if (index > -1) {
        this.removeAt(index);
    }
};

SvgGroup.prototype.removeAt = function(index) {
    this.children.splice(index, 1);
};

SvgGroup.prototype.removeAll = function() {
    this.children = [];
};

SvgGroup.prototype.clear = function() {
    this.removeAll();
};

SvgGroup.prototype.render = function() {
    this.el = this.parent.append('g')
        .call(this.renderStyle, this);
    this.children.forEach((n) => {
        n.parent = this.el;
        n.render.call(n);
    });
};

export { SvgGroup };