import { UiInteraction } from '../UiInteraction';
import { UiControl } from '../UiControl';
import { UiHelper } from '../UiHelper';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiSelectable(options) {
    UiInteraction.call(this, options);
    options = options || {};
    UiHelper.addCssRule('.ui-selecting', ' background: #FECA40; ');
    UiHelper.addCssRule('.ui-selected', ' background: #F39814; color: white; ');
}

UiSelectable.prototype = Object.create(UiInteraction.prototype);
UiSelectable.prototype.constructor = UiSelectable;

UiSelectable.prototype.apply = function(control) {
    this.target = control instanceof UiControl ? control.el : control;
    $(this.target).selectable();
};

export { UiSelectable };