import { GlControl } from './GlControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function GlOrbitControls(options) {
    GlControl.call(this, options);
    options = options || {};
    this.controls = new THREE.OrbitControls(this.app.camera, this.app.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI * 0.5;
    this.app.orbit = this.controls;
}

GlOrbitControls.prototype = Object.create(GlControl.prototype);
GlOrbitControls.prototype.constructor = GlOrbitControls;

export { GlOrbitControls };