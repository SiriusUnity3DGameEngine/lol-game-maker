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
    this.dispatch = d3.dispatch('blur', 'create', 'focus', 'select');
}

UiMenu.prototype = Object.create(UiControl.prototype);
UiMenu.prototype.constructor = UiMenu;

UiMenu.prototype.blur = function() {
    $(this.el.ul).menu('blur');
};

UiMenu.prototype.collapse = function() {
    $(this.el.ul).menu('collapse');
};

UiMenu.prototype.collapseAll = function() {
    $(this.el.ul).menu('collapseAll');
};

UiMenu.prototype.destroy = function() {
    $(this.el.ul).menu('destroy');
};

UiMenu.prototype.disable = function() {
    $(this.el.ul).menu('disable');
};

UiMenu.prototype.enable = function() {
    $(this.el.ul).menu('enable');
};

UiMenu.prototype.expand = function() {
    $(this.el.ul).menu('expand');
};

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
        $(this.el.ul).menu({
            blur: function(event, ui) {
                _this.dispatch.call('blur', _this, event, ui);
            },
            create: function(event, ui) {
                _this.dispatch.call('create', _this, event, ui);
            },
            focus: function(event, ui) {
                _this.dispatch.call('focus', _this, event, ui);
            },
            select: function(event, ui) {
                _this.dispatch.call('select', _this, event, ui);
            }
        });
    } else {
        $(this.el.ul).menu({
            icons: {
                submenu: 'ui-icon-caret-1-s'
            },
            position: {
                my: 'left top',
                at: 'left bottom'
            },
            blur: function(event, ui) {
                _this.dispatch.call('blur', _this, event, ui);
            },
            create: function(event, ui) {
                _this.dispatch.call('create', _this, event, ui);
            },
            focus: function(event, ui) {
                _this.dispatch.call('focus', _this, event, ui);
            },
            select: function(event, ui) {
                _this.dispatch.call('select', _this, event, ui);
            }
        });
    }
};

UiMenu.prototype.on = function(eventName, callback) {
    this.dispatch.on(eventName, callback);
};

export { UiMenu };