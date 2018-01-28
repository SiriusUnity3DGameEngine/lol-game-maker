import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddSphereCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddSphereCommand.prototype = Object.create(BaseCommand.prototype);
AddSphereCommand.prototype.constructor = AddSphereCommand;

AddSphereCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addSphere.command', function() {
        _this.run.call(_this);
    });
};

AddSphereCommand.prototype.run = function() {
    var geometry = new THREE.SphereBufferGeometry(5);
    var material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddSphereCommand };