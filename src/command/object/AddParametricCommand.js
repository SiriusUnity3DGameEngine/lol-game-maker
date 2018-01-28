import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddParametricCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddParametricCommand.prototype = Object.create(BaseCommand.prototype);
AddParametricCommand.prototype.constructor = AddParametricCommand;

AddParametricCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addParametric.command', function() {
        _this.run.call(_this);
    });
};

AddParametricCommand.prototype.run = function() {
    var geometry = new THREE.ParametricBufferGeometry(THREE.ParametricGeometries.klein, 25, 25);
    var material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddParametricCommand };