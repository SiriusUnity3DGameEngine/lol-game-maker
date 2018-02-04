import { GlControl } from '../control/GlControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function GlHoverObject(options) {
    GlControl.call(this, options);
    options = options || {};
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
}

GlHoverObject.prototype = Object.create(GlControl.prototype);
GlHoverObject.prototype.constructor = GlHoverObject;

GlHoverObject.prototype.start = function() {
    var _this = this;
    this.app.glEvent.on('mousemove.hoverObject', function() {
        _this.onMouseMove.call(_this, d3.event);
    });
};

GlHoverObject.prototype.onMouseMove = function(event) {
    this.mouse.x = (event.offsetX / this.app.sceneWidth) * 2 - 1;
    this.mouse.y = -(event.offsetY / this.app.sceneHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.app.camera);
    var _this = this;
    this.app.scene.children.forEach(function(n) {
        if (n == _this.app.gridHelper) {
            return true;
        }
        if (n instanceof THREE.Mesh &&
            n.material.oldOpacity != null &&
            n.material.opacity != n.material.oldOpacity) {
            n.material.transparent = n.material.oldTransparent;
            n.material.opacity = n.material.oldOpacity;
            n.material.needsUpdate = true;
        }
    });
    this.raycaster.intersectObjects(this.app.scene.children)
        .filter(function(o) {
            return o.object instanceof THREE.Mesh &&
                o.object != _this.app.gridHelper;
        }).forEach(function(n) {
            if (n.object.material.oldOpacity == null ||
                n.object.material.opacity == n.object.material.oldOpacity) {
                n.object.material.oldTransparent = n.object.material.transparent;
                n.object.material.oldOpacity = n.object.material.opacity;
                n.object.material.opacity = 0.5;
                n.object.material.transparent = true;
                n.object.material.needsUpdate = true;
                _this.app.event.call('hoverObject', _this, n);
            }
        });
};

export { GlHoverObject };