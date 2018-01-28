import { GlControl } from './GlControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function GlGridHelper(options) {
    GlControl.call(this, options);
    options = options || {};
    this.gridHelper = new THREE.GridHelper(500, 50);
    this.scene = this.app.scene;
    this.app.gridHelper = this.gridHelper;
}

GlGridHelper.prototype = Object.create(GlControl.prototype);
GlGridHelper.prototype.constructor = GlGridHelper;

GlGridHelper.prototype.start = function() {
    this.scene.add(this.gridHelper);
};

export { GlGridHelper };