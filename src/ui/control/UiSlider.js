import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiSlider(options) {
    UiControl.call(this, options);
    options = options || {};
    this.width = options.width || '200px';
}

UiSlider.prototype = Object.create(UiControl.prototype);
UiSlider.prototype.constructor = UiSlider;

UiSlider.prototype.render = function() {
    this.el.div = document.createElement('div');
    this.el.div.style.width = this.width;
    this.parent.appendChild(this.el.div);
    $(this.el.div).slider();
};

export { UiSlider };