import { GlControl } from '../control/GlControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function GlScreenToWorld(options) {
    GlControl.call(this, options);
    options = options || {};
}

GlScreenToWorld.prototype = Object.create(GlControl.prototype);
GlScreenToWorld.prototype.constructor = GlScreenToWorld;

GlScreenToWorld.prototype.start = function() {
    var _this = this;
    this.app.screenToWorld = function(screenPoint) {
        _this.screenToWorld(screenPoint);
    };
    this.app.worldToScreen = function() {
        _this.worldToScreen(screenPoint);
    };
};

GlScreenToWorld.prototype.screenToWorld = function(screenPoint) {
    var pX = (screenPoint.x / this.app.renderer.domElement.clientWidth) * 2 - 1;
    var pY = -(screenPoint.y / this.app.renderer.domElement.clientHeight) * 2 + 1;
    var p = new THREE.Vector3(pX, pY, -1).unproject(this.app.camera);
    return new THREE.Vector2(p.x, p.y);
};

GlScreenToWorld.prototype.worldToScreen = function() {
    var projector = new THREE.Projector();
    var world_vector = new THREE.Vector3(0, 0, 1);
    var vector = projector.projectVector(world_vector, this.app.camera);
    var halfWidth = this.app.screenWidth / 2,
        halfHeight = this.app.screenHeight / 2;
    return {
        x: Math.round(vector.x * halfWidth + halfWidth),
        y: Math.round(-vector.y * halfHeight + halfHeight)
    };
};

export { GlScreenToWorld };