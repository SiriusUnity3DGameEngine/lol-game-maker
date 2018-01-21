import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiAccordion(options) {
    UiControl.call(this, options);
    options = options || {};
    this.width = options.width || null;
    this.cls = options.cls || null;
    this.fit = options.fit || null;
    this.children = options.children || [];
}

UiAccordion.prototype = Object.create(UiControl.prototype);
UiAccordion.prototype.constructor = UiAccordion;

UiAccordion.prototype.render = function() {
    this.el.div = document.createElement('div');
    this.el.div.className = this.cls;
    this.el.div.style.width = this.width;
    this.parent.appendChild(this.el.div);
    var _this = this;
    this.children.forEach(function(n) {
        n.parent = _this.el.div;
        n.render.call(n);
    });
    $(this.el.div).accordion({
        heightStyle: this.fit ? 'fit' : null
    });
};

export { UiAccordion };