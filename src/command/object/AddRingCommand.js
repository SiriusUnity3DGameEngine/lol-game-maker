import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddRingCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddRingCommand.prototype = Object.create(BaseCommand.prototype);
AddRingCommand.prototype.constructor = AddRingCommand;

AddRingCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addRing.command', function() {
        _this.run.call(_this);
    });
};

AddRingCommand.prototype.run = function() {
    var geometry = new THREE.RingBufferGeometry(5, 10);
    var material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddRingCommand };