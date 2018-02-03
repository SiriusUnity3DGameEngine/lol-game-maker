import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function Fieldset(options) {
    Control.call(this, options);
    options = options || {};
    this.title = options.title || null;
    this.children = options.children || [];
}

Fieldset.prototype = Object.create(Control.prototype);
Fieldset.prototype.constructor = Fieldset;

Fieldset.prototype.render = function() {
    this.el.fieldset = document.createElement('fieldset');
    this.parent.appendChild(this.el.fieldset);

    if (this.title) {
        this.el.legend = document.createElement('legend');
        this.el.legend.innerHTML = this.title;
        this.el.fieldset.appendChild(this.el.legend);
    }

    var _this = this;
    this.children.forEach(function(n, i) {
        n.parent = _this.el.fieldset;
        n.render.call(n);
    });
};

export { Fieldset };