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
    this.app.transformControls = this.controls;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
}

GlTransformControls.prototype = Object.create(GlControl.prototype);
GlTransformControls.prototype.constructor = GlTransformControls;

GlTransformControls.prototype.start = function() {
    var _this = this;
    this.app.scene.add(this.controls);
    this.app.glEvent.on('click.transformControl', function() {
        _this.onClick.call(_this, d3.event);
    });
    this.app.event.on('translateObject', function() {
        _this.controls.setMode('translate');
    });
    this.app.event.on('rotateObject', function() {
        _this.controls.setMode('rotate');
    });
    this.app.event.on('scaleObject', function() {
        _this.controls.setMode('scale');
    });
};

GlTransformControls.prototype.onClick = function(event) {
    this.mouse.x = (event.offsetX / this.app.sceneWidth) * 2 - 1;
    this.mouse.y = -(event.offsetY / this.app.sceneHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.app.camera);
    var _this = this;
    var intersect = this.raycaster.intersectObjects(this.app.scene.children)
        .filter(function(o) {
            return o.object != _this.app.gridHelper;
        })[0];
    if (intersect) {
        this.controls.attach(intersect.object);
    } else {
        this.controls.detach();
    }
};

export { GlTransformControls };