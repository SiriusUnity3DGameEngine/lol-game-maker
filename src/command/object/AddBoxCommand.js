import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddBoxCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddBoxCommand.prototype = Object.create(BaseCommand.prototype);
AddBoxCommand.prototype.constructor = AddBoxCommand;

AddBoxCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addBox.command', function() {
        _this.run.call(_this);
    });
};

AddBoxCommand.prototype.run = function() {
    var geometry = new THREE.BoxBufferGeometry(5, 5, 5);
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddBoxCommand };