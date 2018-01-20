import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiCheckboxradio(options) {
    UiControl.call(this, options);
    options = options || {};
    this.text = options.text || 'Label';
    this.type = options.type || 'radio'; // radio, checkbox
}

UiCheckboxradio.prototype = Object.create(UiControl.prototype);
UiCheckboxradio.prototype.constructor = UiCheckboxradio;

UiCheckboxradio.prototype.render = function() {
    var index = UiCheckboxradio.index++;
    this.el.label = document.createElement('label');
    this.el.label.setAttribute('for', this.type + index);
    this.el.label.innerHTML = this.text;
    this.parent.appendChild(this.el.label);

    this.el.input = document.createElement('input');
    this.el.input.type = this.type;
    this.el.input.id = this.type + index;
    this.el.input.name = this.type + index;
    this.parent.appendChild(this.el.input);

    $(this.el.input).checkboxradio();
};

UiCheckboxradio.index = 1;

export { UiCheckboxradio };