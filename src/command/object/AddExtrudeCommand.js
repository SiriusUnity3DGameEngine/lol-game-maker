import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddExtrudeCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddExtrudeCommand.prototype = Object.create(BaseCommand.prototype);
AddExtrudeCommand.prototype.constructor = AddExtrudeCommand;

AddExtrudeCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addExtrude.command', function() {
        _this.run.call(_this);
    });
};

AddExtrudeCommand.prototype.run = function() {
    var length = 5,
        width = 3;

    var shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, width);
    shape.lineTo(length, width);
    shape.lineTo(length, 0);
    shape.lineTo(0, 0);

    var extrudeSettings = {
        steps: 2,
        amount: 6,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
    };

    var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddExtrudeCommand };