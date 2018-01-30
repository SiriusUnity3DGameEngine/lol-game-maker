import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddTubeCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddTubeCommand.prototype = Object.create(BaseCommand.prototype);
AddTubeCommand.prototype.constructor = AddTubeCommand;

AddTubeCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addTube.command', function() {
        _this.run.call(_this);
    });
};

AddTubeCommand.prototype.run = function() {

    var curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-10, 0, 10),
        new THREE.Vector3(-5, 5, 5),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(5, -5, 5),
        new THREE.Vector3(10, 0, 10)
    ]);

    var geometry = new THREE.TubeBufferGeometry(curve, 20, 2, 8, false);
    var material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddTubeCommand };