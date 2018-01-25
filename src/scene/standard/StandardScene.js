import { WebGLScene } from '../WebGLScene';

/**
 * @author tengge / https://github.com/tengge1
 */

function StandardScene(options) {
    WebGLScene.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.name = options.name || 'StandardScene';
}

StandardScene.prototype = Object.create(WebGLScene.prototype);
StandardScene.prototype.constructor = StandardScene;

StandardScene.prototype.create = function() {
    WebGLScene.prototype.create.call(this);
};

export { StandardScene };