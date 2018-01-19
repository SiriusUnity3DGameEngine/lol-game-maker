import { Coordinate } from './Coordinate';
import { Geometry } from './Geometry';

/**
 * @author tengge / https://github.com/tengge1
 */

function Polygon(options) {
    Geometry.call(this, options);

    options = options || {};
    options.coordinates = options.coordinates || [];

    _this = this;
    options.coordinates.forEach(function(n, i) {
        _this.coordinates.push(new Coordinate({
            x: n.x,
            y: n.y,
            z: n.z
        }));
    });
}

Polygon.prototype = Object.create(Geometry.prototype);
Polygon.prototype.constructor = Polygon;

export { Polygon };