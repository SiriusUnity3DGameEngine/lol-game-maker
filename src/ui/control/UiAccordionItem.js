import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiAccordionItem(options) {
    UiControl.call(this, options);
    options = options || {};
    this.title = options.title || 'Tab';
    this.html = options.html || null;
    this.children = options.children || [];
}

UiAccordionItem.prototype = Object.create(UiControl.prototype);
UiAccordionItem.prototype.constructor = UiAccordionItem;

UiAccordionItem.prototype.render = function() {
    this.el.title = document.createElement('h3');
    this.el.title.innerHTML = this.title;
    this.parent.appendChild(this.el.title);

    this.el.body = document.createElement('div');
    this.el.body.innerHTML = this.html;
    this.parent.appendChild(this.el.body);

    var _this = this;
    this.children.forEach(function(n) {
        n.parent = _this.el.body;
        n.render.call(n);
    });
};

export { UiAccordionItem };