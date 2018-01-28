import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddLatheCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddLatheCommand.prototype = Object.create(BaseCommand.prototype);
AddLatheCommand.prototype.constructor = AddLatheCommand;

AddLatheCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addLathe.command', function() {
        _this.run.call(_this);
    });
};

AddLatheCommand.prototype.run = function() {
    var points = [];
    for (var i = 0; i < 10; i++) {
        points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
    }
    var geometry = new THREE.LatheBufferGeometry(points);
    var material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geometry, material);
    this.app.scene.add(mesh);
};

export { AddLatheCommand };