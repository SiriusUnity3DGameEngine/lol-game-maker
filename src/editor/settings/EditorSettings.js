import { UiControl } from '../../ui/UiControl';
import { UiFieldset } from '../../ui/control/UiFieldset';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorSettings(options) {
    UiControl.call(this, options);
    this.children = [
        new UiFieldset({
            title: 'Fog'
        })
    ];
}

EditorSettings.prototype = Object.create(UiControl.prototype);
EditorSettings.prototype.constructor = EditorSettings;

EditorSettings.prototype.render = function() {
    var _this = this;
    this.children.forEach(function(n, i) {
        n.parent = _this.parent;
        n.render.call(n);
    });
};

export { EditorSettings };