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
    this.renderer = options.renderer || new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI * 0.5;
    this.gridHelper = new THREE.GridHelper(500, 50);
}

WebGLScene.prototype = Object.create(Scene.prototype);
WebGLScene.prototype.constructor = WebGLScene;

WebGLScene.prototype.render = function() {
    this.parent.appendChild(this.renderer.domElement);
    var _this = this;
    this.app.mainPanel.on('activate.WebGLScene', function(event, ui) {
        _this.runProgram.call(_this);
    });
};

WebGLScene.prototype.runProgram = function() {
    this.app.mainPanel.on('activate.WebGLScene', null);
    this.scene.add(this.gridHelper);
    this.createScene.call(this);
    this.renderProc.call(this);
};

WebGLScene.prototype.createScene = function() {
    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(0, 0, 0);
};

WebGLScene.prototype.renderProc = function() {
    this.renderer.render(this.scene, this.camera);
    var _this = this;
    requestAnimationFrame(function() {
        _this.renderProc.call(_this);
    });
}

export { WebGLScene };