import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function Rect(options) {
    Control.call(this, options);
    options = options || {};
    this.width = options.width || '100px';
    this.height = options.height || '80px';
    this.backgroundColor = options.backgroundColor || 'red';
    this.padding = options.padding || '5px';
    this.text = options.text || 'Rect';
}

Rect.prototype = Object.create(Control.prototype);
Rect.prototype.constructor = Rect;

Rect.prototype.render = function() {
    this.el = document.createElement('div');
    this.el.style.width = this.width;
    this.el.style.height = this.height;
    this.el.style.backgroundColor = this.backgroundColor;
    this.el.style.padding = this.padding;
    this.parent.append(this.el);
    this.el.innerHTML = this.text;
};

export { Rect };