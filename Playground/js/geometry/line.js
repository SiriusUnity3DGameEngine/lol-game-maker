import { Coordinate } from './Coordinate';
import { Geometry } from './Geometry';

/**
 * @author tengge / https://github.com/tengge1
 */

function Line(options) {
    Geometry.call(this, options);

    options = options || {};
    options.coordinates = options.coordinates || [];

    options.coordinates.forEach((n, i) => {
        this.coordinates.push(new Coordinate({
            x: n.x,
            y: n.y,
            z: n.z
        }));
    });
}

Line.prototype = Object.create(Geometry.prototype);
Line.prototype.constructor = Line;

export { Line };