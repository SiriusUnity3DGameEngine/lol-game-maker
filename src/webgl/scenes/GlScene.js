/**
 * @author tengge / https://github.com/tengge1
 */

function GlScene() {
    THREE.Scene.call(this);
}

GlScene.prototype = Object.create(THREE.Scene.prototype);
GlScene.prototype.constructor = GlScene;

export { GlScene };