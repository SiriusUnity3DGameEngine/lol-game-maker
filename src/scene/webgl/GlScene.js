import { Scene } from '../Scene';

import { GlControl } from './control/GlControl';
import { GlGUI } from './control/GlGUI';
import { GlOrbitControls } from './control/GlOrbitControls';
import { GlStats } from './control/GlStats';
import { GlTransformControls } from './control/GlTransformControls';

import { GlGridHelper } from './object/GlGridHelper';
import { GlLight } from './object/GlLight';
import { GlAxisHelper } from './object/GlAxisHelper';

import { GlHoverObject } from './event/GlHoverObject';
import { GlSelectObject } from './event/GlSelectObject';

/**
 * @author tengge / https://github.com/tengge1
 */

function GlScene(options) {
    Scene.call(this, options);
    options = options || {};
    this.name = options.name || 'WebGLScene';

    this.scene = options.scene || new THREE.Scene();
    this.app.scene = this.scene;

    this.camera = options.camera || new THREE.PerspectiveCamera(
        75,
        this.width / this.height,
        0.1,
        1000);
    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(0, 0, 0);
    this.app.camera = this.camera;

    this.renderer = options.renderer || new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    this.renderer.setSize(this.width, this.height);
    this.app.renderer = this.renderer;

    this.clock = new THREE.Clock();

    this.dispatch = d3.select(this.renderer.domElement);
    this.app.glEvent = this.dispatch;

    this.children = [
        new GlGridHelper({ app: this.app, parent: this.parent }),
        new GlAxisHelper({ app: this.app, parent: this.parent }),
        new GlGUI({ app: this.app, parent: this.parent }),
        new GlOrbitControls({ app: this.app, parent: this.parent }),
        new GlStats({ app: this.app, parent: this.parent }),
        new GlTransformControls({ app: this.app, parent: this.parent }),
        new GlSelectObject({ app: this.app, parent: this.parent }),
        new GlLight({ app: this.app, parent: this.parent }),
        new GlHoverObject({ app: this.app, parent: this.parent }),
    ];
}

GlScene.prototype = Object.create(Scene.prototype);
GlScene.prototype.constructor = GlScene;

GlScene.prototype.render = function() {
    this.children.forEach(function(n) {
        n.render.call(n);
    });
};

GlScene.prototype.start = function() {
    this.parent.appendChild(this.renderer.domElement);
    this.children.forEach(function(n) {
        n.start.call(n);
    });
    this.animate();
};

GlScene.prototype.animate = function() {
    this.children.forEach(function(n) {
        n.beforeUpdate.call(n);
    });
    this.app.event.call('beforeAnimate', this, this.clock);
    this.children.forEach(function(n) {
        n.animate.call(n);
    });
    this.app.event.call('onAnimate', this, this.clock);
    this.renderer.render(this.scene, this.camera);
    this.children.forEach(function(n) {
        n.update.call(n);
    });
    var _this = this;
    requestAnimationFrame(function() {
        _this.animate.call(_this);
    });
};

export { GlScene };