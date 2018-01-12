import { Coordinate } from './Coordinate';
import { Geometry } from './Geometry';

/**
 * @author tengge / https://github.com/tengge1
 */

function Polygon(options) {
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

Polygon.prototype = Object.create(Geometry.prototype);

export { Polygon };