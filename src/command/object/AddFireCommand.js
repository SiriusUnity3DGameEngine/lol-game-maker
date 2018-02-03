import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddFireCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddFireCommand.prototype = Object.create(BaseCommand.prototype);
AddFireCommand.prototype.constructor = AddFireCommand;

AddFireCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addFire.command', function() {
        _this.run.call(_this);
    });
};

AddFireCommand.prototype.run = function() {
    var fireWidth = 2;
    var fireHeight = 4;
    var fireDepth = 2;
    var sliceSpacing = 0.5;

    this.fire = new VolumetricFire(
        fireWidth,
        fireHeight,
        fireDepth,
        sliceSpacing,
        app.camera
    );
    this.app.scene.add(this.fire.mesh);
    this.fire.mesh.position.set(0, fireHeight / 2, 0);

    var _this = this;
    this.app.event.on('onAnimate', function(clock) {
        _this.onAnimate.call(_this, clock);
    });
};

AddFireCommand.prototype.onAnimate = function(clock) {
    var elapsed = clock.getElapsedTime();
    this.fire.update(elapsed);
};

export { AddFireCommand };