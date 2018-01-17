import { Scene } from './Scene';

/**
 * @author tengge / https://github.com/tengge1
 */

function Scene2D(options) {
    Scene.call(this, options);
    options = options || {};
}

Scene2D.prototype = Object.create(Scene.prototype);
Scene2D.prototype.constructor = Scene2D;

export { Scene2D };