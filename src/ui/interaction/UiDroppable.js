import { UiInteraction } from '../UiInteraction';
import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiDroppable(options) {
    UiInteraction.call(this, options);
    options = options || {};
    this.dispatch = d3.dispatch('drop');
    this.accept = options.accept || '*';
    this.classes = options.classes || {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
    };
}

UiDroppable.prototype = Object.create(UiInteraction.prototype);
UiDroppable.prototype.constructor = UiDroppable;

UiDroppable.prototype.apply = function(control) {
    this.target = control instanceof UiControl ? control.el : control;
    $(this.target).droppable();

    var _this = this;
    $(this.target).droppable({
        accept: this.accept,
        classes: this.classes,
        drop: function(event, ui) {
            _this.dispatch.call('drop', _this, event, ui);
        }
    });
};

UiDroppable.prototype.on = function(eventName, callback) {
    this.dispatch.on(eventName, callback);
};

export { UiDroppable };