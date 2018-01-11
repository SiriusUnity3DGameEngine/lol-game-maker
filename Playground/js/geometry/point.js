import { Coordinate } from 'coordinate.js';
import { Geometry } from 'geometry.js';

function Point(options) {
    Geometry.call(this, options);

    this.coordinates = [new Coordinate({
        x: options.x || 0,
        y: options.y || 0,
        z: options.x || 0
    })];

    this.setCoordinate = function(xyz) {
        this.coordinates[0].set(xyz.x, xyz.y, xyz.z);
    };

    this.getCoordinate = function() {
        return this.coordinates[0]
    };
}

Point.prototype = Object.create(Geometry.coordinate);

export default { Point };