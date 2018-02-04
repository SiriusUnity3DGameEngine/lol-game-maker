import { Control } from '../ui/Control';
import { Fieldset } from '../ui/control/Fieldset';
import { TextField } from '../ui/control/TextField';
import { NumberField } from '../ui/control/NumberField';
import { RangeField } from '../ui/control/RangeField';

/**
 * @author tengge / https://github.com/tengge1
 */

function BaseProperty(options) {
    Control.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.obj = options.obj || null;
    this.parent = options.parent || null;

    this.properties = [];
    // for examples, 
    // [{ 
    //   name: 'groupName',
    //   children: [{
    //       name: 'propertyName',
    //       type: 'text'
    //   }]
    // }]
    // type can be html5 input types, such as text, number, date, color, ...
}

BaseProperty.prototype = Object.create(Control.prototype);
BaseProperty.prototype.constructor = BaseProperty;

// Test whether obj has this property.
BaseProperty.prototype.filter = function() {
    return false;
};

BaseProperty.prototype.render = function() {
    var _this = this;
    this.properties.forEach(function(n) {
        var fieldset = new Fieldset({
            parent: _this.parent,
            title: n.name
        });
        fieldset.render();
        n.children.forEach(function(m) {
            var input;
            switch (m.type) {
                case 'text':
                    input = new TextField({
                        label: m.name
                    });
                    break;
                case 'number':
                    input = new NumberField({
                        label: m.name
                    });
                    break;
                default:
                    _this.app.warn('BaseProperty: property type ' + m.type + ' is not defined.');
                    break;
            }
            if (input) {
                fieldset.add(input);
            }
        });
    });
};

export { BaseProperty };