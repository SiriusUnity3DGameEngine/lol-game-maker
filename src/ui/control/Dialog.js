import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function Dialog(options) {
    Control.call(this, options);
    options = options || {};
    this.title = options.title || 'Dialog';
    this.html = options.html || null;
    this.children = options.children || [];
}

Dialog.prototype = Object.create(Control.prototype);
Dialog.prototype.constructor = Dialog;

Dialog.prototype.render = function() {
    this.el.div = document.createElement('div');
    this.el.div.setAttribute('title', this.title);
    this.el.div.innerHTML = this.html;
    this.parent.appendChild(this.el.div);
    var _this = this;
    this.children.forEach(function(n) {
        n.parent = this.el.div;
        n.render.call(n);
    });
    $(this.el.div).dialog();
};

export { Dialog };