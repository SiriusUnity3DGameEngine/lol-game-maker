import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddTorusKnotCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddTorusKnotCommand.prototype = Object.create(BaseCommand.prototype);
AddTorusKnotCommand.prototype.constructor = AddTorusKnotCommand;

AddTorusKnotCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addTorusKnot.command', function() {
        _this.run.call(_this);
    });
};

AddTorusKnotCommand.prototype.run = function() {
    var geometry = new THREE.TorusKnotBufferGeometry(5, 2, 100, 16);
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddTorusKnotCommand };