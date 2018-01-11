import { Coordinate } from 'coordinate.js';
import { Geometry } from 'geometry.js';

function Line(options) {
    Geometry.call(this, options);

    options.coordinates = options.coordinates || [];

    options.coordinates.forEach((n, i) => {
        this.coordinates.push(new Coordinate({
            x: n.x,
            y: n.y,
            z: n.z
        }));
    });
}

Line.prototype = Object.create(Geometry.coordinate);

export default { Line };