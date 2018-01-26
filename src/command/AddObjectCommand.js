import { BaseCommand } from './BaseCommand';
import { UiTabsItem } from '../ui/control/UiTabsItem';
import { WebGLScene } from '../scene/WebGLScene';

/**
 * @author tengge / https://github.com/tengge1
 */

var ID = -1;

function AddObjectCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.geometry = options.geometry || null;
}

AddObjectCommand.prototype = Object.create(BaseCommand.prototype);
AddObjectCommand.prototype.constructor = AddObjectCommand;

AddObjectCommand.prototype.run = function() {
    if (this.app.currentScene && this.geometry) {
        var geometry = eval('new THREE.' + this.geometry);
        var material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0xcccccc)
        });
        var mesh = new THREE.Mesh(geometry, material);
        this.app.currentScene.scene.add(mesh);
    }
};

export { AddObjectCommand };