import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddTetrahedronCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddTetrahedronCommand.prototype = Object.create(BaseCommand.prototype);
AddTetrahedronCommand.prototype.constructor = AddTetrahedronCommand;

AddTetrahedronCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addTetrahedron.command', function() {
        _this.run.call(_this);
    });
};

AddTetrahedronCommand.prototype.run = function() {
    var geometry = new THREE.TetrahedronBufferGeometry(5);
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddTetrahedronCommand };