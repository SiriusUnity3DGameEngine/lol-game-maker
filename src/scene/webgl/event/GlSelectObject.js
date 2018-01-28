import { GlControl } from '../control/GlControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function GlSelectObject(options) {
    GlControl.call(this, options);
    options = options || {};
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.scene = this.app.scene;
    this.camera = this.app.camera;
}

GlSelectObject.prototype = Object.create(GlControl.prototype);
GlSelectObject.prototype.constructor = GlSelectObject;

GlSelectObject.prototype.start = function() {
    var _this = this;
    this.app.glEvent.on('mousemove.selectObject', function() {
        _this.onMouseMove.call(_this, d3.event);
    });
    this.app.glEvent.on('click.selectObject', function() {
        _this.onSelectObject.call(_this, d3.event);
    });
};

GlSelectObject.prototype.onMouseMove = function(event) {
    this.mouse.x = (event.clientX / this.app.sceneWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / this.app.sceneHeight) * 2 + 1;
};

GlSelectObject.prototype.onSelectObject = function() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    var _this = this;
    var intersect = this.raycaster.intersectObjects(this.scene.children)
        .filter(function(o) {
            return o.object != _this.app.gridHelper;
        })[0];
    if (intersect != null) {
        //this.transformControls.attach(intersect.object);
    }
};

export { GlSelectObject };