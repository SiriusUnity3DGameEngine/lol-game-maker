/**
 * @author tengge / https://github.com/tengge1
 */

function Geometry(options) {

    this.coordinates = options.coordinates || [];

}

Geometry.prototype.getCoordinates = function() {
    return this.coordinates;
};

Geometry.prototype.setCoordinates = function(coordinates) {
    this.coordinates = coordinates;
};

export { Geometry };