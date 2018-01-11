(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('coordinate.js'), require('geometry.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'coordinate.js', 'geometry.js'], factory) :
	(factory((global.AI = {}),global.coordinate_js,global.geometry_js));
}(this, (function (exports,coordinate_js,geometry_js) { 'use strict';

function Coordinate$1(options) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.z = options.z || 0;

    this.set = function(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    };

    this.get = function() {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    };
}

//export default { Coordinate };

function Point(options) {
    geometry_js.Geometry.call(this, options);

    this.coordinates = [new coordinate_js.Coordinate({
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

Point.prototype = Object.create(geometry_js.Geometry.coordinate);

function Line(options) {
    geometry_js.Geometry.call(this, options);

    options.coordinates = options.coordinates || [];

    options.coordinates.forEach((n, i) => {
        this.coordinates.push(new coordinate_js.Coordinate({
            x: n.x,
            y: n.y,
            z: n.z
        }));
    });
}

Line.prototype = Object.create(geometry_js.Geometry.coordinate);

function Polygon(options) {
    geometry_js.Geometry.call(this, options);

    options.coordinates = options.coordinates || [];

    options.coordinates.forEach((n, i) => {
        this.coordinates.push(new coordinate_js.Coordinate({
            x: n.x,
            y: n.y,
            z: n.z
        }));
    });
}

Polygon.prototype = Object.create(geometry_js.Geometry.coordinate);

// geometry

exports.Coordinate = Coordinate$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
