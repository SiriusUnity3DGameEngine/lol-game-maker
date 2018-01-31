import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

var ID = -1;

function UiColorPicker(options) {
    UiControl.call(this, options);
    options = options || {};
    this.id = options.id || 'colorpicker' + ID--;
    this.color = options.color || null; // #ffffff
    this.defaultPalette = options.defaultPalette || 'web';
    this.displayIndicator = options.displayIndicator || false;
    this.hideButton = options.hideButton || true;
    this.history = options.history || false;
    this.initialHistory = options.initialHistory || []; // ["#ff0000", "#00ff00", "#0000ff"]
    this.showOn = options.showOn || 'button';
    this.transparentColor = options.transparentColor || false; // "#0000ffff"
    this.dispatch = d3.dispatch('changeColor', 'mouseoverColor');
}

UiColorPicker.prototype = Object.create(UiControl.prototype);
UiColorPicker.prototype.constructor = UiColorPicker;

UiColorPicker.prototype.render = function() {
    this.el.input = document.createElement('input');
    this.el.input.setAttribute('id', this.id);
    this.parent.appendChild(this.el.input);
    $(this.el.input).colorpicker();
    var _this = this;
    $(this.el.input).on('change.color', function(event, color) {
        _this.dispatch.call('changeColor', _this, color);
    });
    $(this.el.input).on('mouseover.color', function(event, color) {
        _this.dispatch.call('mouseoverColor', _this, color);
    });
};

UiColorPicker.prototype.clear = function() {
    $(this.el.input).colorpicker('clear');
};

UiColorPicker.prototype.enable = function() {
    $(this.el.input).colorpicker('enable');
};

UiColorPicker.prototype.disable = function() {
    $(this.el.input).colorpicker('disable');
};

UiColorPicker.prototype.isDisabled = function() {
    $(this.el.input).colorpicker('isDisabled');
};

UiColorPicker.prototype.val = function(color) { // #d0d0d0
    $(this.el.input).colorpicker('val', color);
};

UiColorPicker.prototype.showPalette = function() {
    $(this.el.input).colorpicker('showPalette');
};

UiColorPicker.prototype.hidePalette = function() {
    $(this.el.input).colorpicker('hidePalette');
};

UiColorPicker.prototype.hidePalette = function() {
    $(this.el.input).colorpicker('hidePalette');
};

UiColorPicker.prototype.on = function(eventName, callback) {
    this.dispatch.on(eventName, callback);
};

export { UiColorPicker };