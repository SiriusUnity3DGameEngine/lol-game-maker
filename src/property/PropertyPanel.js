import { Control } from '../ui/Control';
import { Object3DProperty } from './object/Object3DProperty';

/**
 * @author tengge / https://github.com/tengge1
 */

function PropertyPanel(options) {
    Control.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.children = [
        new Object3DProperty({ app: this.app })
    ];
}

PropertyPanel.prototype = Object.create(Control.prototype);
PropertyPanel.prototype.constructor = PropertyPanel;

PropertyPanel.prototype.render = function() {
    var _this = this;
    this.app.event.on('selectObject', function(n) {
        _this.onSelectObject.call(_this, n.object)
    });
    this.app.event.on('unselectObject', function(n) {
        _this.onUnselectObject.call(_this, n.object)
    });
};

PropertyPanel.prototype.onSelectObject = function(obj) {
    var _this = this;
    $(this.parent).empty();
    this.children.forEach(function(n) {
        n.app = _this.app;
        n.obj = _this.obj;
        n.parent = _this.parent;
        n.render.call(n);
    });
};

PropertyPanel.prototype.onUnselectObject = function(obj) {
    $(this.parent).empty();
};

export { PropertyPanel };