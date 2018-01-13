import { Scene } from '../Scene';

/**
 * @author tengge / https://github.com/tengge1
 */

function Scene3D(options) {
    Scene.call(this, options);
    options = options || {};
}

Scene3D.prototype = Object.create(Scene.prototype);
Scene3D.prototype.constructor = Scene3D;

export { Scene3D };