import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiMenu(options) {
    UiControl.call(this, options);
    options = options || {};
    this.width = options.width || null;
    this.children = options.children || [];
}

UiMenu.prototype = Object.create(UiControl.prototype);
UiMenu.prototype.constructor = UiMenu;

UiMenu.prototype.render = function() {
    this.el.ul = document.createElement('ul');
    this.el.ul.style.width = this.width;
    this.parent.appendChild(this.el.ul);
    var _this = this;
    this.children.forEach(function(n) {
        n.parent = _this.el.ul;
        n.render.call(n);
    });
    $(this.el.ul).menu();
};

export { UiMenu };