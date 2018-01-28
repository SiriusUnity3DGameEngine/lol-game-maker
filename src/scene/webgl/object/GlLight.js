import { GlControl } from '../control/GlControl';

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
    this.directionalLight.position.set(30, 40, 50);
    this.directionalLight.lookAt(new THREE.Vector3());
    this.app.directionalLight = this.directionalLight;

    this.directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 5);
}

GlLight.prototype = Object.create(GlControl.prototype);
GlLight.prototype.constructor = GlLight;

GlLight.prototype.start = function() {
    this.app.scene.add(this.ambientLight);
    this.app.scene.add(this.directionalLight);
    this.app.scene.add(this.directionalLightHelper);
};

export { GlLight };