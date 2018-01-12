import { Coordinate } from './Coordinate';
import { Geometry } from './Geometry';

/**
 * @author tengge / https://github.com/tengge1
 */

function Point(options) {
    Geometry.call(this, options);

    this.coordinates = [new Coordinate({
        x: options.x || 0,
        y: options.y || 0,
        z: options.x || 0
    })];
}

Point.prototype = Object.create(Geometry.prototype);

Point.prototype.getCoordinate = function() {
    return {
        x: this.coordinates[0].x,
        y: this.coordinates[0].y,
        z: this.coordinates[0].z
    };
};

Point.prototype.setCoordinate = function(x, y, z) {
    this.coordinates[0].x = x;
    this.coordinates[0].y = y;
    this.coordinates[0].z = z;
};

export { Point };