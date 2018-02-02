import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiProgressbar(options) {
    Control.call(this, options);
    options = options || {};
    this.width = options.width || null;
    this.value = options.value || 0;
}

UiProgressbar.prototype = Object.create(Control.prototype);
UiProgressbar.prototype.constructor = UiProgressbar;

UiProgressbar.prototype.render = function() {
    this.el.div = document.createElement('div');
    this.el.div.style.width = this.width;
    this.parent.appendChild(this.el.div);
    $(this.el.div).progressbar({
        value: this.value
    });
};

export { UiProgressbar };