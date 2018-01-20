import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiAccordion(options) {
    UiControl.call(this, options);
    options = options || {};
    this.children = options.children || [];
}

UiAccordion.prototype = Object.create(UiControl.prototype);
UiAccordion.prototype.constructor = UiAccordion;

UiAccordion.prototype.render = function() {
    this.el.body = document.createElement('div');
    this.parent.appendChild(this.el.body);
    var _this = this;
    this.children.forEach(function(n) {
        n.parent = _this.el.body;
        n.render.call(n);
    });
    $(this.el.body).accordion();
};

export { UiAccordion };