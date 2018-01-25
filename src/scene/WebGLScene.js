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
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI * 0.5;
    this.gridHelper = new THREE.GridHelper(500, 50);
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
};

WebGLScene.prototype.runProgram = function() {
    this.app.mainPanel.on('activate.WebGLScene', null);
    this.scene.add(this.gridHelper);
    this.createScene.call(this);
    this.renderProc.call(this);
};

WebGLScene.prototype.createScene = function() {
    // You can add anything to the scene here.
    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(0, 0, 0);
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
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
};

export { WebGLScene };