import { GlControl } from './GlControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function GlTransformControls(options) {
    GlControl.call(this, options);
    options = options || {};
    this.camera = this.app.camera;
    this.renderer = this.app.renderer;
    this.controls = new THREE.TransformControls(this.camera, this.renderer.domElement);
}

GlTransformControls.prototype = Object.create(GlControl.prototype);
GlTransformControls.prototype.constructor = GlTransformControls;

export { GlTransformControls };