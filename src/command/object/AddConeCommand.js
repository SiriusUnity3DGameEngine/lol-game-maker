import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddConeCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddConeCommand.prototype = Object.create(BaseCommand.prototype);
AddConeCommand.prototype.constructor = AddConeCommand;

AddConeCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addCone.command', function() {
        _this.run.call(_this);
    });
};

AddConeCommand.prototype.run = function() {
    var geometry = new THREE.ConeBufferGeometry(5, 10);
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddConeCommand };