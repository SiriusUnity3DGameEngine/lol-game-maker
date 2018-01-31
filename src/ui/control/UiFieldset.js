import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiFieldset(options) {
    UiControl.call(this, options);
    options = options || {};
    this.title = options.title || null;
    this.children = options.children || [];
}

UiFieldset.prototype = Object.create(UiControl.prototype);
UiFieldset.prototype.constructor = UiFieldset;

UiFieldset.prototype.render = function() {
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

export { UiFieldset };