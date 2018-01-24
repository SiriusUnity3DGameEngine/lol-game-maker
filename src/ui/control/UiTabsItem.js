import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiTabsItem(options) {
    UiControl.call(this, options);
    options = options || {};
    this.id = options.id || 'tabitem' + UiTabsItem.index--;
    this.title = options.title || 'Tab';
    this.html = options.html || null;
    this.children = options.children || [];
    this.closable = options.closable || false;
}

UiTabsItem.prototype = Object.create(UiControl.prototype);
UiTabsItem.prototype.constructor = UiTabsItem;

UiTabsItem.prototype.close = function() {
    $('li[href=#' + this.id + ']', this.parent).remove();
    $('#' + this.id).remove();
};

UiTabsItem.prototype.render = function() {
    var _this = this;
    var index = UiTabsItem.index++;
    this.el.li = document.createElement('li');
    this.el.a = document.createElement('a');
    this.el.a.innerHTML = this.title;
    this.el.a.setAttribute('href', '#' + this.id);
    this.el.li.appendChild(this.el.a);
    if (this.closable) {
        this.el.span = document.createElement('span');
        this.el.span.className = 'ui-icon ui-icon-close';
        this.el.span.setAttribute('role', 'presentation');
        this.el.span.innerHTML = 'Remove Tab';
        this.el.span.style.cursor = 'pointer';
        this.el.li.appendChild(this.el.span);
        $(this.parent).on('click', 'span.ui-icon-close', function() {
            _this.close();
            $(_this.parent).tabs('refresh');
        });
    }
    $('ul', this.parent).append(this.el.li);

    this.el.div = document.createElement('div');
    this.el.div.id = this.id;
    this.parent.appendChild(this.el.div);
    this.el.div.innerHTML = this.html;
    this.children.forEach(function(n) {
        n.parent = _this.el.div;
        n.render.call(n);
    });
};

UiTabsItem.index = -1;

export { UiTabsItem };