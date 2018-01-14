import { SvgElement } from './SvgElement';

/**
 * @author tengge / https://github.com/tengge1
 */

function SvgDom(options) {
    SvgElement.call(this, options);
    options = options || {};
    this.width = options.width || 960;
    this.height = options.height || 500;
    this.children = [];
}

SvgDom.prototype = Object.create(SvgElement.prototype);
SvgDom.prototype.constructor = SvgDom;

SvgDom.prototype.add = function(element) {
    this.children.push(element);
};

SvgDom.prototype.insert = function(index, element) {
    this.children.splice(index, 0, element);
};

SvgDom.prototype.remove = function(element) {
    var index = this.children.indexOf(element);
    if (index > -1) {
        this.removeAt(index);
    }
};

SvgDom.prototype.removeAt = function(index) {
    this.children.splice(index, 1);
};

SvgDom.prototype.removeAll = function() {
    this.children = [];
};

SvgDom.prototype.clear = function() {
    this.removeAll();
};

SvgDom.prototype.render = function() {
    this.el = this.parent.append('svg')
        .attr('width', this.width)
        .attr('height', this.height);
    this.children.forEach((n) => {
        n.parent = this.el;
        n.render.call(n);
    });
};

export { SvgDom };