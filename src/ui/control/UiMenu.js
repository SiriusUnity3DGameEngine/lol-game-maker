import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiMenu(options) {
    UiControl.call(this, options);
    options = options || {};
    this.width = options.width || null;
    this.cls = options.cls || '';
    this.direction = options.direction || 'vertical'; // horizontal, vertical
    this.children = options.children || [];
}

UiMenu.prototype = Object.create(UiControl.prototype);
UiMenu.prototype.constructor = UiMenu;

UiMenu.prototype.render = function() {
    this.el.ul = document.createElement('ul');
    this.el.ul.className = this.cls;
    if (this.direction == 'horizontal') {
        this.el.ul.className = ' ui-menu-horizontal';
    }
    this.el.ul.style.width = this.width;
    this.parent.appendChild(this.el.ul);
    var _this = this;
    this.children.forEach(function(n) {
        n.parent = _this.el.ul;
        n.render.call(n);
    });
    if (this.direction == 'vertical') {
        $(this.el.ul).menu();
    } else {
        $(this.el.ul).menu({
            icons: {
                submenu: 'ui-icon-caret-1-s'
            },
            position: {
                my: 'left top',
                at: 'left bottom'
            }
        });
    }
};

export { UiMenu };