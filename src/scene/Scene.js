import { UiControl } from '../ui/UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function Scene(options) {
    UiControl.call(this, options);
    options = options || {};
    this.name = options.name || 'Scene';
}

Scene.prototype = Object.create(UiControl.prototype);
Scene.prototype.constructor = Scene;

Scene.prototype.getName = function() {
    return this.name;
};

Scene.prototype.setName = function(name) {
    this.name = name;
};

export { Scene };