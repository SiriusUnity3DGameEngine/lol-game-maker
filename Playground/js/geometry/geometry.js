import { Coordinate } from 'coordinate.js';

function Geometry(options) {

    this.coordinates = options.coordinates || [];

    this.setCoordinates = function(coordinates) {
        this.coordinates = coordinates;
    };

    this.getCoordinates = function() {
        return this.coordinates;
    };
}

export default { Geometry };