import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddDodecahedronCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddDodecahedronCommand.prototype = Object.create(BaseCommand.prototype);
AddDodecahedronCommand.prototype.constructor = AddDodecahedronCommand;

AddDodecahedronCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addDodecahedron.command', function() {
        _this.run.call(_this);
    });
};

AddDodecahedronCommand.prototype.run = function() {
    var geometry = new THREE.DodecahedronBufferGeometry(5);
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddDodecahedronCommand };