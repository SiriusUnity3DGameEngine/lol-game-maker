import { Control } from '../../ui/Control';
import { UiFieldset } from '../../ui/control/UiFieldset';
import { ColorPicker } from '../../ui/control/ColorPicker';
import { UiTextField } from '../../ui/control/UiTextField';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorSettings(options) {
    Control.call(this, options);
    this.fogColor = new ColorPicker({
        parent: this.parent,
        label: 'color',
    });
    this.fogNear = new UiTextField({
        parent: this.parent,
        label: 'near',
    });
    this.fogFar = new UiTextField({
        parent: this.parent,
        label: 'far',
    });
    this.label = options.label || null;
    this.children = [
        new UiFieldset({
            title: 'Fog',
            children: [
                this.fogColor,
                this.fogNear,
                this.fogFar
            ]
        })
    ];
}

EditorSettings.prototype = Object.create(Control.prototype);
EditorSettings.prototype.constructor = EditorSettings;

EditorSettings.prototype.render = function() {
    if (this.label) {
        this.el.label = document.createElement('label');
        this.el.label.innerHTML = this.label;
        this.parent.appendChild(this.el.label);
    }
    var _this = this;
    this.children.forEach(function(n, i) {
        n.parent = _this.parent;
        n.render.call(n);
    });
};

export { EditorSettings };