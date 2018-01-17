import { UiInteraction } from '../UiInteraction';
import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiDroppable(options) {
    UiInteraction.call(this, options);
    options = options || {};
    this.dispatch = d3.dispatch('drop');
}

UiDroppable.prototype = Object.create(UiInteraction.prototype);
UiDroppable.prototype.constructor = UiDroppable;

UiDroppable.prototype.apply = function(control) {
    var _this = this;
    var el = control instanceof UiControl ? control.el : control;
    $(el).droppable();
    $(el).droppable({
        drop: function(event, ui) {
            _this.dispatch.call('drop', _this, event, ui);
        }
    });
};

UiDroppable.prototype.on = function(eventName, callback) {
    this.dispatch.on(eventName, callback);
};

export { UiDroppable };