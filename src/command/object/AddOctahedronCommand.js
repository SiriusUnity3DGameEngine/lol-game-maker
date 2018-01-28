import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddOctahedronCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddOctahedronCommand.prototype = Object.create(BaseCommand.prototype);
AddOctahedronCommand.prototype.constructor = AddOctahedronCommand;

AddOctahedronCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addOctahedron.command', function() {
        _this.run.call(_this);
    });
};

AddOctahedronCommand.prototype.run = function() {
    var geometry = new THREE.OctahedronBufferGeometry(5);
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddOctahedronCommand };