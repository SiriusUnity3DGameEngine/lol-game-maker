import { GlControl } from './GlControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function GlLight(options) {
    GlControl.call(this, options);
    options = options || {};

    this.ambientLight = new THREE.AmbientLight(
        new THREE.Color(0xffffff),
        0.2
    );
    this.app.ambientLight = this.ambientLight;

    this.directionalLight = new THREE.DirectionalLight(
        new THREE.Color(0xffffff),
        0.8
    );
    this.directionalLight.position.set(50, 50, 100);
    this.directionalLight.lookAt(0, 0, 0);
    this.app.directionalLight = this.directionalLight;
}

GlLight.prototype = Object.create(GlControl.prototype);
GlLight.prototype.constructor = GlLight;

GlLight.prototype.start = function() {
    this.app.scene.add(this.ambientLight);
    this.app.scene.add(this.directionalLight);
};

export { GlLight };