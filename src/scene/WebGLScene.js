import { Scene } from './Scene';

/**
 * @author tengge / https://github.com/tengge1
 */

function WebGLScene(options) {
    Scene.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.name = options.name || 'WebGLScene';
}

WebGLScene.prototype = Object.create(Scene.prototype);
WebGLScene.prototype.constructor = WebGLScene;

WebGLScene.prototype.render = function() {
    this.el.canvas = document.createElement('canvas');
    this.el.canvas.style.width = '100%';
    this.el.canvas.style.height = '100%';
    this.parent.appendChild(this.el.canvas);
    var _this = this;
    this.app.mainPanel.on('activate.WebGLScene', function(event, ui) {
        _this.create.call(_this);
    });
};

WebGLScene.prototype.create = function() {
    this.app.mainPanel.on('activate.WebGLScene', null);
    this.el.canvas.width = this.el.canvas.clientWidth;
    this.el.canvas.height = this.el.canvas.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.el.canvas.width / this.el.canvas.height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.el.canvas });
    this.renderer.setSize(this.el.canvas.width, this.el.canvas.height);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
    this.camera.position.z = 5;

    this.renderer.render(this.scene, this.camera);
};

export { WebGLScene };