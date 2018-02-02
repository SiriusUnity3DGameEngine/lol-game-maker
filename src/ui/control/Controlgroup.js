import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function Controlgroup(options) {
    Control.call(this, options);
    options = options || {};
    this.children = options.children || [];
    this.direction = options.direction || 'vertical'; // horizontal, vertical
}

Controlgroup.prototype = Object.create(Control.prototype);
Controlgroup.prototype.constructor = Controlgroup;

Controlgroup.prototype.render = function() {
    this.el.div = document.createElement('div');
    this.parent.appendChild(this.el.div);
    var _this = this;
    this.children.forEach(function(n) {
        n.parent = _this.el.div;
        n.render.call(n);
    });
    $(this.el.div).controlgroup({
        direction: this.direction
    });
};

export { Controlgroup };