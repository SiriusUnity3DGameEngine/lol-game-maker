import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function CheckBoxradio(options) {
    Control.call(this, options);
    options = options || {};
    this.text = options.text || 'Label';
    this.type = options.type || 'radio'; // radio, checkbox
}

CheckBoxradio.prototype = Object.create(Control.prototype);
CheckBoxradio.prototype.constructor = CheckBoxradio;

CheckBoxradio.prototype.render = function() {
    var index = CheckBoxradio.index++;
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

CheckBoxradio.index = 1;

export { CheckBoxradio };