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
        value: '#555555'
    });
    this.fogNear = new NumberField({
        parent: this.parent,
        label: 'near',
        value: 0.1
    });
    this.fogFar = new NumberField({
        parent: this.parent,
        label: 'far',
        value: 100
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
    this.enableFog.on('change', function(value) {
        _this.onEnableFogChange(value);
    });
    this.fogColor.on('change', function(value) {
        _this.onFogColorChange(value);
    });
    this.fogNear.on('change', function(value) {
        _this.onFogNearChange(value);
    });
    this.fogFar.on('change', function(value) {
        _this.onFogFarChange(value);
    });
};

EditorSettings.prototype.onEnableFogChange = function(value) {
    if (value == true) {
        app.scene.fog = new THREE.Fog(
            parseInt(this.fogColor.getValue().replace('#', ''), 16),
            this.fogNear.getValue(),
            this.fogFar.getValue()
        );
    } else {
        app.scene.fog = null;
    }
};

EditorSettings.prototype.onFogColorChange = function(value) {
    if (app.scene.fog) {
        app.scene.fog.color = new THREE.Color(parseInt(value.replace('#', ''), 16));
    }
};

EditorSettings.prototype.onFogNearChange = function(value) {
    if (app.scene.fog) {
        app.scene.fog.near = value;
    }
};

EditorSettings.prototype.onFogFarChange = function(value) {
    if (app.scene.fog) {
        app.scene.fog.far = value;
    }
};

export { EditorSettings };