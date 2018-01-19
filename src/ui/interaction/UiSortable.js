import { UiInteraction } from '../UiInteraction';
import { UiControl } from '../UiControl';
import { UiHelper } from '../UiHelper';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiSortable(options) {
    UiInteraction.call(this, options);
    options = options || {};
}

UiSortable.prototype = Object.create(UiInteraction.prototype);
UiSortable.prototype.constructor = UiSortable;

UiSortable.prototype.apply = function(control) {
    this.target = control instanceof UiControl ? control.el : control;
    $(this.target).sortable();
    $(this.target).disableSelection();
};

export { UiSortable };