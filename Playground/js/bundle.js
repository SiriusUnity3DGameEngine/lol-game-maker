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

	function UiControl(options) {
	    options = options || {};
	    this.parent = options.parent || document.body;
	}

	UiControl.prototype.render = function() {

	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function UiRect(options) {
	    UiControl.call(this, options);
	    options = options || {};
	    this.width = options.width || '100px';
	    this.height = options.height || '80px';
	    this.backgroundColor = options.backgroundColor || 'red';
	    this.padding = options.padding || '5px';
	    this.text = options.text || 'UiRect';
	}

	UiRect.prototype = Object.create(UiControl.prototype);
	UiRect.prototype.constructor = UiRect;

	UiRect.prototype.render = function() {
	    this.el = document.createElement('div');
	    this.el.style.width = this.width;
	    this.el.style.height = this.height;
	    this.el.style.backgroundColor = this.backgroundColor;
	    this.el.style.padding = this.padding;
	    this.parent.append(this.el);
	    this.el.innerHTML = this.text;
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function UiContainer(options) {
	    UiControl.call(this, options);

	    options = options || {};
	    this.children = options.children || [];
	}

	UiContainer.prototype = Object.create(UiControl.prototype);
	UiContainer.prototype.constructor = UiContainer;

	UiContainer.prototype.add = function(control) {
	    this.children.push(control);
	};

	UiContainer.prototype.insert = function(index, control) {
	    this.children.splice(index, 0, control);
	};

	UiContainer.prototype.remove = function(control) {
	    var index = this.children.indexOf(control);
	    if (index > -1) {
	        this.removeAt(index);
	    }
	};

	UiContainer.prototype.removeAt = function(index) {
	    this.children.splice(index, 1);
	};

	UiContainer.prototype.render = function() {
	    this.el = document.createElement('div');
	    this.children.forEach((n, i) => {
	        n.parent = this.el;
	        n.render.call(n);
	    });
	};

	function UiFixedContainer(options) {
	    UiContainer.call(this, options);
	    this.children = options.children || [];
	    this.width = options.width || '220px';
	    this.height = options.height || '120px';
	    this.margin = options.margin || '10px';
	    this.padding = options.padding || '2px';
	    this.display = options.display || 'inline-block';
	    this.borderWidth = options.borderWidth || '2px';
	    this.borderColor = options.borderColor || 'black';
	    this.borderStyle = options.borderStyle || 'solid';
	}

	UiFixedContainer.prototype = Object.create(UiContainer.prototype);
	UiFixedContainer.prototype.constructor = UiFixedContainer;

	UiFixedContainer.prototype.render = function() {
	    this.el = document.createElement('div');
	    this.el.style.width = this.width;
	    this.el.style.height = this.height;
	    this.el.style.borderWidth = this.borderWidth;
	    this.el.style.borderColor = this.borderColor;
	    this.el.style.borderStyle = this.borderStyle;
	    this.el.style.margin = this.margin;
	    this.el.style.padding = this.padding;
	    this.el.style.display = this.display;
	    this.parent.append(this.el);
	    this.children.forEach((n, i) => {
	        n.parent = this.el;
	        n.render.call(n);
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function UiLayout(options) {
	    UiContainer.call(this, options);
	    options = options || null;
	}

	UiLayout.prototype = Object.create(UiContainer.prototype);
	UiLayout.prototype.constructor = UiLayout;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function UiInteraction(options) {
	    options = options || {};
	}

	UiInteraction.prototype.apply = function() {

	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function UiDraggable(options) {
	    UiInteraction.call(this, options);
	}

	UiDraggable.prototype = Object.create(UiInteraction.prototype);
	UiDraggable.prototype.constructor = UiDraggable;

	UiDraggable.prototype.apply = function(control) {
	    if (control.el) {
	        $(control.el).draggable();
	    } else {
	        $(control).draggable();
	    }
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function UiDroppable(options) {
	    UiInteraction.call(this, options);
	    options = options || {};
	}

	UiDroppable.prototype = Object.create(UiInteraction.prototype);
	UiDroppable.prototype.constructor = UiDroppable;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function UiResizable(options) {
	    UiInteraction.call(this, options);
	    options = options || {};
	}

	UiResizable.prototype = Object.create(UiInteraction.prototype);
	UiResizable.prototype.constructor = UiResizable;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function UiSelectable(options) {
	    UiInteraction.call(this, options);
	    options = options || {};
	}

	UiSelectable.prototype = Object.create(UiInteraction.prototype);
	UiSelectable.prototype.constructor = UiSelectable;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function UiSortable(options) {
	    UiInteraction.call(this, options);
	    options = options || {};
	}

	UiSortable.prototype = Object.create(UiInteraction.prototype);
	UiSortable.prototype.constructor = UiSortable;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function SvgDom(options) {
	    options = options || {};
	    this.width = options.width || 960;
	    this.height = options.height || 500;
	    this.parent = d3.select(options.parent || document.body);
	    this.children = [];
	}

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

	function SvgElement(options) {
	    options = options || [];
	    this.parent = d3.select(options.parent || document.body);
	    this.stroke = options.stroke || null;
	    this.strokeWidth = options.strokeWidth || null;
	    this.strokeOpacity = options.strokeOpacity || null;
	    this.strokeLinecap = options.strokeLinecap || null; // butt, square, round
	    this.fill = options.fill || null;
	    this.fillOpacity = options.fillOpacity || null;
	    this.fillRule = options.fillRule || null; // nonzero, evenodd
	    this.opacity = options.opacity || null;
	    this.style = options.style || null;
	}

	SvgElement.prototype.render = function() {

	};

	SvgElement.prototype.renderStyle = function(selection, scope) {
	    return selection
	        .attr('stroke', scope.stroke)
	        .attr('stroke-width', scope.strokeWidth)
	        .attr('stroke-opacity', scope.strokeOpacity)
	        .attr('stroke-linecap', scope.strokeLinecap)
	        .attr('fill', scope.fill)
	        .attr('fill-opacity', scope.fillOpacity)
	        .attr('fill-rule', scope.fillRule)
	        .attr('opacity', scope.opacity)
	        .attr('style', scope.style);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function SvgCircle(options) {
	    SvgElement.call(this, options);
	    options = options || {};
	    this.cx = options.cx || null;
	    this.cy = options.cy || null;
	    this.r = options.r || 50;
	}

	SvgCircle.prototype = Object.create(SvgElement.prototype);
	SvgCircle.prototype.constructor = SvgCircle;

	SvgCircle.prototype.render = function() {
	    this.parent.append('circle')
	        .attr('cx', this.cx)
	        .attr('cy', this.cy)
	        .attr('r', this.r)
	        .call(this.renderStyle, this);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function SvgRect(options) {
	    SvgElement.call(this, options);
	    options = options || {};
	    this.x = options.x || null;
	    this.y = options.y || null;
	    this.width = options.width || 100;
	    this.height = options.height || 60;
	    this.rx = options.rx || null;
	    this.ry = options.ry || null;
	}

	SvgRect.prototype = Object.create(SvgElement.prototype);
	SvgRect.prototype.constructor = SvgRect;

	SvgRect.prototype.render = function() {
	    this.parent.append('rect')
	        .attr('x', this.x)
	        .attr('y', this.y)
	        .attr('width', this.width)
	        .attr('height', this.height)
	        .attr('rx', this.rx)
	        .attr('ry', this.ry)
	        .call(this.renderStyle, this);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function SvgEllipse(options) {
	    SvgElement.call(this, options);
	    options = options || {};
	    this.cx = options.cx || null;
	    this.cy = options.cy || null;
	    this.rx = options.rx || 100;
	    this.ry = options.ry || 60;
	}

	SvgEllipse.prototype = Object.create(SvgElement.prototype);
	SvgEllipse.prototype.constructor = SvgEllipse;

	SvgEllipse.prototype.render = function() {
	    this.parent.append('ellipse')
	        .attr('cx', this.cx)
	        .attr('cy', this.cy)
	        .attr('rx', this.rx)
	        .attr('ry', this.ry)
	        .call(this.renderStyle, this);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function SvgLine(options) {
	    SvgElement.call(this, options);
	    options = options || {};
	    this.x1 = options.x1 || 0;
	    this.y1 = options.y1 || 0;
	    this.x2 = options.x2 || 100;
	    this.y2 = options.y2 || 100;
	    this.stroke = options.stroke === undefined ? 'red' : options.stroke;
	    this.strokeWidth = options.strokeWidth || 2;
	}

	SvgLine.prototype = Object.create(SvgElement.prototype);
	SvgLine.prototype.constructor = SvgLine;

	SvgLine.prototype.render = function() {
	    this.parent.append('line')
	        .attr('x1', this.x1)
	        .attr('y1', this.y1)
	        .attr('x2', this.x2)
	        .attr('y2', this.y2)
	        .call(this.renderStyle, this);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function SvgPolyline(options) {
	    SvgElement.call(this, options);
	    options = options || {};
	    this.points = options.points || '0,0,100,100,150,100,150,150';
	    this.stroke = options.stroke === undefined ? 'red' : options.stroke;
	    this.strokeWidth = options.strokeWidth || 2;
	    this.fill = options.fill || 'none';
	}

	SvgPolyline.prototype = Object.create(SvgElement.prototype);
	SvgPolyline.prototype.constructor = SvgPolyline;

	SvgPolyline.prototype.render = function() {
	    this.parent.append('polyline')
	        .attr('points', this.points)
	        .call(this.renderStyle, this);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function SvgPolygon(options) {
	    SvgElement.call(this, options);
	    options = options || {};
	    this.points = options.points || '0,0,100,0,100,100,0,100';
	    this.stroke = options.stroke || 'red';
	    this.strokeWidth = options.strokeWidth || 2;
	    this.fill = options.fill || 'yellow';
	}

	SvgPolygon.prototype = Object.create(SvgElement.prototype);
	SvgPolygon.prototype.constructor = SvgPolygon;

	SvgPolygon.prototype.render = function() {
	    this.parent.append('polygon')
	        .attr('points', this.points)
	        .call(this.renderStyle, this);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function SvgPath(options) {
	    SvgElement.call(this, options);
	    options = options || {};
	    this.d = options.d || 'M0 0 L100 0 L100 100 Z'; // M, L, H, V, C, S, Q, T, A, Z
	    this.stroke = options.stroke || 'red';
	    this.strokeWidth = options.strokeWidth || 2;
	    this.fill = options.fill || 'none';
	}

	SvgPath.prototype = Object.create(SvgElement.prototype);
	SvgPath.prototype.constructor = SvgPath;

	SvgPath.prototype.render = function() {
	    this.parent.append('path')
	        .attr('d', this.d)
	        .call(this.renderStyle, this);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function SvgGroup(options) {
	    SvgElement.call(this, options);
	    options = options || {};
	    this.fill = options.fill || null;
	    this.children = [];
	}

	SvgGroup.prototype = Object.create(SvgElement.prototype);
	SvgGroup.prototype.constructor = SvgGroup;

	SvgGroup.prototype.add = function(element) {
	    this.children.push(element);
	};

	SvgGroup.prototype.insert = function(index, element) {
	    this.children.splice(index, 0, element);
	};

	SvgGroup.prototype.remove = function(element) {
	    var index = this.children.indexOf(element);
	    if (index > -1) {
	        this.removeAt(index);
	    }
	};

	SvgGroup.prototype.removeAt = function(index) {
	    this.children.splice(index, 1);
	};

	SvgGroup.prototype.removeAll = function() {
	    this.children = [];
	};

	SvgGroup.prototype.clear = function() {
	    this.removeAll();
	};

	SvgGroup.prototype.render = function() {
	    this.el = this.parent.append('g')
	        .call(this.renderStyle, this);
	    this.children.forEach((n) => {
	        n.parent = this.el;
	        n.render.call(n);
	    });
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
	exports.UiControl = UiControl;
	exports.UiRect = UiRect;
	exports.UiContainer = UiContainer;
	exports.UiFixedContainer = UiFixedContainer;
	exports.UiLayout = UiLayout;
	exports.UiInteraction = UiInteraction;
	exports.UiDraggable = UiDraggable;
	exports.UiDroppable = UiDroppable;
	exports.UiResizable = UiResizable;
	exports.UiSelectable = UiSelectable;
	exports.UiSortable = UiSortable;
	exports.SvgDom = SvgDom;
	exports.SvgElement = SvgElement;
	exports.SvgCircle = SvgCircle;
	exports.SvgRect = SvgRect;
	exports.SvgEllipse = SvgEllipse;
	exports.SvgLine = SvgLine;
	exports.SvgPolyline = SvgPolyline;
	exports.SvgPolygon = SvgPolygon;
	exports.SvgPath = SvgPath;
	exports.SvgGroup = SvgGroup;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
