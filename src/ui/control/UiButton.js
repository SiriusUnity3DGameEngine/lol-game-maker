import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiButton(options) {
    UiControl.call(this, options);
    options = options || {};
    this.text = options.text || 'Button';
}

UiButton.prototype = Object.create(UiControl.prototype);
UiButton.prototype.constructor = UiButton;

UiButton.prototype.render = function() {
    this.el.button = document.createElement('button');
    this.el.button.innerHTML = this.text;
    this.parent.appendChild(this.el.button);
    $(this.el.button).button();
};

export { UiButton };