import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiList(options) {
    Control.call(this, options);
    options = options || {};
    this.width = options.width || '100px';
    this.height = options.height || 'auto';
    this.children = options.children || []; // [ 'item1', 'item2', 'item3' ]
    this.style = options.style || 'list-style: none; margin: 0; -webkit-padding-start: 0;';
    this.itemStyle = options.itemStyle || 'border: 1px solid #ccc; margin: 1px;';
}

UiList.prototype = Object.create(Control.prototype);
UiList.prototype.constructor = UiList;

UiList.prototype.render = function() {
    this.el = document.createElement('ul');
    this.el.style = this.style;
    this.parent.appendChild(this.el);
    this.el.items = [];
    var _this = this;
    this.children.forEach(function(n) {
        var item = document.createElement('li');
        item.innerHTML = n;
        item.style = _this.itemStyle;
        _this.el.appendChild(item);
        _this.el.items.push(item);
    });

};

export { UiList };