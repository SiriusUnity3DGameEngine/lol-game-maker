import { GlControl } from '../control/GlControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function GlAxisHelper(options) {
    GlControl.call(this, options);
    options = options || {};
    this.axisHelper = new THREE.AxesHelper();
    this.axisHelper.position.set(0, 1, 0);
    this.app.axisHelper = this.axisHelper;
}

GlAxisHelper.prototype = Object.create(GlControl.prototype);
GlAxisHelper.prototype.constructor = GlAxisHelper;

GlAxisHelper.prototype.start = function() {
    this.app.scene.add(this.axisHelper);
};

export { GlAxisHelper };