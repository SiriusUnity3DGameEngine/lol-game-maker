import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiMenuItem(options) {
    UiControl.call(this, options);
    options = options || {};
    this.text = options.text || 'Menu Item';
    this.cls = options.cls || null;
    this.subCls = options.subCls || null;
    this.children = options.children || [];
}

UiMenuItem.prototype = Object.create(UiControl.prototype);
UiMenuItem.prototype.constructor = UiMenuItem;

UiMenuItem.prototype.render = function() {
    this.el.li = document.createElement('li');
    this.el.li.className = this.cls;
    this.el.div = document.createElement('div');
    this.el.div.innerHTML = this.text;
    this.el.li.appendChild(this.el.div);
    this.parent.appendChild(this.el.li);
    if (this.children.length == 0) {
        return;
    }
    this.el.ul = document.createElement('ul');
    if (this.subCls) {
        this.el.ul.className = this.subCls;
    }
    this.el.li.appendChild(this.el.ul);
    var _this = this;
    this.children.forEach(function(n) {
        n.parent = _this.el.ul;
        n.render.call(n);
    });
};

export { UiMenuItem };