/**
 * @author tengge / https://github.com/tengge1
 */

function Coordinate(options) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.z = options.z || 0;
}

Coordinate.prototype.get = function() {
    return {
        x: this.x,
        y: this.y,
        z: this.z
    };
};

Coordinate.prototype.set = function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

export { Coordinate };