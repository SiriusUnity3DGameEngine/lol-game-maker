import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiSelectmenuItem(options) {
    UiControl.call(this, options);
    options = options || {};
    this.text = options.text || 'Item';
}

UiSelectmenuItem.prototype = Object.create(UiControl.prototype);
UiSelectmenuItem.prototype.constructor = UiSelectmenuItem;

UiSelectmenuItem.prototype.render = function() {
    this.el.option = document.createElement('option');
    this.el.option.innerHTML = this.text;
    this.parent.appendChild(this.el.option);
};

export { UiSelectmenuItem };