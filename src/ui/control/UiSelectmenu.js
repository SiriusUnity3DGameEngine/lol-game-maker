import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiSelectmenu(options) {
    UiControl.call(this, options);
    options = options || {};
    this.children = options.children || [];
}

UiSelectmenu.prototype = Object.create(UiControl.prototype);
UiSelectmenu.prototype.constructor = UiSelectmenu;

UiSelectmenu.prototype.render = function() {
    this.el.select = document.createElement('select');
    this.parent.appendChild(this.el.select);
    var _this = this;
    this.children.forEach(function(n) {
        n.parent = _this.el.select;
        n.render.call(n);
    });
    $(this.el.select).selectmenu();
};

export { UiSelectmenu };