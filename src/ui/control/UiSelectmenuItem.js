import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiSelectmenuItem(options) {
    Control.call(this, options);
    options = options || {};
    this.text = options.text || 'Item';
}

UiSelectmenuItem.prototype = Object.create(Control.prototype);
UiSelectmenuItem.prototype.constructor = UiSelectmenuItem;

UiSelectmenuItem.prototype.render = function() {
    this.el.option = document.createElement('option');
    this.el.option.innerHTML = this.text;
    this.parent.appendChild(this.el.option);
};

export { UiSelectmenuItem };