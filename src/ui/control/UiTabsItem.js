import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiTabsItem(options) {
    UiControl.call(this, options);
    options = options || {};
    this.title = options.title || 'Tab';
    this.html = options.html || null;
    this.children = options.children || [];
}

UiTabsItem.prototype = Object.create(UiControl.prototype);
UiTabsItem.prototype.constructor = UiTabsItem;

UiTabsItem.prototype.render = function() {
    var index = UiTabsItem.index++;
    this.el.li = document.createElement('li');
    this.el.a = document.createElement('a');
    this.el.a.innerHTML = this.title;
    this.el.a.setAttribute('href', '#tab-' + index);
    this.el.li.appendChild(this.el.a);
    $('ul', this.parent).append(this.el.li);

    this.el.div = document.createElement('div');
    this.el.div.id = 'tab-' + index;
    this.parent.appendChild(this.el.div);
    this.el.div.innerHTML = this.html;
    var _this = this;
    this.children.forEach(function(n) {
        n.parent = _this.el.div;
        n.render.call(n);
    });
};

UiTabsItem.index = 1;

export { UiTabsItem };