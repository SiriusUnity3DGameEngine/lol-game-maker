(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.AI = {})));
}(this, (function (exports) { 'use strict';

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Coordinate(options) {

	    options = options || {};
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

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Geometry(options) {

	    options = options || {};

	    this.coordinates = options.coordinates || [];

	}

	Geometry.prototype.getCoordinates = function() {
	    return this.coordinates;
	};

	Geometry.prototype.setCoordinates = function(coordinates) {
	    this.coordinates = coordinates;
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Point(options) {
	    Geometry.call(this, options);

	    options = options || {};
	    this.coordinates = [new Coordinate({
	        x: options.x || 0,
	        y: options.y || 0,
	        z: options.x || 0
	    })];
	}

	Point.prototype = Object.create(Geometry.prototype);
	Point.prototype.constructor = Point;

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

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Polygon(options) {
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

	Polygon.prototype = Object.create(Geometry.prototype);
	Polygon.prototype.constructor = Polygon;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Scene(options) {

	    options = options || {};
	    this.name = options.name || 'Scene';

	}

	Scene.prototype.getName = function() {
	    return this.name;
	};

	Scene.prototype.setName = function(name) {
	    this.name = name;
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Scene2D(options) {
	    Scene.call(this, options);
	    options = options || {};
	}

	Scene2D.prototype = Object.create(Scene.prototype);
	Scene2D.prototype.constructor = Scene2D;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Scene3D(options) {
	    Scene.call(this, options);
	    options = options || {};
	}

	Scene3D.prototype = Object.create(Scene.prototype);
	Scene3D.prototype.constructor = Scene3D;

	// geometry

	exports.Coordinate = Coordinate;
	exports.Geometry = Geometry;
	exports.Point = Point;
	exports.Line = Line;
	exports.Polygon = Polygon;
	exports.Scene = Scene;
	exports.Scene2D = Scene2D;
	exports.Scene3D = Scene3D;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
