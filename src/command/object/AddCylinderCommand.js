import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddCylinderCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddCylinderCommand.prototype = Object.create(BaseCommand.prototype);
AddCylinderCommand.prototype.constructor = AddCylinderCommand;

AddCylinderCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addCylinder.command', function() {
        _this.run.call(_this);
    });
};

AddCylinderCommand.prototype.run = function() {
    var geometry = new THREE.CylinderBufferGeometry(5, 5, 10);
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddCylinderCommand };