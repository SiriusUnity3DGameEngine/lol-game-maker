import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddIcosahedronCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddIcosahedronCommand.prototype = Object.create(BaseCommand.prototype);
AddIcosahedronCommand.prototype.constructor = AddIcosahedronCommand;

AddIcosahedronCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addIcosahedron.command', function() {
        _this.run.call(_this);
    });
};

AddIcosahedronCommand.prototype.run = function() {
    var geometry = new THREE.IcosahedronBufferGeometry(5);
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddIcosahedronCommand };