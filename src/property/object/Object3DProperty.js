import { BaseProperty } from '../BaseProperty';

/**
 * @author tengge / https://github.com/tengge1
 */

function Object3DProperty(options) {
    BaseProperty.call(this, options);
    this.properties = [{
        name: 'position',
        children: [{
            name: 'x',
            type: 'number'
        }, {
            name: 'y',
            type: 'number'
        }, {
            name: 'z',
            type: 'number'
        }]
    }, {
        name: 'rotation',
        children: [{
            name: 'x',
            type: 'number'
        }, {
            name: 'y',
            type: 'number'
        }, {
            name: 'z',
            type: 'number'
        }]
    }, {
        name: 'scale',
        children: [{
            name: 'x',
            type: 'number'
        }, {
            name: 'y',
            type: 'number'
        }, {
            name: 'z',
            type: 'number'
        }]
    }];
}

Object3DProperty.prototype = Object.create(BaseProperty.prototype);
Object3DProperty.prototype.constructor = Object3DProperty;

Object3DProperty.prototype.filter = function() {
    return this.obj instanceof THREE.Object3D;
}

export { Object3DProperty };