import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddTorusCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddTorusCommand.prototype = Object.create(BaseCommand.prototype);
AddTorusCommand.prototype.constructor = AddTorusCommand;

AddTorusCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addTorus.command', function() {
        _this.run.call(_this);
    });
};

AddTorusCommand.prototype.run = function() {
    var geometry = new THREE.TorusBufferGeometry(5, 2, 16, 100);
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddTorusCommand };