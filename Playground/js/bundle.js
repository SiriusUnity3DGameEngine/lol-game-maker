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
	    this.container = options.container;
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

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function SvgScene(options) {
	    Scene2D.call(this, options);
	    options = options || {};
	    this.width = options.width || 960;
	    this.height = options.height || 500;
	    this.radius = options.radius || 10;
	    this.p0 = options.p0 || [960, 500, 10];
	    this.p1 = options.p1 || [560, 300, 120];
	}

	SvgScene.prototype = Object.create(Scene2D.prototype);
	SvgScene.prototype.constructor = SvgScene;

	SvgScene.prototype.render = function() {
	    var width = 960,
	        height = 500,
	        radius = 10;

	    var p0 = [250, 200, 60],
	        p1 = [560, 300, 120];

	    var svg = d3.select(this.container).append("svg")
	        .attr("width", width)
	        .attr("height", height)
	        .append("g")
	        .call(transition, p0, p1);

	    svg.append("path")
	        .attr("class", "mesh")
	        .attr("d", d3.hexbin()
	            .size([width, height])
	            .radius(radius)
	            .mesh);

	    svg.selectAll("circle")
	        .data([p0, p1])
	        .enter().append("circle")
	        .attr("class", function(d, i) { return i ? "end" : "start"; })
	        .attr("cx", function(d) { return d[0]; })
	        .attr("cy", function(d) { return d[1]; })
	        .attr("r", function(d) { return d[2] / 2 - .5; });

	    function transition(svg, start, end) {
	        var center = [width / 2, height / 2],
	            i = d3.interpolateZoom(start, end);

	        svg
	            .attr("transform", transform(start))
	            .transition()
	            .delay(250)
	            .duration(i.duration * 2)
	            .attrTween("transform", function() { return function(t) { return transform(i(t)); }; });

	        function transform(p) {
	            var k = height / p[2];
	            return "translate(" + (center[0] - p[0] * k) + "," + (center[1] - p[1] * k) + ")scale(" + k + ")";
	        }
	    }
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Control(options) {

	}

	Control.prototype.render = function() {

	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Container(options) {
	    Control.call(this, options);

	    options = options || {};
	    this.parent = options.parent || null;
	    this.children = options.children || [];
	}

	Container.prototype = Object.create(Control.prototype);
	Container.prototype.constructor = Container;

	Container.prototype.getParent = function() {
	    return this.parent;
	};

	Container.prototype.setParent = function(parent) {
	    this.parent = parent;
	};

	Container.prototype.add = function(control) {
	    this.children.push(control);
	};

	Container.prototype.remove = function(control) {
	    var index = this.children.indexOf(control);
	    if (index > -1) {
	        this.children.splice(index, 1);
	    }
	};

	Container.prototype.removeAt = function(index) {
	    this.children.splice(index, 1);
	};

	Container.prototype.render = function() {
	    this.children.forEach((n, i) => {
	        n.parent = this;
	        n.render.call(n);
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Layout(options) {
	    Container.call(this, options);
	}

	Layout.prototype = Object.create(Container.prototype);
	Layout.prototype.constructor = Layout;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function SvgElement(options) {
	    options = options || [];
	    this.parent = d3.select(options.parent || document.body);
	}

	SvgElement.prototype.render = function() {

	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function SvgDom(options) {
	    SvgElement.call(this, options);
	    options = options || {};
	    this.width = options.width || 960;
	    this.height = options.height || 500;
	    this.children = [];
	}

	SvgDom.prototype = Object.create(SvgElement.prototype);
	SvgDom.prototype.constructor = SvgDom;

	SvgDom.prototype.add = function(element) {
	    this.children.push(element);
	};

	SvgDom.prototype.insert = function(index, element) {
	    this.children.splice(index, 0, element);
	};

	SvgDom.prototype.remove = function(element) {
	    var index = this.children.indexOf(element);
	    if (index > -1) {
	        this.removeAt(index);
	    }
	};

	SvgDom.prototype.removeAt = function(index) {
	    this.children.splice(index, 1);
	};

	SvgDom.prototype.removeAll = function() {
	    this.children = [];
	};

	SvgDom.prototype.clear = function() {
	    this.removeAll();
	};

	SvgDom.prototype.render = function() {
	    this.el = this.parent.append('svg')
	        .attr('width', this.width)
	        .attr('height', this.height);
	    this.children.forEach((n) => {
	        n.parent = this.el;
	        n.render.call(n);
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function SvgCircle(options) {
	    SvgElement.call(this, options);
	    options = options || {};
	    this.cx = options.cx || 0;
	    this.cy = options.cy || 0;
	    this.r = options.r || 50;
	    this.stroke = options.stroke || 'black';
	    this.strokeWidth = options.strokeWidth || 2;
	    this.fill = options.fill || 'red';
	}

	SvgCircle.prototype = Object.create(SvgElement.prototype);
	SvgCircle.prototype.constructor = SvgCircle;

	SvgCircle.prototype.render = function() {
	    this.parent.append('circle')
	        .attr('cx', this.cx)
	        .attr('cy', this.cy)
	        .attr('r', this.r)
	        .attr('stroke', this.stroke)
	        .attr('stroke-width', this.strokeWidth)
	        .attr('fill', this.fill);
	};

	// geometry

	exports.Coordinate = Coordinate;
	exports.Geometry = Geometry;
	exports.Point = Point;
	exports.Line = Line;
	exports.Polygon = Polygon;
	exports.Scene = Scene;
	exports.Scene2D = Scene2D;
	exports.Scene3D = Scene3D;
	exports.SvgScene = SvgScene;
	exports.Control = Control;
	exports.Container = Container;
	exports.Layout = Layout;
	exports.SvgElement = SvgElement;
	exports.SvgDom = SvgDom;
	exports.SvgCircle = SvgCircle;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
