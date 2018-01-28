import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddCircleCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddCircleCommand.prototype = Object.create(BaseCommand.prototype);
AddCircleCommand.prototype.constructor = AddCircleCommand;

AddCircleCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addCircle.command', function() {
        _this.run.call(_this);
    });
};

AddCircleCommand.prototype.run = function() {
    var geometry = new THREE.CircleBufferGeometry(5, 60);
    var material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddCircleCommand };