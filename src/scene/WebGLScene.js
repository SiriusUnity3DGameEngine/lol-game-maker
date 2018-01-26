import { Scene } from './Scene';

/**
 * @author tengge / https://github.com/tengge1
 */

function WebGLScene(options) {
    Scene.call(this, options);
    options = options || {};
    this.name = options.name || 'WebGLScene';
    this.scene = options.scene || new THREE.Scene();
    this.camera = options.camera || new THREE.PerspectiveCamera(
        75,
        this.width / this.height,
        0.1,
        1000);
    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(0, 0, 0);
    this.renderer = options.renderer || new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.dispatcher = d3.select(this.renderer.domElement);
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI * 0.5;
    this.gridHelper = new THREE.GridHelper(500, 50);
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.transformControls = new THREE.TransformControls(this.camera, this.renderer.domElement);
}

WebGLScene.prototype = Object.create(Scene.prototype);
WebGLScene.prototype.constructor = WebGLScene;

WebGLScene.prototype.render = function() {
    this.parent.appendChild(this.renderer.domElement);
    this.stats.dom.style.position = 'absolute';
    this.parent.appendChild(this.stats.dom);
    var _this = this;
    this.app.mainPanel.on('activate.WebGLScene', function(event, ui) {
        _this.runProgram.call(_this);
    });
    this.dispatcher.on('mousemove.selectObject', function() {
        _this.onMouseMove.call(_this, d3.event);
    });
    this.dispatcher.on('click.selectObject', function() {
        _this.onSelectObject.call(_this, d3.event);
    });
};

WebGLScene.prototype.runProgram = function() {
    this.app.mainPanel.on('activate.WebGLScene', null);
    this.scene.add(this.gridHelper);
    this.scene.add(this.transformControls);
    this.createScene.call(this);
    this.renderProc.call(this);
};

WebGLScene.prototype.createScene = function() {
    // You can add anything to the scene here.
};

WebGLScene.prototype.renderProc = function() {
    this.stats.begin();
    this.animate();
    this.renderer.render(this.scene, this.camera);
    this.stats.end();
    var _this = this;
    requestAnimationFrame(function() {
        _this.renderProc.call(_this);
    });
}

WebGLScene.prototype.animate = function() {
    // You can do some animation here.
};

WebGLScene.prototype.onMouseMove = function(event) {
    this.mouse.x = (event.clientX / this.width) * 2 - 1;
    this.mouse.y = -(event.clientY / this.height) * 2 + 1;
};

WebGLScene.prototype.onSelectObject = function() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    var _this = this;
    var intersect = this.raycaster.intersectObjects(this.scene.children)
        .filter(function(o) {
            return o.object != _this.gridHelper;
        })[0];
    if (intersect != null) {
        this.transformControls.attach(intersect.object);
    }
};

export { WebGLScene };