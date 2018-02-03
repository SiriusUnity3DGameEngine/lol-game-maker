import { Control } from '../../ui/Control';
import { Fieldset } from '../../ui/control/Fieldset';
import { CheckboxField } from '../../ui/control/CheckboxField';
import { ColorField } from '../../ui/control/ColorField';
import { NumberField } from '../../ui/control/NumberField';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorSettings(options) {
    Control.call(this, options);
    this.enableFog = new CheckboxField({
        parent: this.parent,
        label: 'enable'
    });
    this.fogColor = new ColorField({
        parent: this.parent,
        label: 'color',
    });
    this.fogNear = new NumberField({
        parent: this.parent,
        label: 'near',
        value: 1
    });
    this.fogFar = new NumberField({
        parent: this.parent,
        label: 'far',
        value: 1000
    });
    this.label = options.label || null;
    this.children = [
        new Fieldset({
            title: 'Fog',
            children: [
                this.enableFog,
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