import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddPlaneCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddPlaneCommand.prototype = Object.create(BaseCommand.prototype);
AddPlaneCommand.prototype.constructor = AddPlaneCommand;

AddPlaneCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addPlane.command', function() {
        _this.run.call(_this);
    });
};

AddPlaneCommand.prototype.run = function() {
    var geometry = new THREE.PlaneBufferGeometry(10, 10);
    var material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddPlaneCommand };