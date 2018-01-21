import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiTabs(options) {
    UiControl.call(this, options);
    options = options || {};
    this.children = options.children || [];
    this.width = options.width || null;
}

UiTabs.prototype = Object.create(UiControl.prototype);
UiTabs.prototype.constructor = UiTabs;

UiTabs.prototype.render = function() {
    this.el.div = document.createElement('div');
    this.el.div.style.width = this.width;
    this.parent.appendChild(this.el.div);
    this.el.ul = document.createElement('ul');
    this.el.div.appendChild(this.el.ul);
    var _this = this;
    this.children.forEach(function(n) {
        n.parent = _this.el.div;
        n.render.call(n);
    });
    $(this.el.div).tabs();
};

export { UiTabs };