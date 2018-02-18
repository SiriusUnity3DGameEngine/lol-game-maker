(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.AI = {})));
}(this, (function (exports) { 'use strict';

	// OpenSeaAI editor custom events
	var CustomEvents = [
	    // ./editor/EditorApp.js
	    'beforeEditorRender',
	    'editorRender',
	    'editorStart',

	    // ./editor/EditorNavMenu.js
	    'newScene',
	    'openScene',
	    'saveScene',
	    'quitEditor',
	    'undo',
	    'redo',
	    'propertyPanel',
	    'logPanel',
	    'addBox',
	    'addCircle',
	    'addCone',
	    'addCylinder',
	    'addDodecahedron',
	    'addExtrude',
	    'addIcosahedron',
	    'addLathe',
	    'addOctahedron',
	    'addParametric',
	    'addPlane',
	    'addRing',
	    'addSphere',
	    'addTetrahedron',
	    'addText',
	    'addTorus',
	    'addTorusKnot',
	    'addTube',
	    'addFire',
	    'addTransform',
	    'addRigidBody',
	    'addMaterial',
	    'debug',
	    'play',
	    'document',
	    'about',
	    'addHeroWin',

	    // ./scene/webgl/GlScene.js
	    'beforeAnimate',
	    'onAnimate',

	    // ./scene/webgl/control/GlGUI.js
	    'translateObject',
	    'rotateObject',
	    'scaleObject',

	    // ./scene/webgl/event/GlHoverObject.js
	    'hoverObject',

	    // ./scene/webgl/event/GlSelectObject.js
	    'selectObject',
	    'unselectObject',

	    // ./lol/Model.js
	    'loadMesh',
	];

	var NavMenus = [{
	    id: 'scene',
	    text: 'Scene',
	    children: [{
	        id: 'newScene',
	        text: 'New Scene',
	    }, {
	        id: 'openScene',
	        text: 'Open Scene'
	    }, {
	        id: 'saveScene',
	        text: 'Save Scene',
	    }, {
	        id: 'quitEditor',
	        text: 'Quit'
	    }]
	}, {
	    id: 'edit',
	    text: 'Edit',
	    children: [{
	        id: 'undo',
	        text: 'Undo'
	    }, {
	        id: 'redo',
	        text: 'Redo'
	    }]
	}, {
	    id: 'view',
	    text: 'View',
	    children: [{
	        id: 'propertyPanel',
	        text: 'PropertyPanel'
	    }, {
	        id: 'logPanel',
	        text: 'Log Panel'
	    }]
	}, {
	    id: 'object',
	    text: 'Object',
	    children: [{
	        id: 'addBox',
	        text: 'Box'
	    }, {
	        id: 'addCircle',
	        text: 'Circle'
	    }, {
	        id: 'addCone',
	        text: 'Cone'
	    }, {
	        id: 'addCylinder',
	        text: 'Cylinder'
	    }, {
	        id: 'addDodecahedron',
	        text: 'Dodecahedron'
	    }, {
	        id: 'addExtrude',
	        text: 'Extrude'
	    }, {
	        id: 'addIcosahedron',
	        text: 'Icosahedron'
	    }, {
	        id: 'addLathe',
	        text: 'Lathe'
	    }, {
	        id: 'addOctahedron',
	        text: 'Octahedron'
	    }, {
	        id: 'addParametric',
	        text: 'Parametric'
	    }, {
	        id: 'addPlane',
	        text: 'Plane'
	    }, {
	        id: 'addRing',
	        text: 'Ring'
	    }, {
	        id: 'addSphere',
	        text: 'Sphere'
	    }, {
	        id: 'addTetrahedron',
	        text: 'Tetrahedron'
	    }, {
	        id: 'addTorus',
	        text: 'Torus'
	    }, {
	        id: 'addTorusKnot',
	        text: 'Torus Knot'
	    }, {
	        id: 'addTube',
	        text: 'Tube'
	    }, {
	        id: 'addFire',
	        text: 'Fire'
	    }, {
	        id: 'addHeroWin',
	        text: 'Hero'
	    }]
	}, {
	    id: 'component',
	    text: 'Component',
	    children: [{
	        id: 'addTransform',
	        text: 'Transform'
	    }, {
	        id: 'addRigidBody',
	        text: 'Rigid Body'
	    }, {
	        id: 'addMaterial',
	        text: 'Material'
	    }]
	}, {
	    id: 'run',
	    text: 'Run',
	    children: [{
	        id: 'debug',
	        text: 'Debug'
	    }, {
	        id: 'play',
	        text: 'Play'
	    }]
	}, {
	    id: 'help',
	    text: 'Help',
	    children: [{
	        id: 'document',
	        text: 'Document'
	    }, {
	        id: 'about',
	        text: 'About'
	    }]
	}];

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

	    var _this = this;
	    options.coordinates.forEach(function(n, i) {
	        _this.coordinates.push(new Coordinate({
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

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Control(options) {
	    options = options || {};
	    this.parent = options.parent || document.body;
	    this.el = {};
	}

	Control.prototype.render = function() {

	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Container(options) {
	    Control.call(this, options);

	    options = options || {};
	    this.children = options.children || [];
	}

	Container.prototype = Object.create(Control.prototype);
	Container.prototype.constructor = Container;

	Container.prototype.add = function(control) {
	    this.children.push(control);
	};

	Container.prototype.insert = function(index, control) {
	    this.children.splice(index, 0, control);
	};

	Container.prototype.remove = function(control) {
	    var index = this.children.indexOf(control);
	    if (index > -1) {
	        this.removeAt(index);
	    }
	};

	Container.prototype.removeAt = function(index) {
	    this.children.splice(index, 1);
	};

	Container.prototype.render = function() {
	    this.el = document.createElement('div');
	    var _this = this;
	    this.children.forEach(function(n, i) {
	        n.parent = _this.el;
	        n.render.call(n);
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Interaction(options) {
	    options = options || {};
	}

	Interaction.prototype.apply = function() {

	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Layout(options) {
	    Container.call(this, options);
	    options = options || {};
	}

	Layout.prototype = Object.create(Container.prototype);
	Layout.prototype.constructor = Layout;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function UiHelper() {

	}

	UiHelper.createStyleSheet = function() {
	    var head = document.head || document.getElementsByTagName('head')[0];
	    var style = document.createElement('style');
	    style.type = 'text/css';
	    head.appendChild(style);
	    return style.sheet || style.styleSheet;
	};

	UiHelper.addCssRule = function(selector, rules, index) {
	    index = index || 0;
	    var sheet = UiHelper.createStyleSheet();
	    if (sheet.insertRule) {
	        sheet.insertRule(selector + "{" + rules + "}", index);
	    } else if (sheet.addRule) {
	        sheet.addRule(selector, rules, index);
	    }
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function UiStyler(options) {
	    options = options || {};

	    // Positioning
	    this.position = options.position || null;
	    this.left = options.left || null;
	    this.top = options.top || null;
	    this.right = options.right || null;
	    this.bottom = options.bottom || null;
	    this.zIndex = options.zIndex || null;

	    // Layout
	    this.clear = options.clear || null;
	    this.display = options.display || null;
	    this.float = options.float || null;
	    this.overflow = options.overflow || null;
	    this.overflowX = options.overflowX || null;
	    this.overflowY = options.overflowY || null;
	    this.rotation = options.rotation || null;
	    this.visibility = options.visibility || null;

	    // Flexible-box

	    // Dimension
	    this.width = options.width || null;
	    this.height = options.height || null;
	    this.maxWidth = options.maxWidth || null;
	    this.minWidth = options.minWidth || null;
	    this.maxHeight = options.maxHeight || null;
	    this.minHeight = options.minHeight || null;

	    // Margin
	    this.margin = options.margin || null;
	    this.marginTop = options.Top || null;
	    this.marginRight = options.marginRight || null;
	    this.marginBottom = options.marginBottom || null;
	    this.marginLeft = options.marginLeft || null;

	    // Padding
	    this.padding = options.padding || null;
	    this.paddingTop = options.paddingTop || null;
	    this.paddingRight = options.paddingRight || null;
	    this.paddingBottom = options.paddingBottom || null;
	    this.paddingLeft = options.paddingLeft || null;

	    // Border
	    this.border = options.border || null;
	    this.borderWidth = options.borderWidth || null;
	    this.borderStyle = options.borderStyle || null;
	    this.borderColor = options.borderColor || null;
	    this.borderRadius = options.borderRadius || null;
	    this.borderShadow = options.borderShadow || null;

	    // Background
	    this.background = options.background || null;

	    // Color
	    this.color = options.color || null;
	    this.opacity = options.opacity || null;

	    // Font
	    this.font = options.font || null;

	    // Text
	    this.textAlign = options.textAlign || null;
	    this.lineHeight = options.lineHeight || null;

	    // Text Decoration
	    this.textDecoration = options.textDecoration || null;
	    this.textShadow = options.textShadow || null;

	    // List
	    this.listStyle = options.listStyle || null;

	    // Table
	    this.tableLayout = options.tableLayout || null;
	    this.borderCollapse = options.borderCollapse || null;

	    // Content
	    this.content = options.content || null;

	    // User Interface
	    this.cursor = options.cursor || null;
	    this.boxSizing = options.boxSizing || null;
	}

	UiStyler.prototype.render = function(dom, scope) {
	    var _this = scope || this;
	    dom.style.position = _this.position;

	    // Positioning
	    dom.style.position = _this.position;
	    dom.style.left = _this.left;
	    dom.style.top = _this.top;
	    dom.style.right = _this.right;
	    dom.style.bottom = _this.bottom;
	    dom.style.zIndex = _this.zIndex;

	    // Layout
	    dom.style.clear = _this.clear;
	    dom.style.display = _this.display;
	    dom.style.float = _this.float;
	    dom.style.overflow = _this.overflow;
	    dom.style.overflowX = _this.overflowX;
	    dom.style.overflowY = _this.overflowY;
	    dom.style.rotation = _this.rotation;
	    dom.style.visibility = _this.visibility;

	    // Flexible-box

	    // Dimension
	    dom.style.width = _this.width;
	    dom.style.height = _this.height;
	    dom.style.maxWidth = _this.maxWidth;
	    dom.style.minWidth = _this.minWidth;
	    dom.style.maxHeight = _this.maxHeight;
	    dom.style.minHeight = _this.minHeight;

	    // Margin
	    dom.style.margin = _this.margin;
	    dom.style.marginTop = _this.Top;
	    dom.style.marginRight = _this.marginRight;
	    dom.style.marginBottom = _this.marginBottom;
	    dom.style.marginLeft = _this.marginLeft;

	    // Padding
	    dom.style.padding = _this.padding;
	    dom.style.paddingTop = _this.paddingTop;
	    dom.style.paddingRight = _this.paddingRight;
	    dom.style.paddingBottom = _this.paddingBottom;
	    dom.style.paddingLeft = _this.paddingLeft;

	    // Border
	    dom.style.border = _this.border;
	    dom.style.borderWidth = _this.borderWidth;
	    dom.style.borderStyle = _this.borderStyle;
	    dom.style.borderColor = _this.borderColor;
	    dom.style.borderRadius = _this.borderRadius;
	    dom.style.borderShadow = _this.borderShadow;

	    // Background
	    dom.style.background = _this.background;

	    // Color
	    dom.style.color = _this.color;
	    dom.style.opacity = _this.opacity;

	    // Font
	    dom.style.font = _this.font;

	    // Text
	    dom.style.textAlign = _this.textAlign;
	    dom.style.lineHeight = _this.lineHeight;

	    // Text Decoration
	    dom.style.textDecoration = _this.textDecoration;
	    dom.style.textShadow = _this.textShadow;

	    // List
	    dom.style.listStyle = _this.listStyle;

	    // Table
	    dom.style.tableLayout = _this.tableLayout;
	    dom.style.borderCollapse = _this.borderCollapse;

	    // Content
	    dom.style.content = _this.content;

	    // User Interface
	    dom.style.cursor = _this.cursor;
	    dom.style.boxSizing = _this.boxSizing;
	};

	function FixedContainer(options) {
	    Container.call(this, options);
	    this.children = options.children || [];
	    this.width = options.width || '220px';
	    this.height = options.height || '120px';
	    this.margin = options.margin || '10px';
	    this.padding = options.padding || '2px';
	    this.display = options.display || 'block';
	    this.borderWidth = options.borderWidth || '2px';
	    this.borderColor = options.borderColor || 'black';
	    this.borderStyle = options.borderStyle || 'solid';
	    this.float = options.float || null;
	    this.html = options.html || null;
	    this.cls = options.cls || null;
	}

	FixedContainer.prototype = Object.create(Container.prototype);
	FixedContainer.prototype.constructor = FixedContainer;

	FixedContainer.prototype.render = function() {
	    this.el = document.createElement('div');
	    this.el.style.width = this.width;
	    this.el.style.height = this.height;
	    this.el.style.borderWidth = this.borderWidth;
	    this.el.style.borderColor = this.borderColor;
	    this.el.style.borderStyle = this.borderStyle;
	    this.el.style.margin = this.margin;
	    this.el.style.padding = this.padding;
	    this.el.style.display = this.display;
	    this.el.style.float = this.float;
	    this.el.className = this.cls;
	    this.el.innerHTML = this.html;
	    this.parent.append(this.el);
	    var _this = this;
	    this.children.forEach(function(n, i) {
	        n.parent = _this.el;
	        n.render.call(n);
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Accordion(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.width = options.width || null;
	    this.cls = options.cls || null;
	    this.fit = options.fit || null;
	    this.children = options.children || [];
	}

	Accordion.prototype = Object.create(Control.prototype);
	Accordion.prototype.constructor = Accordion;

	Accordion.prototype.render = function() {
	    this.el.div = document.createElement('div');
	    this.el.div.className = this.cls;
	    this.el.div.style.width = this.width;
	    this.parent.appendChild(this.el.div);
	    var _this = this;
	    this.children.forEach(function(n) {
	        n.parent = _this.el.div;
	        n.render.call(n);
	    });
	    $(this.el.div).accordion({
	        heightStyle: this.fit ? 'fill' : null
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AccordionItem(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.title = options.title || 'Tab';
	    this.html = options.html || null;
	    this.children = options.children || [];
	}

	AccordionItem.prototype = Object.create(Control.prototype);
	AccordionItem.prototype.constructor = AccordionItem;

	AccordionItem.prototype.render = function() {
	    this.el.title = document.createElement('h3');
	    this.el.title.innerHTML = this.title;
	    this.parent.appendChild(this.el.title);

	    this.el.body = document.createElement('div');
	    this.el.body.innerHTML = this.html;
	    this.parent.appendChild(this.el.body);

	    var _this = this;
	    this.children.forEach(function(n) {
	        n.parent = _this.el.body;
	        n.render.call(n);
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Autocomplete(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.source = options.source || []; // [ 'text1', 'text2' ]
	}

	Autocomplete.prototype = Object.create(Control.prototype);
	Autocomplete.prototype.constructor = Autocomplete;

	Autocomplete.prototype.render = function() {
	    this.el.input = document.createElement('input');
	    this.parent.appendChild(this.el.input);
	    $(this.el.input).autocomplete({
	        source: this.source
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Button(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.text = options.text || 'Button';
	}

	Button.prototype = Object.create(Control.prototype);
	Button.prototype.constructor = Button;

	Button.prototype.render = function() {
	    this.el.button = document.createElement('button');
	    this.el.button.innerHTML = this.text;
	    this.parent.appendChild(this.el.button);
	    $(this.el.button).button();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function CheckBox(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.label = options.label || null;
	    this.value = options.value || null;
	}

	CheckBox.prototype = Object.create(Control.prototype);
	CheckBox.prototype.constructor = CheckBox;

	CheckBox.prototype.render = function() {
	    this.el.div = document.createElement('div');
	    this.parent.appendChild(this.el.div);
	    if (this.label) {
	        this.el.label = document.createElement('label');
	        this.el.label.innerHTML = this.label;
	        this.el.div.appendChild(this.el.label);
	    }
	    this.el.input = document.createElement('input');
	    this.el.input.setAttribute('type', 'checkbox');
	    this.el.input.setAttribute('value', this.value);
	    this.el.div.appendChild(this.el.input);
	    $(this.el.div).controlgroup();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function TextField(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.type = options.type || 'text';
	    this.label = options.label || null;
	    this.labelWidth = options.labelWidth || '45px';
	    this.value = options.value || '';
	    this.enabled = options.enabled || true;
	}

	TextField.prototype = Object.create(Control.prototype);
	TextField.prototype.constructor = TextField;

	TextField.prototype.render = function() {
	    this.el.div = d3.select(this.parent)
	        .append('div')
	        .style('margin', '3px 0')
	        .node();

	    if (this.label) {
	        this.el.label = d3.select(this.el.div)
	            .append('label')
	            .data([this])
	            .text(function(d) {
	                return d.label;
	            })
	            .style('width', function(d) {
	                return d.labelWidth;
	            })
	            .style('display', 'inline-block')
	            .style('text-align', 'right')
	            .node();
	    }

	    this.el.input = d3.select(this.el.div)
	        .append('input')
	        .data([this])
	        .property('type', function(d) {
	            return d.type;
	        })
	        .attr('value', function(d) {
	            return d.value;
	        })
	        .style('margin-left', '10px')
	        .attr('disabled', function(d) {
	            if (d.enabled) {
	                return null;
	            } else {
	                return 'disabled';
	            }
	        })
	        .node();
	};

	TextField.prototype.getValue = function() {
	    return d3.select(this.el.input).property('value');
	};

	TextField.prototype.setValue = function(value) {
	    this.value = value;
	    d3.select(this.el.input).property('value', this.value);
	};

	TextField.prototype.on = function(eventName, callback) {
	    if (callback == null) {
	        d3.select(this.el.input).on(eventName, null);
	    } else if (typeof(callback) == 'function') {
	        var _this = this;
	        d3.select(this.el.input).on(eventName, function() {
	            callback.call(_this, _this.getValue());
	        });
	    }
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function CheckboxField(options) {
	    TextField.call(this, options);
	    this.type = 'checkbox';
	}

	CheckboxField.prototype = Object.create(TextField.prototype);
	CheckboxField.prototype.constructor = CheckboxField;

	CheckboxField.prototype.getValue = function() {
	    return this.el.input.checked;
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function CheckboxRadio(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.text = options.text || 'Label';
	    this.type = options.type || 'radio'; // radio, checkbox
	}

	CheckboxRadio.prototype = Object.create(Control.prototype);
	CheckboxRadio.prototype.constructor = CheckboxRadio;

	CheckboxRadio.prototype.render = function() {
	    var index = CheckboxRadio.index++;
	    this.el.label = document.createElement('label');
	    this.el.label.setAttribute('for', this.type + index);
	    this.el.label.innerHTML = this.text;
	    this.parent.appendChild(this.el.label);

	    this.el.input = document.createElement('input');
	    this.el.input.type = this.type;
	    this.el.input.id = this.type + index;
	    this.el.input.name = this.type + index;
	    this.parent.appendChild(this.el.input);

	    $(this.el.input).checkboxradio();
	};

	CheckboxRadio.index = 1;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function ColorField(options) {
	    TextField.call(this, options);
	    this.type = 'color';
	}

	ColorField.prototype = Object.create(TextField.prototype);
	ColorField.prototype.constructor = ColorField;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	var ID = -1;

	function ColorPicker(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.id = options.id || 'colorpicker' + ID--;
	    this.label = options.label || null;
	    this.color = options.color || null; // #ffffff
	    this.defaultPalette = options.defaultPalette || 'web';
	    this.displayIndicator = options.displayIndicator || false;
	    this.hideButton = options.hideButton || true;
	    this.history = options.history || false;
	    this.initialHistory = options.initialHistory || []; // ["#ff0000", "#00ff00", "#0000ff"]
	    this.showOn = options.showOn || 'button';
	    this.transparentColor = options.transparentColor || false; // "#0000ffff"
	    this.dispatch = d3.dispatch('changeColor', 'mouseoverColor');
	}

	ColorPicker.prototype = Object.create(Control.prototype);
	ColorPicker.prototype.constructor = ColorPicker;

	ColorPicker.prototype.render = function() {
	    this.el.div = document.createElement('div');
	    this.parent.appendChild(this.el.div);
	    if (this.label) {
	        this.el.label = document.createElement('label');
	        this.el.label.innerHTML = this.label;
	        this.el.div.appendChild(this.el.label);
	    }
	    this.el.input = document.createElement('input');
	    this.el.input.setAttribute('id', this.id);
	    this.el.div.appendChild(this.el.input);
	    $(this.el.input).colorpicker();
	    $(this.el.div).controlgroup();
	    var _this = this;
	    $(this.el.input).on('change.color', function(event, color) {
	        _this.dispatch.call('changeColor', _this, color);
	    });
	    $(this.el.input).on('mouseover.color', function(event, color) {
	        _this.dispatch.call('mouseoverColor', _this, color);
	    });
	};

	ColorPicker.prototype.clear = function() {
	    $(this.el.input).colorpicker('clear');
	};

	ColorPicker.prototype.enable = function() {
	    $(this.el.input).colorpicker('enable');
	};

	ColorPicker.prototype.disable = function() {
	    $(this.el.input).colorpicker('disable');
	};

	ColorPicker.prototype.isDisabled = function() {
	    $(this.el.input).colorpicker('isDisabled');
	};

	ColorPicker.prototype.val = function(color) { // #d0d0d0
	    $(this.el.input).colorpicker('val', color);
	};

	ColorPicker.prototype.showPalette = function() {
	    $(this.el.input).colorpicker('showPalette');
	};

	ColorPicker.prototype.hidePalette = function() {
	    $(this.el.input).colorpicker('hidePalette');
	};

	ColorPicker.prototype.hidePalette = function() {
	    $(this.el.input).colorpicker('hidePalette');
	};

	ColorPicker.prototype.on = function(eventName, callback) {
	    this.dispatch.on(eventName, callback);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Controlgroup(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.children = options.children || [];
	    this.direction = options.direction || 'vertical'; // horizontal, vertical
	}

	Controlgroup.prototype = Object.create(Control.prototype);
	Controlgroup.prototype.constructor = Controlgroup;

	Controlgroup.prototype.render = function() {
	    this.el.div = document.createElement('div');
	    this.parent.appendChild(this.el.div);
	    var _this = this;
	    this.children.forEach(function(n) {
	        n.parent = _this.el.div;
	        n.render.call(n);
	    });
	    $(this.el.div).controlgroup({
	        direction: this.direction
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function DateField(options) {
	    TextField.call(this, options);
	    this.type = 'date';
	}

	DateField.prototype = Object.create(TextField.prototype);
	DateField.prototype.constructor = DateField;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Datepicker(options) {
	    Control.call(this, options);
	    options = options || {};
	}

	Datepicker.prototype = Object.create(Control.prototype);
	Datepicker.prototype.constructor = Datepicker;

	Datepicker.prototype.render = function() {
	    this.el.input = document.createElement('input');
	    this.parent.appendChild(this.el.input);
	    $(this.el.input).datepicker();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Dialog(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.title = options.title || 'Dialog';
	    this.width = options.width || 300;
	    this.height = options.height || 'auto';
	    this.html = options.html || null;
	    this.children = options.children || [];
	}

	Dialog.prototype = Object.create(Control.prototype);
	Dialog.prototype.constructor = Dialog;

	Dialog.prototype.render = function() {
	    this.el.div = document.createElement('div');
	    this.el.div.setAttribute('title', this.title);
	    this.el.div.innerHTML = this.html;
	    this.parent.appendChild(this.el.div);
	    this.children.forEach(function(n) {
	        n.parent = this.el.div;
	        n.render.call(n);
	    });
	    $(this.el.div).dialog({
	        width: this.width,
	        height: this.height
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Fieldset(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.title = options.title || null;
	    this.children = options.children || [];
	}

	Fieldset.prototype = Object.create(Control.prototype);
	Fieldset.prototype.constructor = Fieldset;

	Fieldset.prototype.add = function(control) {
	    control.parent = this.el.fieldset;
	    this.children.push(control);
	    control.render.call(control);
	};

	Fieldset.prototype.render = function() {
	    this.el.fieldset = document.createElement('fieldset');
	    this.parent.appendChild(this.el.fieldset);

	    if (this.title) {
	        this.el.legend = document.createElement('legend');
	        this.el.legend.innerHTML = this.title;
	        this.el.fieldset.appendChild(this.el.legend);
	    }

	    var _this = this;
	    this.children.forEach(function(n, i) {
	        n.parent = _this.el.fieldset;
	        n.render.call(n);
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function List(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.width = options.width || '100px';
	    this.height = options.height || 'auto';
	    this.children = options.children || []; // [ 'item1', 'item2', 'item3' ]
	    this.style = options.style || 'list-style: none; margin: 0; -webkit-padding-start: 0;';
	    this.itemStyle = options.itemStyle || 'border: 1px solid #ccc; margin: 1px;';
	}

	List.prototype = Object.create(Control.prototype);
	List.prototype.constructor = List;

	List.prototype.render = function() {
	    this.el = document.createElement('ul');
	    this.el.style = this.style;
	    this.parent.appendChild(this.el);
	    this.el.items = [];
	    var _this = this;
	    this.children.forEach(function(n) {
	        var item = document.createElement('li');
	        item.innerHTML = n;
	        item.style = _this.itemStyle;
	        _this.el.appendChild(item);
	        _this.el.items.push(item);
	    });

	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Menu(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.width = options.width || null;
	    this.cls = options.cls || '';
	    this.direction = options.direction || 'vertical'; // horizontal, vertical
	    this.children = options.children || [];
	    this.dispatch = d3.dispatch('blur', 'create', 'focus', 'select');
	}

	Menu.prototype = Object.create(Control.prototype);
	Menu.prototype.constructor = Menu;

	Menu.prototype.blur = function() {
	    $(this.el.ul).menu('blur');
	};

	Menu.prototype.collapse = function() {
	    $(this.el.ul).menu('collapse');
	};

	Menu.prototype.collapseAll = function() {
	    $(this.el.ul).menu('collapseAll');
	};

	Menu.prototype.destroy = function() {
	    $(this.el.ul).menu('destroy');
	};

	Menu.prototype.disable = function() {
	    $(this.el.ul).menu('disable');
	};

	Menu.prototype.enable = function() {
	    $(this.el.ul).menu('enable');
	};

	Menu.prototype.expand = function() {
	    $(this.el.ul).menu('expand');
	};

	Menu.prototype.render = function() {
	    this.el.ul = document.createElement('ul');
	    this.el.ul.className = this.cls;
	    if (this.direction == 'horizontal') {
	        this.el.ul.className = ' ui-menu-horizontal';
	    }
	    this.el.ul.style.width = this.width;
	    this.parent.appendChild(this.el.ul);
	    var _this = this;
	    this.children.forEach(function(n) {
	        n.parent = _this.el.ul;
	        n.render.call(n);
	    });
	    if (this.direction == 'vertical') {
	        $(this.el.ul).menu({
	            blur: function(event, ui) {
	                _this.dispatch.call('blur', _this, event, ui);
	            },
	            create: function(event, ui) {
	                _this.dispatch.call('create', _this, event, ui);
	            },
	            focus: function(event, ui) {
	                _this.dispatch.call('focus', _this, event, ui);
	            },
	            select: function(event, ui) {
	                _this.dispatch.call('select', _this, event, ui);
	            }
	        });
	    } else {
	        $(this.el.ul).menu({
	            icons: {
	                submenu: 'ui-icon-caret-1-s'
	            },
	            position: {
	                my: 'left top',
	                at: 'left bottom'
	            },
	            blur: function(event, ui) {
	                _this.dispatch.call('blur', _this, event, ui);
	            },
	            create: function(event, ui) {
	                _this.dispatch.call('create', _this, event, ui);
	            },
	            focus: function(event, ui) {
	                _this.dispatch.call('focus', _this, event, ui);
	            },
	            select: function(event, ui) {
	                _this.dispatch.call('select', _this, event, ui);
	            }
	        });
	    }
	};

	Menu.prototype.on = function(eventName, callback) {
	    this.dispatch.on(eventName, callback);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function MenuItem(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.id = options.id || 'menuitem' + MenuItem.index--;
	    this.text = options.text || 'Menu Item';
	    this.cls = options.cls || null;
	    this.subCls = options.subCls || null;
	    this.children = options.children || [];
	}

	MenuItem.prototype = Object.create(Control.prototype);
	MenuItem.prototype.constructor = MenuItem;

	MenuItem.prototype.render = function() {
	    this.el.li = document.createElement('li');
	    this.el.li.setAttribute('id', this.id);
	    this.el.li.className = this.cls;
	    this.el.div = document.createElement('div');
	    this.el.div.innerHTML = this.text;
	    this.el.li.appendChild(this.el.div);
	    this.parent.appendChild(this.el.li);
	    if (this.children.length == 0) {
	        return;
	    }
	    this.el.ul = document.createElement('ul');
	    if (this.subCls) {
	        this.el.ul.className = this.subCls;
	    }
	    this.el.li.appendChild(this.el.ul);
	    var _this = this;
	    this.children.forEach(function(n) {
	        n.parent = _this.el.ul;
	        n.render.call(n);
	    });
	};

	MenuItem.index = -1;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function ProgressBar(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.width = options.width || null;
	    this.value = options.value || 0;
	}

	ProgressBar.prototype = Object.create(Control.prototype);
	ProgressBar.prototype.constructor = ProgressBar;

	ProgressBar.prototype.render = function() {
	    this.el.div = document.createElement('div');
	    this.el.div.style.width = this.width;
	    this.parent.appendChild(this.el.div);
	    $(this.el.div).progressbar({
	        value: this.value
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Rect(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.width = options.width || '100px';
	    this.height = options.height || '80px';
	    this.backgroundColor = options.backgroundColor || 'red';
	    this.padding = options.padding || '5px';
	    this.text = options.text || 'Rect';
	}

	Rect.prototype = Object.create(Control.prototype);
	Rect.prototype.constructor = Rect;

	Rect.prototype.render = function() {
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

	function SelectMenu(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.children = options.children || [];
	}

	SelectMenu.prototype = Object.create(Control.prototype);
	SelectMenu.prototype.constructor = SelectMenu;

	SelectMenu.prototype.render = function() {
	    this.el.select = document.createElement('select');
	    this.parent.appendChild(this.el.select);
	    var _this = this;
	    this.children.forEach(function(n) {
	        n.parent = _this.el.select;
	        n.render.call(n);
	    });
	    $(this.el.select).selectmenu();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function SelectMenuItem(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.text = options.text || 'Item';
	}

	SelectMenuItem.prototype = Object.create(Control.prototype);
	SelectMenuItem.prototype.constructor = SelectMenuItem;

	SelectMenuItem.prototype.render = function() {
	    this.el.option = document.createElement('option');
	    this.el.option.innerHTML = this.text;
	    this.parent.appendChild(this.el.option);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Slider(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.width = options.width || '200px';
	}

	Slider.prototype = Object.create(Control.prototype);
	Slider.prototype.constructor = Slider;

	Slider.prototype.render = function() {
	    this.el.div = document.createElement('div');
	    this.el.div.style.width = this.width;
	    this.parent.appendChild(this.el.div);
	    $(this.el.div).slider();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Spinner(options) {
	    Control.call(this, options);
	    options = options || {};
	}

	Spinner.prototype = Object.create(Control.prototype);
	Spinner.prototype.constructor = Spinner;

	Spinner.prototype.render = function() {
	    this.el.input = document.createElement('input');
	    this.parent.appendChild(this.el.input);
	    $(this.el.input).spinner();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	var ID$1 = -1;

	function TabItem(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.id = options.id || 'tabitem' + ID$1--;
	    this.title = options.title || 'Tab';
	    this.html = options.html || null;
	    this.children = options.children || [];
	    this.overflow = options.overflow || null;
	    this.closable = options.closable || false;
	    this.tabs = options.tabs || null;
	}

	TabItem.prototype = Object.create(Control.prototype);
	TabItem.prototype.constructor = TabItem;

	TabItem.prototype.add = function(control) {
	    this.children.push(control);
	    control.parent = this.el.div;
	    control.render.call(control);
	};

	TabItem.prototype.insert = function(index, control) {
	    this.children.splice(index, 0, control);
	    control.parent = this.el.div;
	    control.render.call(control);
	};

	TabItem.prototype.remove = function(control) {
	    var index = this.children.indexOf(control);
	    if (index > -1) {
	        this.children.splice(index, 1);
	        $(this.el.div).children().eq(index).remove();
	    }
	};

	TabItem.prototype.removeAt = function(index) {
	    this.children.splice(index, 1);
	    $(this.el.div).children().eq(index).remove();
	};

	TabItem.prototype.removeAll = function() {
	    this.children = [];
	    $(this.el.div).empty();
	};

	TabItem.prototype.clear = function() {
	    this.removeAll();
	};

	TabItem.prototype.close = function() {
	    var index = $(this.el.li).index();
	    $(this.el.li).remove();
	    $(this.el.div).remove();
	    $(this.parent).tabs('refresh');
	    if (this.tabs) {
	        this.tabs.children.splice(index, 1);
	        this.tabs.dispatch.call('close', this.tabs, this);
	    }
	};

	TabItem.prototype.render = function() {
	    var _this = this;
	    var index = TabItem.index++;
	    this.el.li = document.createElement('li');
	    this.el.a = document.createElement('a');
	    this.el.a.innerHTML = this.title;
	    this.el.a.setAttribute('href', '#' + this.id);
	    this.el.li.appendChild(this.el.a);
	    if (this.closable) {
	        this.el.span = document.createElement('span');
	        this.el.span.className = 'ui-icon ui-icon-close';
	        this.el.span.setAttribute('role', 'presentation');
	        this.el.span.innerHTML = 'Remove Tab';
	        this.el.span.style.cursor = 'pointer';
	        this.el.li.appendChild(this.el.span);
	        $(this.el.span).on('click', function() {
	            _this.close.call(_this);
	        });
	    }
	    $('ul', this.parent).append(this.el.li);

	    this.el.div = document.createElement('div');
	    this.el.div.id = this.id;
	    if (this.overflow) {
	        this.el.div.style.overflow = this.overflow;
	    }
	    this.parent.appendChild(this.el.div);
	    this.el.div.innerHTML = this.html;
	    this.children.forEach(function(n) {
	        n.parent = _this.el.div;
	        n.render.call(n);
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function TabPanel(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.children = options.children || [];
	    this.width = options.width || null;
	    this.cls = options.cls || null;
	    this.fit = options.fit || false;
	    this.sortable = options.sortable || true;
	    this.dispatch = d3.dispatch('activate', 'beforeActivate', 'beforeLoad', 'create', 'load', 'close');
	}

	TabPanel.prototype = Object.create(Control.prototype);
	TabPanel.prototype.constructor = TabPanel;

	TabPanel.prototype.refresh = function() {
	    $(this.el.div).tabs('refresh');
	};

	TabPanel.prototype.add = function(control) {
	    this.children.push(control);
	    control.parent = this.el.div;
	    control.tabs = this;
	    control.render.call(control);
	    this.refresh();
	    $(this.el.div).tabs('option', 'active', this.children.length - 1);
	    this.refresh();
	};

	TabPanel.prototype.insert = function(index, control) {
	    this.children.splice(index, 0, control);
	    control.parent = this.el.div;
	    control.tabs = this;
	    control.render.call(control);
	    this.refresh();
	    $(this.el.div).tabs('option', 'active', index);
	    this.refresh();
	};

	TabPanel.prototype.remove = function(control) {
	    var index = this.children.indexOf(control);
	    if (index > -1) {
	        this.children.splice(index, 1);
	        control.close();
	        this.refresh();
	    }
	};

	TabPanel.prototype.removeAt = function(index) {
	    var control = this.children[index];
	    control.close();
	    this.children.splice(index, 1);
	    this.refresh();
	};

	TabPanel.prototype.render = function() {
	    this.el.div = document.createElement('div');
	    this.el.div.className = this.cls;
	    this.el.div.style.width = this.width;
	    this.parent.appendChild(this.el.div);
	    this.el.ul = document.createElement('ul');
	    this.el.div.appendChild(this.el.ul);
	    var _this = this;
	    this.children.forEach(function(n) {
	        n.parent = _this.el.div;
	        n.tabs = _this;
	        n.render.call(n);
	    });
	    $(this.el.div).tabs({
	        heightStyle: this.fit ? "fill" : null,
	        activate: function(event, ui) {
	            _this.dispatch.call('activate', _this, event, ui);
	        },
	        beforeActivate: function(event, ui) {
	            _this.dispatch.call('beforeActivate', _this, event, ui);
	        },
	        beforeLoad: function(event, ui) {
	            _this.dispatch.call('beforeLoad', _this, event, ui);
	        },
	        create: function(event, ui) {
	            _this.dispatch.call('create', _this, event, ui);
	        },
	        load: function(event, ui) {
	            _this.dispatch.call('load', _this, event, ui);
	        },
	    });
	    if (this.sortable) {
	        var _this = this;
	        $(this.el.div).find('.ui-tabs-nav').sortable({
	            axis: 'x',
	            stop: function() {
	                $(_this.el.div).tabs('refresh');
	            }
	        });
	    }
	};

	TabPanel.prototype.on = function(eventName, callback) {
	    this.dispatch.on(eventName, callback);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Tooltip(options) {
	    Control.call(this, options);
	    options = options || {};
	}

	Tooltip.prototype = Object.create(Control.prototype);
	Tooltip.prototype.constructor = Tooltip;

	Tooltip.prototype.render = function() {
	    $(document).tooltip();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	var ID$2 = -1;

	function Tree(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.id = options.id || 'tree' + ID$2--;
	    this.dispatch = d3.dispatch('click');
	    var _this = this;
	    this.setting = options.setting || {
	        treeId: this.id,
	        callback: {
	            onClick: function(event, treeId, treeNode, clickFlag) {
	                _this.dispatch.call('click', _this, event, treeId, treeNode, clickFlag);
	            }
	        }
	    };
	    this.data = options.data || [];
	}

	Tree.prototype = Object.create(Control.prototype);
	Tree.prototype.constructor = Tree;

	Tree.prototype.render = function() {
	    this.el.ul = document.createElement('ul');
	    this.el.ul.className = 'ztree';
	    //this.el.ul.setAttribute('id', this.id);
	    this.parent.appendChild(this.el.ul);
	    $.fn.zTree.init($(this.el.ul), this.setting, this.data);
	};

	Tree.prototype.on = function(eventName, callback) {
	    this.dispatch.on(eventName, callback);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Draggable(options) {
	    Interaction.call(this, options);
	    options = options || {};

	    this.dispatch = d3.dispatch('start', 'drag', 'stop');

	    this.scroll = options.scroll || true;
	    this.scrollSensitivity = options.scrollSensitivity || null;
	    this.scrollSpeed = options.scrollSpeed || null;
	    this.axis = options.axis || null; // 'x' or 'y'
	    this.containment = options.containment || null; // '#containment-wrapper' or 'parent'
	    this.cursor = options.cursor || null; // 'move', 'crosshair', ...
	    this.cursorAt = options.cursorAt || null; // { left: -5, top: -5 } or { bottom: 0 }
	}

	Draggable.prototype = Object.create(Interaction.prototype);
	Draggable.prototype.constructor = Draggable;

	Draggable.prototype.apply = function(control) {
	    var el = control instanceof Control ? control.el : control;
	    var _this = this;
	    $(el).draggable({
	        scroll: this.scroll,
	        scrollSensitivity: this.scrollSensitivity,
	        scrollSpeed: this.scrollSpeed,
	        axis: this.axis,
	        containment: this.containment,
	        cursor: this.cursor,
	        cursorAt: this.cursorAt,
	        start: function() {
	            _this.dispatch.call('start', _this);
	        },
	        drag: function() {
	            _this.dispatch.call('drag', _this);
	        },
	        stop: function() {
	            _this.dispatch.call('stop', _this);
	        }
	    });
	};

	Draggable.prototype.on = function(eventName, callback) {
	    this.dispatch.on(eventName, callback);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Droppable(options) {
	    Interaction.call(this, options);
	    options = options || {};
	    this.dispatch = d3.dispatch('drop');
	    this.accept = options.accept || '*';
	    this.classes = options.classes || {
	        "ui-droppable-active": "ui-state-active",
	        "ui-droppable-hover": "ui-state-hover"
	    };
	}

	Droppable.prototype = Object.create(Interaction.prototype);
	Droppable.prototype.constructor = Droppable;

	Droppable.prototype.apply = function(control) {
	    this.target = control instanceof Control ? control.el : control;
	    $(this.target).droppable();

	    var _this = this;
	    $(this.target).droppable({
	        accept: this.accept,
	        classes: this.classes,
	        drop: function(event, ui) {
	            _this.dispatch.call('drop', _this, event, ui);
	        }
	    });
	};

	Droppable.prototype.on = function(eventName, callback) {
	    this.dispatch.on(eventName, callback);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Resizable(options) {
	    Interaction.call(this, options);
	    options = options || {};
	    this.animate = options.animate || true;
	    this.helper = options.helper || 'ui-resizable-helper';

	    UiHelper.addCssRule('.ui-resizable-helper', ' border: 2px dotted #00F; ');
	}

	Resizable.prototype = Object.create(Interaction.prototype);
	Resizable.prototype.constructor = Resizable;

	Resizable.prototype.apply = function(control) {
	    this.target = control instanceof Control ? control.el : control;
	    $(this.target).resizable({
	        animate: this.animate,
	        helper: this.helper
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Selectable(options) {
	    Interaction.call(this, options);
	    options = options || {};
	    UiHelper.addCssRule('.ui-selecting', ' background: #FECA40; ');
	    UiHelper.addCssRule('.ui-selected', ' background: #F39814; color: white; ');
	}

	Selectable.prototype = Object.create(Interaction.prototype);
	Selectable.prototype.constructor = Selectable;

	Selectable.prototype.apply = function(control) {
	    this.target = control instanceof Control ? control.el : control;
	    $(this.target).selectable();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Sortable(options) {
	    Interaction.call(this, options);
	    options = options || {};
	}

	Sortable.prototype = Object.create(Interaction.prototype);
	Sortable.prototype.constructor = Sortable;

	Sortable.prototype.apply = function(control) {
	    this.target = control instanceof Control ? control.el : control;
	    $(this.target).sortable();
	    $(this.target).disableSelection();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function BorderLayout(options) {
	    Layout.call(this, options);
	    options = options || {};
	}

	BorderLayout.prototype = Object.create(Layout.prototype);
	BorderLayout.prototype.constructor = BorderLayout;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function CenterLayout(options) {
	    Layout.call(this, options);
	    options = options || {};
	}

	CenterLayout.prototype = Object.create(Layout.prototype);
	CenterLayout.prototype.constructor = CenterLayout;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function FormLayout(options) {
	    Layout.call(this, options);
	    options = options || {};
	}

	FormLayout.prototype = Object.create(Layout.prototype);
	FormLayout.prototype.constructor = FormLayout;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function HBoxLayout(options) {
	    Layout.call(this, options);
	    options = options || {};
	}

	HBoxLayout.prototype = Object.create(Layout.prototype);
	HBoxLayout.prototype.constructor = HBoxLayout;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function TableLayout(options) {
	    Layout.call(this, options);
	    options = options || {};
	}

	TableLayout.prototype = Object.create(Layout.prototype);
	TableLayout.prototype.constructor = TableLayout;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function VBoxLayout(options) {
	    Layout.call(this, options);
	    options = options || {};
	}

	VBoxLayout.prototype = Object.create(Layout.prototype);
	VBoxLayout.prototype.constructor = VBoxLayout;

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
	    var _this = this;
	    this.children.forEach(function(n) {
	        n.parent = _this.el;
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
	    var _this = this;
	    this.children.forEach(function(n) {
	        n.parent = _this.el;
	        n.render.call(n);
	    });
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

	/**
	 * Create an EventManager to manage custom events.
	 * Before you call or listen an custom event, you should
	 * add the eventName to the `CustomEvents` array in the
	 * `../constant.js` file.
	 */
	function EventManager(options) {
	    options = options || {};
	    this.app = options.app || null;
	    this.dispatch = d3.dispatch.apply(d3, CustomEvents);
	}

	/**
	 * Call a custom event.
	 * @params eventName, scope, arg1, arg2, arg3, ...
	 */
	EventManager.prototype.call = function(eventName) {
	    //if (this.app && this.app.debug) {
	    //    this.app.debug('Event `' + eventName + '` is called.');
	    //}
	    this.dispatch.call.apply(this.dispatch, arguments);
	};

	/**
	 * Listen on a custom event.
	 */
	EventManager.prototype.on = function(eventName, callback) {
	    this.dispatch.on(eventName, callback);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function EditorNavMenu(options) {
	    Menu.call(this, options);
	    options = options || {};
	    this.app = options.app || null;
	    this.cls = 'main-menu';
	    this.direction = 'horizontal';
	    this.children = options.children || [];
	    var _this = this;
	    NavMenus.forEach(function(n) {
	        var item = new MenuItem({
	            id: n.id,
	            text: n.text,
	            children: []
	        });
	        if (n.children) {
	            n.children.forEach(function(m) {
	                var subitem = new MenuItem({
	                    id: m.id,
	                    text: m.text
	                });
	                item.children.push(subitem);
	            });
	        }
	        _this.children.push(item);
	    });
	}

	EditorNavMenu.prototype = Object.create(Menu.prototype);
	EditorNavMenu.prototype.constructor = EditorNavMenu;

	EditorNavMenu.prototype.render = function() {
	    Menu.prototype.render.apply(this, arguments);
	    var _this = this;
	    this.on('select', function(event, ui) {
	        var id = ui.item[0].id;
	        this.app.event.call(id);
	        _this.collapseAll();
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function EditorNav(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.app = options.app || null;
	    this.cls = options.cls || 'nav';
	    this.menu = new EditorNavMenu({
	        app: this.app
	    });
	    this.app.navMenu = this.menu;
	}

	EditorNav.prototype = Object.create(Control.prototype);
	EditorNav.prototype.constructor = EditorNav;

	EditorNav.prototype.render = function() {
	    this.el.div = document.createElement('div');
	    this.el.div.className = this.cls;
	    this.parent.appendChild(this.el.div);

	    this.menu.parent = this.el.div;
	    this.menu.render();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Scene(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.app = options.app || null;
	    this.name = options.name || 'Scene';
	    this.width = options.width || '900px';
	    this.height = options.height || '500px';
	    this.app.sceneWidth = this.width;
	    this.app.sceneHeight = this.height;
	}

	Scene.prototype = Object.create(Control.prototype);
	Scene.prototype.constructor = Scene;

	Scene.prototype.getName = function() {
	    return this.name;
	};

	Scene.prototype.setName = function(name) {
	    this.name = name;
	};

	Scene.prototype.start = function() {

	};

	Scene.prototype.pause = function() {

	};

	Scene.prototype.stop = function() {

	};

	Scene.prototype.save = function() {

	};

	Scene.prototype.load = function() {

	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function GlControl(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.app = options.app || null;
	}

	GlControl.prototype = Object.create(Control.prototype);
	GlControl.prototype.constructor = GlControl;

	/**
	 * Show this GlControl.
	 */
	GlControl.prototype.show = function() {

	};

	/**
	 * Hide this GlControl.
	 */
	GlControl.prototype.hide = function() {

	};

	/*
	 * Called when GlScene render its elements.
	 */
	GlControl.prototype.render = function() {

	};

	/**
	 * Called after the webgl program has started and before the first animation frame.
	 */
	GlControl.prototype.start = function() {

	};

	/**
	 * Called before each animation frame.
	 */
	GlControl.prototype.beforeUpdate = function() {

	};

	/**
	 * Called when to do some animation.
	 */
	GlControl.prototype.animate = function() {

	};

	/**
	 * Called after each animation frame.
	 */
	GlControl.prototype.update = function() {

	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function GlGUI(options) {
	    GlControl.call(this, options);
	    options = options || {};
	    this.gui = new dat.GUI({
	        autoPlace: false
	    });
	    this.app.gui = this.gui;
	    this.parent.appendChild(this.gui.domElement);
	    this.gui.domElement.style.position = 'absolute';
	    this.gui.domElement.style.top = '0';
	    this.gui.domElement.style.right = '0';
	    this.controls = new function() {
	        this.transform = 'translate';
	    };
	}

	GlGUI.prototype = Object.create(GlControl.prototype);
	GlGUI.prototype.constructor = GlGUI;

	GlGUI.prototype.start = function() {
	    var _this = this;
	    this.controlFolder = this.gui.addFolder('control');
	    this.controlFolder.open();
	    this.controlFolder.add(this.controls, 'transform', ['translate', 'rotate', 'scale'])
	        .onChange(function(value) {
	            _this.app.event.call(value + 'Object');
	        });
	    this.app.gui.controlFolder = this.controlFolder;
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function GlOrbitControls(options) {
	    GlControl.call(this, options);
	    options = options || {};
	    this.controls = new THREE.OrbitControls(this.app.camera, this.app.renderer.domElement);
	    this.controls.maxPolarAngle = Math.PI * 0.5;
	    this.app.orbit = this.controls;
	}

	GlOrbitControls.prototype = Object.create(GlControl.prototype);
	GlOrbitControls.prototype.constructor = GlOrbitControls;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function GlStats(options) {
	    GlControl.call(this, options);
	    options = options || {};
	    this.stats = new Stats();
	    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
	    this.app.stats = this.stats;
	}

	GlStats.prototype = Object.create(GlControl.prototype);
	GlStats.prototype.constructor = GlStats;

	GlStats.prototype.start = function() {
	    this.stats.dom.style.position = 'absolute';
	    this.parent.appendChild(this.stats.dom);
	};

	GlStats.prototype.beforeUpdate = function() {
	    this.stats.begin();
	};

	GlStats.prototype.update = function() {
	    this.stats.end();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function GlTransformControls(options) {
	    GlControl.call(this, options);
	    options = options || {};

	    this.camera = this.app.camera;
	    this.renderer = this.app.renderer;
	    this.controls = new THREE.TransformControls(this.camera, this.renderer.domElement);
	    this.app.transformControls = this.controls;

	    this.raycaster = new THREE.Raycaster();
	    this.mouse = new THREE.Vector2();
	}

	GlTransformControls.prototype = Object.create(GlControl.prototype);
	GlTransformControls.prototype.constructor = GlTransformControls;

	GlTransformControls.prototype.start = function() {
	    var _this = this;
	    this.app.scene.add(this.controls);
	    this.app.glEvent.on('click.transformControl', function() {
	        _this.onMouseClick.call(_this, d3.event);
	    });
	    this.app.glEvent.on('dblclick.transformControl', function() {
	        _this.controls.detach();
	    });
	    this.app.event.on('translateObject', function() {
	        _this.controls.setMode('translate');
	    });
	    this.app.event.on('rotateObject', function() {
	        _this.controls.setMode('rotate');
	    });
	    this.app.event.on('scaleObject', function() {
	        _this.controls.setMode('scale');
	    });
	};

	GlTransformControls.prototype.onMouseClick = function(event) {
	    this.mouse.x = (event.offsetX / this.app.sceneWidth) * 2 - 1;
	    this.mouse.y = -(event.offsetY / this.app.sceneHeight) * 2 + 1;
	    this.raycaster.setFromCamera(this.mouse, this.app.camera);
	    var _this = this;
	    var intersect = this.raycaster.intersectObjects(this.app.scene.children)
	        .filter(function(o) {
	            return o.object != _this.app.gridHelper;
	        })[0];
	    if (intersect) {
	        this.controls.attach(intersect.object);
	    }
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function GlGridHelper(options) {
	    GlControl.call(this, options);
	    options = options || {};
	    this.gridHelper = new THREE.GridHelper(500, 50);
	    this.scene = this.app.scene;
	    this.app.gridHelper = this.gridHelper;
	}

	GlGridHelper.prototype = Object.create(GlControl.prototype);
	GlGridHelper.prototype.constructor = GlGridHelper;

	GlGridHelper.prototype.start = function() {
	    this.scene.add(this.gridHelper);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function GlLight(options) {
	    GlControl.call(this, options);
	    options = options || {};

	    this.ambientLight = new THREE.AmbientLight(
	        new THREE.Color(0xffffff),
	        0.2
	    );
	    this.app.ambientLight = this.ambientLight;

	    this.directionalLight = new THREE.DirectionalLight(
	        new THREE.Color(0xffffff),
	        0.8
	    );
	    this.directionalLight.position.set(30, 40, 50);
	    this.directionalLight.lookAt(new THREE.Vector3());
	    this.app.directionalLight = this.directionalLight;

	    this.directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight);
	}

	GlLight.prototype = Object.create(GlControl.prototype);
	GlLight.prototype.constructor = GlLight;

	GlLight.prototype.start = function() {
	    this.app.scene.add(this.ambientLight);
	    this.app.scene.add(this.directionalLight);
	    this.app.scene.add(this.directionalLightHelper);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function GlAxisHelper(options) {
	    GlControl.call(this, options);
	    options = options || {};
	    this.axisHelper = new THREE.AxesHelper();
	    this.axisHelper.position.set(0, 1, 0);
	    this.app.axisHelper = this.axisHelper;
	}

	GlAxisHelper.prototype = Object.create(GlControl.prototype);
	GlAxisHelper.prototype.constructor = GlAxisHelper;

	GlAxisHelper.prototype.start = function() {
	    this.app.scene.add(this.axisHelper);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function GlHoverObject(options) {
	    GlControl.call(this, options);
	    options = options || {};
	    this.raycaster = new THREE.Raycaster();
	    this.mouse = new THREE.Vector2();
	}

	GlHoverObject.prototype = Object.create(GlControl.prototype);
	GlHoverObject.prototype.constructor = GlHoverObject;

	GlHoverObject.prototype.start = function() {
	    var _this = this;
	    this.app.glEvent.on('mousemove.hoverObject', function() {
	        _this.onMouseMove.call(_this, d3.event);
	    });
	};

	GlHoverObject.prototype.onMouseMove = function(event) {
	    this.mouse.x = (event.offsetX / this.app.sceneWidth) * 2 - 1;
	    this.mouse.y = -(event.offsetY / this.app.sceneHeight) * 2 + 1;
	    this.raycaster.setFromCamera(this.mouse, this.app.camera);
	    var _this = this;
	    this.app.scene.children.forEach(function(n) {
	        if (n == _this.app.gridHelper) {
	            return true;
	        }
	        if (n instanceof THREE.Mesh &&
	            n.material.oldOpacity != null &&
	            n.material.opacity != n.material.oldOpacity) {
	            n.material.transparent = n.material.oldTransparent;
	            n.material.opacity = n.material.oldOpacity;
	            n.material.needsUpdate = true;
	        }
	    });
	    this.raycaster.intersectObjects(this.app.scene.children)
	        .filter(function(o) {
	            return o.object instanceof THREE.Mesh &&
	                o.object != _this.app.gridHelper;
	        }).forEach(function(n) {
	            if (n.object.material.oldOpacity == null ||
	                n.object.material.opacity == n.object.material.oldOpacity) {
	                n.object.material.oldTransparent = n.object.material.transparent;
	                n.object.material.oldOpacity = n.object.material.opacity;
	                n.object.material.opacity = 0.5;
	                n.object.material.transparent = true;
	                n.object.material.needsUpdate = true;
	                _this.app.event.call('hoverObject', _this, n);
	            }
	        });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function GlSelectObject(options) {
	    GlControl.call(this, options);
	    options = options || {};
	    this.raycaster = new THREE.Raycaster();
	    this.mouse = new THREE.Vector2();
	}

	GlSelectObject.prototype = Object.create(GlControl.prototype);
	GlSelectObject.prototype.constructor = GlSelectObject;

	GlSelectObject.prototype.start = function() {
	    var _this = this;
	    this.app.glEvent.on('click.selectObject', function() {
	        _this.onClick.call(_this, d3.event);
	    });
	    this.app.glEvent.on('dblclick.selectObject', function() {
	        _this.onDblClick.call(_this, d3.event);
	    });
	};

	GlSelectObject.prototype.onClick = function() {
	    this.mouse.x = (event.offsetX / this.app.sceneWidth) * 2 - 1;
	    this.mouse.y = -(event.offsetY / this.app.sceneHeight) * 2 + 1;
	    this.raycaster.setFromCamera(this.mouse, this.app.camera);
	    var _this = this;
	    this.raycaster.intersectObjects(this.app.scene.children)
	        .filter(function(o) {
	            return o.object instanceof THREE.Mesh &&
	                o.object != _this.app.gridHelper;
	        }).forEach(function(n) {
	            if (n.object.material.oldColor == null ||
	                n.object.material.color.getHex() == n.object.material.oldColor.getHex()) {
	                // unselect object first
	                _this.unselectObject.call(_this);

	                // select new object
	                n.object.material.oldColor = n.object.material.color;
	                n.object.material.color = new THREE.Color(0xffff00);
	                n.object.material.needsUpdate = true;
	                _this.app.selected = n.object;
	                _this.app.event.call('selectObject', _this, n);
	            }
	        });
	};

	GlSelectObject.prototype.unselectObject = function() {
	    if (this.app.selected) {
	        this.app.selected.material.color = this.app.selected.material.oldColor;
	        this.app.selected.material.needsUpdate = true;
	        this.app.event.call('unselectObject', this);
	        this.app.selected = null;
	    }
	};

	GlSelectObject.prototype.onDblClick = function() {
	    this.mouse.x = (event.offsetX / this.app.sceneWidth) * 2 - 1;
	    this.mouse.y = -(event.offsetY / this.app.sceneHeight) * 2 + 1;
	    this.raycaster.setFromCamera(this.mouse, this.app.camera);
	    var _this = this;
	    this.app.scene.children.forEach(function(n) {
	        if (n == _this.app.gridHelper) {
	            return true;
	        }
	        if (n instanceof THREE.Mesh &&
	            n.material.oldColor != null &&
	            n.material.color.getHex() != n.material.oldColor.getHex()) {
	            n.material.color = n.material.oldColor;
	            n.material.needsUpdate = true;
	        }
	    });
	    this.app.selected = null;
	    this.app.event.call('unselectObject', this);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function GlScene(options) {
	    Scene.call(this, options);
	    options = options || {};
	    this.name = options.name || 'WebGLScene';

	    this.scene = options.scene || new THREE.Scene();
	    this.app.scene = this.scene;

	    this.camera = options.camera || new THREE.PerspectiveCamera(
	        75,
	        this.width / this.height,
	        0.1,
	        1000);
	    this.camera.position.set(10, 10, 10);
	    this.camera.lookAt(0, 0, 0);
	    this.app.camera = this.camera;

	    this.renderer = options.renderer || new THREE.WebGLRenderer({
	        alpha: true,
	        antialias: true,
	    });
	    this.renderer.setSize(this.width, this.height);
	    this.app.renderer = this.renderer;

	    this.clock = new THREE.Clock();

	    this.dispatch = d3.select(this.renderer.domElement);
	    this.app.glEvent = this.dispatch;

	    this.children = [
	        new GlGridHelper({ app: this.app, parent: this.parent }),
	        new GlAxisHelper({ app: this.app, parent: this.parent }),
	        new GlGUI({ app: this.app, parent: this.parent }),
	        new GlOrbitControls({ app: this.app, parent: this.parent }),
	        new GlStats({ app: this.app, parent: this.parent }),
	        new GlTransformControls({ app: this.app, parent: this.parent }),
	        new GlSelectObject({ app: this.app, parent: this.parent }),
	        new GlLight({ app: this.app, parent: this.parent }),
	        new GlHoverObject({ app: this.app, parent: this.parent }),
	    ];
	}

	GlScene.prototype = Object.create(Scene.prototype);
	GlScene.prototype.constructor = GlScene;

	GlScene.prototype.render = function() {
	    this.children.forEach(function(n) {
	        n.render.call(n);
	    });
	};

	GlScene.prototype.start = function() {
	    this.parent.appendChild(this.renderer.domElement);
	    this.children.forEach(function(n) {
	        n.start.call(n);
	    });
	    this.animate();
	};

	GlScene.prototype.animate = function() {
	    this.children.forEach(function(n) {
	        n.beforeUpdate.call(n);
	    });
	    this.app.event.call('beforeAnimate', this, this.clock);
	    this.children.forEach(function(n) {
	        n.animate.call(n);
	    });
	    this.app.event.call('onAnimate', this, this.clock);
	    this.renderer.render(this.scene, this.camera);
	    this.children.forEach(function(n) {
	        n.update.call(n);
	    });
	    var _this = this;
	    requestAnimationFrame(function() {
	        _this.animate.call(_this);
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function LogScene(options) {
	    Scene.call(this, options);
	    options = options || {};
	    this.app = options.app || {};
	}

	LogScene.prototype = Object.create(Scene.prototype);
	LogScene.prototype.constructor = LogScene;

	LogScene.prototype.render = function() {
	    this.el.div = document.createElement('div');
	    this.el.div.style.width = this.width + 'px';
	    this.el.div.style.height = this.height + 'px';
	    this.parent.appendChild(this.el.div);
	    var _this = this;
	    this.app.log = function(html) {
	        _this.log.call(_this, html);
	    };
	    this.app.debug = function(html) {
	        _this.debug.call(_this, html);
	    };
	    this.app.warn = function(html) {
	        _this.warn.call(_this, html);
	    };
	    this.app.error = function(html) {
	        _this.error.call(_this, html);
	    };
	};

	LogScene.prototype.start = function() {
	    this.log('Welcome to use OpenSeaAI.');
	    this.log('source: https://github.com/tengge1/OpenSeaAI');
	};

	LogScene.prototype.log = function(html) {
	    var span = document.createElement('span');
	    span.style.color = 'white';
	    span.innerHTML = html + '<br />';
	    this.el.div.appendChild(span);
	};

	LogScene.prototype.debug = function(html) {
	    var span = document.createElement('span');
	    span.style.color = '#aaa';
	    span.innerHTML = html + '<br />';
	    this.el.div.appendChild(span);
	};

	LogScene.prototype.warn = function(html) {
	    var span = document.createElement('span');
	    span.style.color = 'pink';
	    span.innerHTML = html + '<br />';
	    this.el.div.appendChild(span);
	};

	LogScene.prototype.error = function(html) {
	    var span = document.createElement('span');
	    span.style.color = 'red';
	    span.innerHTML = html + '<br />';
	    this.el.div.appendChild(span);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function EditorMainPanel(options) {
	    TabPanel.call(this, options);
	    options = options || {};
	    this.app = options.app || null;

	    this.sceneTab = new TabItem({
	        id: 'sceneTab',
	        title: 'Scene',
	        children: [

	        ]
	    });
	    this.app.sceneTab = this.sceneTab;

	    this.logTab = new TabItem({
	        id: 'logTab',
	        title: 'Logs',
	        children: [

	        ]
	    });
	    this.app.logTab = this.logTab;

	    this.children = options.children || [
	        this.sceneTab,
	        this.logTab,
	    ];
	    this.cls = 'left-panel';
	    this.fit = true;
	}

	EditorMainPanel.prototype = Object.create(TabPanel.prototype);
	EditorMainPanel.prototype.constructor = EditorMainPanel;

	EditorMainPanel.prototype.render = function() {
	    var _this = this;
	    this.on('create', function(event, ui) {
	        _this.onCreateTabs.call(_this, event, ui);
	    });
	    this.on('activate', function(event, ui) {
	        _this.onActivateTab.call(_this, event, ui);
	    });
	    this.on('close', function(tabitem) {
	        _this.onCloseTab.call(_this, tabitem);
	    });
	    TabPanel.prototype.render.apply(this, arguments);
	};

	EditorMainPanel.prototype.onCreateTabs = function(event, ui) {
	    this.glScene = new GlScene({
	        app: this.app,
	        parent: this.sceneTab.el.div,
	        width: ui.panel[0].clientWidth,
	        height: ui.panel[0].clientHeight,
	    });
	    this.app.glScene = this.glScene;
	    this.sceneTab.add(this.glScene);
	    this.glScene.start();

	    this.logScene = new LogScene({
	        app: this.app,
	        parent: this.logTab.el.div,
	        width: ui.panel[0].clientWidth,
	        height: ui.panel[0].clientHeight,
	    });
	    this.app.logScene = this.logScene;
	    this.logTab.add(this.logScene);
	    this.logScene.start();
	};

	EditorMainPanel.prototype.onActivateTab = function(event, ui) {

	};

	EditorMainPanel.prototype.onCloseTab = function(tabitem) {

	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function NumberField(options) {
	    TextField.call(this, options);
	    this.type = 'number';
	}

	NumberField.prototype = Object.create(TextField.prototype);
	NumberField.prototype.constructor = NumberField;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function EditorSettings(options) {
	    Control.call(this, options);
	    this.enableFog = new CheckboxField({
	        parent: this.parent,
	        label: 'enable'
	    });
	    this.fogColor = new ColorField({
	        parent: this.parent,
	        label: 'color',
	        value: '#555555'
	    });
	    this.fogNear = new NumberField({
	        parent: this.parent,
	        label: 'near',
	        value: 0.1
	    });
	    this.fogFar = new NumberField({
	        parent: this.parent,
	        label: 'far',
	        value: 100
	    });
	    this.label = options.label || null;
	    this.children = [
	        new Fieldset({
	            title: 'Fog',
	            children: [
	                this.enableFog,
	                this.fogColor,
	                this.fogNear,
	                this.fogFar
	            ]
	        })
	    ];
	}

	EditorSettings.prototype = Object.create(Control.prototype);
	EditorSettings.prototype.constructor = EditorSettings;

	EditorSettings.prototype.render = function() {
	    if (this.label) {
	        this.el.label = document.createElement('label');
	        this.el.label.innerHTML = this.label;
	        this.parent.appendChild(this.el.label);
	    }
	    var _this = this;
	    this.children.forEach(function(n, i) {
	        n.parent = _this.parent;
	        n.render.call(n);
	    });
	    this.enableFog.on('change', function(value) {
	        _this.onEnableFogChange(value);
	    });
	    this.fogColor.on('change', function(value) {
	        _this.onFogColorChange(value);
	    });
	    this.fogNear.on('change', function(value) {
	        _this.onFogNearChange(value);
	    });
	    this.fogFar.on('change', function(value) {
	        _this.onFogFarChange(value);
	    });
	};

	EditorSettings.prototype.onEnableFogChange = function(value) {
	    if (value == true) {
	        app.scene.fog = new THREE.Fog(
	            parseInt(this.fogColor.getValue().replace('#', ''), 16),
	            this.fogNear.getValue(),
	            this.fogFar.getValue()
	        );
	    } else {
	        app.scene.fog = null;
	    }
	};

	EditorSettings.prototype.onFogColorChange = function(value) {
	    if (app.scene.fog) {
	        app.scene.fog.color = new THREE.Color(parseInt(value.replace('#', ''), 16));
	    }
	};

	EditorSettings.prototype.onFogNearChange = function(value) {
	    if (app.scene.fog) {
	        app.scene.fog.near = value;
	    }
	};

	EditorSettings.prototype.onFogFarChange = function(value) {
	    if (app.scene.fog) {
	        app.scene.fog.far = value;
	    }
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function RangeField(options) {
	    TextField.call(this, options);
	    this.type = 'range';
	}

	RangeField.prototype = Object.create(TextField.prototype);
	RangeField.prototype.constructor = RangeField;

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function BaseProperty(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.app = options.app || null;
	    this.obj = options.obj || null;
	    this.parent = options.parent || null;

	    this.properties = [];
	    // for examples, 
	    // [{ 
	    //   name: 'groupName',
	    //   children: [{
	    //       name: 'propertyName',
	    //       type: 'text'
	    //   }]
	    // }]
	    // type can be html5 input types, such as text, number, date, color, ...
	}

	BaseProperty.prototype = Object.create(Control.prototype);
	BaseProperty.prototype.constructor = BaseProperty;

	// Test whether obj has this property.
	BaseProperty.prototype.filter = function() {
	    return false;
	};

	BaseProperty.prototype.render = function() {
	    var _this = this;
	    this.properties.forEach(function(n) {
	        var fieldset = new Fieldset({
	            parent: _this.parent,
	            title: n.name
	        });
	        fieldset.render();
	        n.children.forEach(function(m) {
	            var input;
	            switch (m.type) {
	                case 'text':
	                    input = new TextField({
	                        label: m.name
	                    });
	                    break;
	                case 'number':
	                    input = new NumberField({
	                        label: m.name
	                    });
	                    break;
	                default:
	                    _this.app.warn('BaseProperty: property type ' + m.type + ' is not defined.');
	                    break;
	            }
	            if (input) {
	                fieldset.add(input);
	            }
	        });
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Object3DProperty(options) {
	    BaseProperty.call(this, options);
	    this.properties = [{
	        name: 'position',
	        children: [{
	            name: 'x',
	            type: 'number'
	        }, {
	            name: 'y',
	            type: 'number'
	        }, {
	            name: 'z',
	            type: 'number'
	        }]
	    }, {
	        name: 'rotation',
	        children: [{
	            name: 'x',
	            type: 'number'
	        }, {
	            name: 'y',
	            type: 'number'
	        }, {
	            name: 'z',
	            type: 'number'
	        }]
	    }, {
	        name: 'scale',
	        children: [{
	            name: 'x',
	            type: 'number'
	        }, {
	            name: 'y',
	            type: 'number'
	        }, {
	            name: 'z',
	            type: 'number'
	        }]
	    }];
	}

	Object3DProperty.prototype = Object.create(BaseProperty.prototype);
	Object3DProperty.prototype.constructor = Object3DProperty;

	Object3DProperty.prototype.filter = function() {
	    return this.obj instanceof THREE.Object3D;
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function PropertyPanel(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.app = options.app || null;
	    this.children = [
	        new Object3DProperty({ app: this.app })
	    ];
	}

	PropertyPanel.prototype = Object.create(Control.prototype);
	PropertyPanel.prototype.constructor = PropertyPanel;

	PropertyPanel.prototype.render = function() {
	    var _this = this;
	    this.app.event.on('selectObject', function(n) {
	        _this.onSelectObject.call(_this, n.object);
	    });
	    this.app.event.on('unselectObject', function(n) {
	        _this.onUnselectObject.call(_this);
	    });
	};

	PropertyPanel.prototype.onSelectObject = function(obj) {
	    var _this = this;
	    $(this.parent).empty();
	    this.children.forEach(function(n) {
	        n.app = _this.app;
	        n.obj = _this.obj;
	        n.parent = _this.parent;
	        n.render.call(n);
	    });
	};

	PropertyPanel.prototype.onUnselectObject = function(obj) {
	    $(this.parent).empty();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function EditorPropertyPanel(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.app = options.app || null;
	    this.cls = 'right-panel ui-widget-content';

	    this.hierarchyPanel = new Tree({
	        data: [{
	            name: 'Camera'
	        }, {
	            name: 'Light'
	        }]
	    });
	    this.app.hierarchyPanel = this.hierarchyPanel;

	    this.editorSettingsPanel = new EditorSettings({ app: this.app });
	    this.app.editorSettingsPanel = this.editorSettingsPanel;

	    this.topPanel = new TabPanel({
	        fit: true,
	        children: [
	            new TabItem({
	                title: 'Hierarchy',
	                overflow: 'scroll',
	                children: [
	                    this.hierarchyPanel
	                ]
	            }),
	            new TabItem({
	                title: 'Settings',
	                overflow: 'scroll',
	                children: [
	                    this.editorSettingsPanel
	                ]
	            }),
	        ]
	    });

	    this.propertyPanel = new PropertyPanel({ app: this.app });

	    this.bottomPanel = new TabPanel({
	        fit: true,
	        children: [
	            new TabItem({
	                title: 'Property',
	                overflow: 'scroll',
	                children: [this.propertyPanel]
	            }),
	            new TabItem({
	                title: 'Animation',
	                overflow: 'scroll',
	                html: 'content 2'
	            }),
	        ]
	    });

	    this.app.topPanel = this.topPanel;
	    this.app.bottomPanel = this.bottomPanel;
	}

	EditorPropertyPanel.prototype = Object.create(Control.prototype);
	EditorPropertyPanel.prototype.constructor = EditorPropertyPanel;

	EditorPropertyPanel.prototype.render = function() {
	    this.el.div = document.createElement('div');
	    this.el.div.className = this.cls;
	    this.parent.appendChild(this.el.div);

	    this.el.topDiv = document.createElement('div');
	    this.el.topDiv.style.height = '50%';
	    this.el.div.appendChild(this.el.topDiv);

	    this.el.bottomDiv = document.createElement('div');
	    this.el.bottomDiv.style.height = '50%';
	    this.el.div.appendChild(this.el.bottomDiv);

	    this.topPanel.parent = this.el.topDiv;
	    this.topPanel.render();

	    this.bottomPanel.parent = this.el.bottomDiv;
	    this.bottomPanel.render();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function EditorBox(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.app = options.app || null;
	    this.cls = options.cls || 'box';
	    this.mainPanel = options.mainPanel || new EditorMainPanel({
	        app: this.app
	    });
	    this.propertyPanel = options.propertyPanel || new EditorPropertyPanel({
	        app: this.app
	    });
	    this.app.mainPanel = this.mainPanel;
	    this.app.propertyPanel = this.propertyPanel;
	}

	EditorBox.prototype = Object.create(Control.prototype);
	EditorBox.prototype.constructor = EditorBox;

	EditorBox.prototype.render = function() {
	    this.el.div = document.createElement('div');
	    this.el.div.className = this.cls;
	    this.parent.appendChild(this.el.div);
	    this.mainPanel.parent = this.el.div;
	    this.mainPanel.render();
	    this.propertyPanel.parent = this.el.div;
	    this.propertyPanel.render();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function EditorUI(options) {
	    Control.call(this, options);
	    options = options || {};
	    this.app = options.app || null;
	    this.nav = options.nav || new EditorNav({
	        app: this.app
	    });
	    this.box = options.box || new EditorBox({
	        app: this.app
	    });
	    this.app.nav = this.nav;
	    this.app.box = this.box;
	}

	EditorUI.prototype = Object.create(Control.prototype);
	EditorUI.prototype.constructor = EditorUI;

	EditorUI.prototype.render = function() {
	    this.nav.parent = this.parent;
	    this.box.parent = this.parent;
	    this.nav.render();
	    this.box.render();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function BaseCommand(options) {
	    options = options || {};
	    this.app = options.app || null;
	    this.enabled = options.enabled || true;
	}

	BaseCommand.prototype.enable = function() {
	    this.enabled = true;
	};

	BaseCommand.prototype.disable = function() {
	    this.enabled = false;
	};

	/**
	 * Run the command when hear the specific custom event.
	 */
	BaseCommand.prototype.init = function() {

	};

	BaseCommand.prototype.run = function() {

	};

	BaseCommand.prototype.undo = function() {

	};

	BaseCommand.prototype.redo = function() {

	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddBoxCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddBoxCommand.prototype = Object.create(BaseCommand.prototype);
	AddBoxCommand.prototype.constructor = AddBoxCommand;

	AddBoxCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addBox.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddBoxCommand.prototype.run = function() {
	    var geometry = new THREE.BoxBufferGeometry(5, 5, 5);
	    var material = new THREE.MeshPhongMaterial();
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddCircleCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddCircleCommand.prototype = Object.create(BaseCommand.prototype);
	AddCircleCommand.prototype.constructor = AddCircleCommand;

	AddCircleCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addCircle.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddCircleCommand.prototype.run = function() {
	    var geometry = new THREE.CircleBufferGeometry(5);
	    var material = new THREE.MeshPhongMaterial({
	        side: THREE.DoubleSide
	    });
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddConeCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddConeCommand.prototype = Object.create(BaseCommand.prototype);
	AddConeCommand.prototype.constructor = AddConeCommand;

	AddConeCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addCone.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddConeCommand.prototype.run = function() {
	    var geometry = new THREE.ConeBufferGeometry(5, 10);
	    var material = new THREE.MeshPhongMaterial();
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddCylinderCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddCylinderCommand.prototype = Object.create(BaseCommand.prototype);
	AddCylinderCommand.prototype.constructor = AddCylinderCommand;

	AddCylinderCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addCylinder.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddCylinderCommand.prototype.run = function() {
	    var geometry = new THREE.CylinderBufferGeometry(5, 5, 10);
	    var material = new THREE.MeshPhongMaterial();
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddDodecahedronCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddDodecahedronCommand.prototype = Object.create(BaseCommand.prototype);
	AddDodecahedronCommand.prototype.constructor = AddDodecahedronCommand;

	AddDodecahedronCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addDodecahedron.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddDodecahedronCommand.prototype.run = function() {
	    var geometry = new THREE.DodecahedronBufferGeometry(5);
	    var material = new THREE.MeshPhongMaterial();
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddExtrudeCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddExtrudeCommand.prototype = Object.create(BaseCommand.prototype);
	AddExtrudeCommand.prototype.constructor = AddExtrudeCommand;

	AddExtrudeCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addExtrude.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddExtrudeCommand.prototype.run = function() {
	    var length = 5,
	        width = 3;

	    var shape = new THREE.Shape();
	    shape.moveTo(0, 0);
	    shape.lineTo(0, width);
	    shape.lineTo(length, width);
	    shape.lineTo(length, 0);
	    shape.lineTo(0, 0);

	    var extrudeSettings = {
	        steps: 2,
	        amount: 6,
	        bevelEnabled: true,
	        bevelThickness: 1,
	        bevelSize: 1,
	        bevelSegments: 1
	    };

	    var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
	    var material = new THREE.MeshPhongMaterial();
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddIcosahedronCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddIcosahedronCommand.prototype = Object.create(BaseCommand.prototype);
	AddIcosahedronCommand.prototype.constructor = AddIcosahedronCommand;

	AddIcosahedronCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addIcosahedron.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddIcosahedronCommand.prototype.run = function() {
	    var geometry = new THREE.IcosahedronBufferGeometry(5);
	    var material = new THREE.MeshPhongMaterial();
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddLatheCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddLatheCommand.prototype = Object.create(BaseCommand.prototype);
	AddLatheCommand.prototype.constructor = AddLatheCommand;

	AddLatheCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addLathe.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddLatheCommand.prototype.run = function() {
	    var points = [];
	    for (var i = 0; i < 10; i++) {
	        points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
	    }
	    var geometry = new THREE.LatheBufferGeometry(points);
	    var material = new THREE.MeshPhongMaterial({
	        side: THREE.DoubleSide
	    });
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddOctahedronCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddOctahedronCommand.prototype = Object.create(BaseCommand.prototype);
	AddOctahedronCommand.prototype.constructor = AddOctahedronCommand;

	AddOctahedronCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addOctahedron.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddOctahedronCommand.prototype.run = function() {
	    var geometry = new THREE.OctahedronBufferGeometry(5);
	    var material = new THREE.MeshPhongMaterial();
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddParametricCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddParametricCommand.prototype = Object.create(BaseCommand.prototype);
	AddParametricCommand.prototype.constructor = AddParametricCommand;

	AddParametricCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addParametric.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddParametricCommand.prototype.run = function() {
	    var geometry = new THREE.ParametricBufferGeometry(THREE.ParametricGeometries.klein, 25, 25);
	    var material = new THREE.MeshPhongMaterial({
	        side: THREE.DoubleSide
	    });
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddPlaneCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddPlaneCommand.prototype = Object.create(BaseCommand.prototype);
	AddPlaneCommand.prototype.constructor = AddPlaneCommand;

	AddPlaneCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addPlane.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddPlaneCommand.prototype.run = function() {
	    var geometry = new THREE.PlaneBufferGeometry(10, 10);
	    var material = new THREE.MeshPhongMaterial({
	        side: THREE.DoubleSide
	    });
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddRingCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddRingCommand.prototype = Object.create(BaseCommand.prototype);
	AddRingCommand.prototype.constructor = AddRingCommand;

	AddRingCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addRing.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddRingCommand.prototype.run = function() {
	    var geometry = new THREE.RingBufferGeometry(5, 10);
	    var material = new THREE.MeshPhongMaterial({
	        side: THREE.DoubleSide
	    });
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddSphereCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddSphereCommand.prototype = Object.create(BaseCommand.prototype);
	AddSphereCommand.prototype.constructor = AddSphereCommand;

	AddSphereCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addSphere.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddSphereCommand.prototype.run = function() {
	    var geometry = new THREE.SphereBufferGeometry(5);
	    var material = new THREE.MeshPhongMaterial({
	        side: THREE.DoubleSide
	    });
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddTetrahedronCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddTetrahedronCommand.prototype = Object.create(BaseCommand.prototype);
	AddTetrahedronCommand.prototype.constructor = AddTetrahedronCommand;

	AddTetrahedronCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addTetrahedron.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddTetrahedronCommand.prototype.run = function() {
	    var geometry = new THREE.TetrahedronBufferGeometry(5);
	    var material = new THREE.MeshPhongMaterial();
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddTorusCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddTorusCommand.prototype = Object.create(BaseCommand.prototype);
	AddTorusCommand.prototype.constructor = AddTorusCommand;

	AddTorusCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addTorus.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddTorusCommand.prototype.run = function() {
	    var geometry = new THREE.TorusBufferGeometry(5, 2, 16, 100);
	    var material = new THREE.MeshPhongMaterial();
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddTorusKnotCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddTorusKnotCommand.prototype = Object.create(BaseCommand.prototype);
	AddTorusKnotCommand.prototype.constructor = AddTorusKnotCommand;

	AddTorusKnotCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addTorusKnot.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddTorusKnotCommand.prototype.run = function() {
	    var geometry = new THREE.TorusKnotBufferGeometry(5, 2, 100, 16);
	    var material = new THREE.MeshPhongMaterial();
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddTubeCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddTubeCommand.prototype = Object.create(BaseCommand.prototype);
	AddTubeCommand.prototype.constructor = AddTubeCommand;

	AddTubeCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addTube.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddTubeCommand.prototype.run = function() {

	    var curve = new THREE.CatmullRomCurve3([
	        new THREE.Vector3(-10, 0, 10),
	        new THREE.Vector3(-5, 5, 5),
	        new THREE.Vector3(0, 0, 0),
	        new THREE.Vector3(5, -5, 5),
	        new THREE.Vector3(10, 0, 10)
	    ]);

	    var geometry = new THREE.TubeBufferGeometry(curve, 20, 2, 8, false);
	    var material = new THREE.MeshPhongMaterial({
	        side: THREE.DoubleSide
	    });
	    var mesh = new THREE.Mesh(geometry, material);
	    this.app.scene.add(mesh);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddFireCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddFireCommand.prototype = Object.create(BaseCommand.prototype);
	AddFireCommand.prototype.constructor = AddFireCommand;

	AddFireCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addFire.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddFireCommand.prototype.run = function() {
	    var fireWidth = 2;
	    var fireHeight = 4;
	    var fireDepth = 2;
	    var sliceSpacing = 0.5;

	    this.fire = new VolumetricFire(
	        fireWidth,
	        fireHeight,
	        fireDepth,
	        sliceSpacing,
	        app.camera
	    );
	    this.app.scene.add(this.fire.mesh);
	    this.fire.mesh.position.set(0, fireHeight / 2, 0);

	    var _this = this;
	    this.app.event.on('onAnimate', function(clock) {
	        _this.onAnimate.call(_this, clock);
	    });
	};

	AddFireCommand.prototype.onAnimate = function(clock) {
	    var elapsed = clock.getElapsedTime();
	    this.fire.update(elapsed);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function DataView2(buffer) {
	    this.buffer = new DataView(buffer);
	    this.position = 0;
	}

	DataView2.prototype.getBool = function() {
	    var v = this.buffer.getUint8(this.position) != 0;
	    this.position += 1;
	    return v
	};

	DataView2.prototype.getUint8 = function() {
	    var v = this.buffer.getUint8(this.position);
	    this.position += 1;
	    return v
	};

	DataView2.prototype.getInt8 = function() {
	    var v = this.buffer.getInt8(this.position);
	    this.position += 1;
	    return v
	};

	DataView2.prototype.getUint16 = function() {
	    var v = this.buffer.getUint16(this.position, true);
	    this.position += 2;
	    return v
	};

	DataView2.prototype.getInt16 = function() {
	    var v = this.buffer.getInt16(this.position, true);
	    this.position += 2;
	    return v
	};

	DataView2.prototype.getUint32 = function() {
	    var v = this.buffer.getUint32(this.position, true);
	    this.position += 4;
	    return v
	};

	DataView2.prototype.getInt32 = function() {
	    var v = this.buffer.getInt32(this.position, true);
	    this.position += 4;
	    return v
	};

	DataView2.prototype.getFloat = function() {
	    var v = this.buffer.getFloat32(this.position, true);
	    this.position += 4;
	    return v
	};

	DataView2.prototype.getString = function(len) {
	    if (len === undefined) len = this.getUint16();
	    var str = "";
	    for (var i = 0; i < len; ++i) {
	        str += String.fromCharCode(this.getUint8());
	    }
	    return str
	};

	DataView2.prototype.setBool = function(v) {
	    this.buffer.setUint8(this.position, v ? 1 : 0);
	    this.position += 1;
	};

	DataView2.prototype.setUint8 = function(v) {
	    this.buffer.setUint8(this.position, v);
	    this.position += 1;
	};

	DataView2.prototype.setInt8 = function(v) {
	    this.buffer.setInt8(this.position, v);
	    this.position += 1;
	};

	DataView2.prototype.setUint16 = function(v) {
	    this.buffer.setUint16(this.position, v, true);
	    this.position += 2;
	};

	DataView2.prototype.setInt16 = function(v) {
	    this.buffer.setInt16(this.position, v, true);
	    this.position += 2;
	};

	DataView2.prototype.setUint32 = function(v) {
	    this.buffer.setUint32(this.position, v, true);
	    this.position += 4;
	};

	DataView2.prototype.setInt32 = function(v) {
	    this.buffer.setInt32(this.position, v, true);
	    this.position += 4;
	};

	DataView2.prototype.setFloat = function(v) {
	    this.buffer.setFloat32(this.position, v, true);
	    this.position += 4;
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Vertex(r) {
	    var self = this,
	        i;
	    self.position = [r.getFloat(), r.getFloat(), r.getFloat()];
	    self.normal = [r.getFloat(), r.getFloat(), r.getFloat(), 0];
	    self.u = r.getFloat();
	    self.v = r.getFloat();
	    self.bones = new Array(4);
	    for (i = 0; i < 4; ++i) {
	        self.bones[i] = r.getUint8();
	    }
	    self.weights = new Array(4);
	    for (i = 0; i < 4; ++i) {
	        self.weights[i] = r.getFloat();
	    }
	}

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Texture(model, url) {
	    var self = this;
	    self.model = model;
	    self.url = url;
	    self.texture = null;
	    self.load();
	}

	Texture.prototype.load = function() {
	    var self = this;

	    self.texture = new THREE.TextureLoader().load(self.url, function(texture) {
	        self.onLoad.call(self, texture);
	    });
	};

	Texture.prototype.onLoad = function(texture) {
	    var self = this;
	    texture.flipY = false;
	    self.model.material.uniforms.uHasTexture.value = 1;
	    self.model.material.uniforms.uTexture.value = texture;
	    self.model.material.needsUpdate = true;
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Bone(model, index, r) {
	    var self = this,
	        i;
	    self.model = model;
	    self.index = index;
	    self.name = r.getString().toLowerCase();
	    self.parent = r.getInt32();
	    self.scale = r.getFloat();
	    self.origMatrix = mat4.create();
	    for (i = 0; i < 16; ++i) self.origMatrix[i] = r.getFloat();
	    self.baseMatrix = mat4.clone(self.origMatrix);
	    mat4.transpose(self.baseMatrix, self.baseMatrix);
	    mat4.invert(self.baseMatrix, self.baseMatrix);
	    mat4.transpose(self.origMatrix, self.origMatrix);
	    self.incrMatrix = mat4.create();
	    if (model.version >= 2) {
	        for (i = 0; i < 16; ++i) self.incrMatrix[i] = r.getFloat();
	        mat4.transpose(self.incrMatrix, self.incrMatrix);
	    } else {
	        mat4.identity(self.incrMatrix);
	    }
	}

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	var HiddenBones = {
	    12: {
	        9: {
	            recall: {},
	            all: {
	                recall_chair: true
	            }
	        },
	        10: {
	            recall: {
	                cowbell: true,
	                stick: true
	            },
	            dancein: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            danceloop: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            all: {}
	        },
	        11: {
	            recall: {
	                cowbell: true,
	                stick: true
	            },
	            dancein: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            danceloop: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            all: {}
	        },
	        12: {
	            recall: {
	                cowbell: true,
	                stick: true
	            },
	            dancein: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            danceloop: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            all: {}
	        },
	        13: {
	            recall: {
	                cowbell: true,
	                stick: true
	            },
	            dancein: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            danceloop: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            all: {}
	        },
	        14: {
	            recall: {
	                cowbell: true,
	                stick: true
	            },
	            dancein: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            danceloop: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            all: {}
	        },
	        15: {
	            recall: {
	                cowbell: true,
	                stick: true
	            },
	            dancein: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            danceloop: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            all: {}
	        },
	        16: {
	            recall: {
	                cowbell: true,
	                stick: true
	            },
	            dancein: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            danceloop: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            all: {}
	        },
	        17: {
	            recall: {
	                cowbell: true,
	                stick: true
	            },
	            dancein: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            danceloop: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            all: {}
	        },
	        18: {
	            recall: {
	                cowbell: true,
	                stick: true
	            },
	            dancein: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            danceloop: {
	                cata_root: true,
	                catb_root: true,
	                catc_root: true,
	                cork: true,
	                bowl: true,
	                bowl_milk: true,
	                milk_root: true,
	                bottle: true
	            },
	            all: {}
	        }
	    },
	    21: {
	        9: {
	            all: {
	                orange: true
	            },
	            recall: {
	                l_weapon: true,
	                r_weapon: true
	            }
	        },
	        10: {
	            recall: {},
	            all: {
	                tv_joint: true,
	                tv_rabit_ears_joints: true
	            }
	        },
	        11: {
	            recall: {},
	            all: {
	                tv_joint: true,
	                tv_rabit_ears_joints: true
	            }
	        },
	        12: {
	            recall: {},
	            all: {
	                tv_joint: true,
	                tv_rabit_ears_joints: true
	            }
	        },
	        13: {
	            recall: {},
	            all: {
	                tv_joint: true,
	                tv_rabit_ears_joints: true
	            }
	        },
	        14: {
	            recall: {},
	            all: {
	                tv_joint: true,
	                tv_rabit_ears_joints: true
	            }
	        }
	    },
	    22: {
	        8: {
	            all: {
	                c_drone_base: true
	            },
	            joke: {},
	            dance: {}
	        }
	    },
	    36: {
	        9: {
	            all: {
	                recall_chair: true
	            },
	            recall: {}
	        }
	    },
	    41: {
	        0: {
	            all: {
	                orange1: true,
	                orange2: true,
	                orange3: true
	            },
	            joke: {}
	        },
	        1: {
	            all: {
	                orange1: true,
	                orange2: true,
	                orange3: true
	            },
	            joke: {}
	        },
	        2: {
	            all: {
	                orange1: true,
	                orange2: true,
	                orange3: true
	            },
	            joke: {}
	        },
	        3: {
	            all: {
	                orange1: true,
	                orange2: true,
	                orange3: true
	            },
	            joke: {}
	        },
	        4: {
	            all: {
	                orange1: true,
	                orange2: true,
	                orange3: true
	            },
	            joke: {}
	        },
	        5: {
	            all: {
	                orange1: true,
	                orange2: true,
	                orange3: true
	            },
	            joke: {}
	        },
	        6: {
	            all: {
	                orange1: true,
	                orange2: true,
	                orange3: true
	            },
	            joke: {}
	        },
	        7: {
	            all: {
	                orange1: true,
	                orange2: true,
	                orange3: true
	            },
	            joke: {}
	        }
	    },
	    44: {
	        4: {
	            all: {
	                jacket: true
	            },
	            dance: {
	                jacket: true,
	                weapon: true
	            },
	            recall: {
	                weapon: true
	            }
	        }
	    },
	    55: {
	        7: {
	            recall: {},
	            all: {
	                xmas_pole_skin07: true
	            }
	        }
	    },
	    61: {
	        7: {
	            recall: {},
	            all: {
	                planet1: true,
	                planet2: true,
	                planet3: true,
	                planet4: true,
	                planet5: true,
	                planet6: true
	            }
	        }
	    },
	    69: {
	        4: {
	            all: {
	                l_fan: true,
	                r_fan: true
	            },
	            recall: {}
	        }
	    },
	    80: {
	        8: {
	            all: {
	                oven: true
	            },
	            recall: {}
	        }
	    },
	    83: {
	        0: {
	            all: {},
	            idle2: {
	                weapon: true
	            }
	        },
	        1: {
	            all: {},
	            idle2: {
	                weapon: true
	            }
	        },
	        2: {
	            all: {},
	            idle2: {
	                weapon: true
	            }
	        }
	    },
	    103: {
	        7: {
	            recall: {},
	            all: {
	                arcade: true
	            }
	        }
	    },
	    114: {
	        5: {
	            all: {
	                weapon_krab: true,
	                root_krab: true
	            },
	            recall: {}
	        }
	    },
	    115: {
	        4: {
	            all: {
	                sled: true
	            },
	            satcheljump: {
	                bomb: true,
	                bomb_b: true
	            }
	        }
	    },
	    119: {
	        4: {
	            all: {
	                chair_root: true,
	                sun_reflector_root: true
	            },
	            recall: {}
	        }
	    },
	    136: {
	        0: {
	            all: {
	                shades_sunglass: true
	            },
	            joke: {}
	        },
	        1: {
	            all: {
	                shades_sunglass: true
	            },
	            joke: {}
	        }
	    },
	    143: {
	        4: {
	            attack1: {
	                r_wing: true,
	                l_wing: true
	            },
	            attack2: {
	                r_wing: true,
	                l_wing: true
	            },
	            dance: {
	                r_wing: true,
	                l_wing: true
	            },
	            idle1: {
	                r_wing: true,
	                l_wing: true
	            },
	            idle3: {
	                r_wing: true,
	                l_wing: true
	            },
	            idle4: {
	                r_wing: true,
	                l_wing: true
	            },
	            laugh: {
	                r_wing: true,
	                l_wing: true
	            },
	            run: {
	                r_wing: true,
	                l_wing: true
	            },
	            spell2: {
	                r_wing: true,
	                l_wing: true
	            },
	            all: {}
	        }
	    },
	    157: {
	        4: {
	            all: {
	                flute: true
	            },
	            dance: {}
	        },
	        5: {
	            all: {
	                flute: true
	            },
	            dance: {}
	        },
	        6: {
	            all: {
	                flute: true
	            },
	            dance: {}
	        },
	        7: {
	            all: {
	                flute: true
	            },
	            dance: {}
	        },
	        8: {
	            all: {
	                flute: true
	            },
	            dance: {}
	        }
	    },
	    201: {
	        3: {
	            all: {
	                poro: true
	            }
	        }
	    },
	    222: {
	        4: {
	            all: {
	                rocket_launcher: true
	            },
	            r_attack1: {},
	            r_attack2: {},
	            r_idle1: {},
	            r_idle_in: {},
	            r_run: {},
	            r_run_fast: {},
	            r_run_haste: {},
	            r_spell2: {},
	            r_spell3: {},
	            r_spell3_run: {},
	            r_spell4: {},
	            respawn_trans_rlauncher: {},
	            rlauncher_spell3: {},
	            spell1a: {}
	        }
	    },
	    238: {
	        10: {
	            all: {
	                chair_skin10: true,
	                step1_skin10: true,
	                step2_skin10: true
	            },
	            recall: {}
	        }
	    },
	    245: {
	        0: {
	            deathrespawn: {},
	            all: {
	                book_pen: true
	            }
	        },
	        1: {
	            deathrespawn: {},
	            all: {
	                book_pen: true
	            }
	        },
	        2: {
	            deathrespawn: {},
	            all: {
	                book_pen: true
	            }
	        },
	        3: {
	            deathrespawn: {},
	            all: {
	                book_pen: true
	            }
	        },
	        4: {
	            deathrespawn: {},
	            all: {
	                book_pen: true
	            }
	        },
	        5: {
	            deathrespawn: {},
	            all: {
	                book_pen: true
	            }
	        },
	        6: {
	            deathrespawn: {},
	            all: {
	                book_pen: true
	            }
	        },
	        7: {
	            deathrespawn: {},
	            all: {
	                book_pen: true
	            }
	        },
	        8: {
	            deathrespawn: {},
	            all: {
	                book_pen: true
	            }
	        },
	        9: {
	            deathrespawn: {},
	            all: {
	                book_pen: true
	            }
	        },
	        10: {
	            deathrespawn: {},
	            all: {
	                book_pen: true
	            }
	        }
	    },
	    254: {
	        0: {
	            all: {
	                teacup: true
	            },
	            taunt2: {}
	        },
	        1: {
	            all: {
	                teacup: true
	            },
	            taunt2: {}
	        },
	        3: {
	            all: {
	                teacup: true
	            },
	            taunt2: {}
	        },
	        4: {
	            all: {
	                teacup: true
	            },
	            taunt2: {}
	        }
	    },
	    412: {
	        1: {
	            all: {
	                coin1: true,
	                coin2: true,
	                coin3: true,
	                coin4: true,
	                coin5: true,
	                coin6: true,
	                coin7: true,
	                treasure_chest: true,
	                treasure_chest_cover: true,
	                tire: true
	            },
	            recall: {
	                tire: true
	            },
	            undersea_recall_loop: {
	                tire: true
	            },
	            undersea_recall_loop2: {
	                coin1: true,
	                coin2: true,
	                coin3: true,
	                coin4: true,
	                coin5: true,
	                coin6: true,
	                coin7: true,
	                treasure_chest: true,
	                treasure_chest_cover: true
	            },
	            undersea_recall_windup: {
	                tire: true
	            },
	            undersea_recall_windup2: {
	                coin1: true,
	                coin2: true,
	                coin3: true,
	                coin4: true,
	                coin5: true,
	                coin6: true,
	                coin7: true,
	                treasure_chest: true,
	                treasure_chest_cover: true
	            }
	        },
	        5: {
	            all: {
	                mini_root: true
	            },
	            joke: {}
	        }
	    },
	    420: {
	        0: {
	            all: {
	                c_tentacle1: true
	            }
	        },
	        1: {
	            all: {
	                c_tentacle1: true
	            }
	        }
	    },
	    429: {
	        3: {
	            death: {
	                altar_spear: true,
	                buffbone_cstm_back_spear1: true,
	                buffbone_cstm_back_spear2: true,
	                buffbone_cstm_back_spear3: true
	            }
	        }
	    },
	    432: {
	        0: {
	            all: {
	                follower_root: true
	            },
	            dance: {}
	        },
	        2: {
	            all: {
	                follower_root: true
	            },
	            dance: {}
	        },
	        3: {
	            all: {
	                follower_root: true
	            },
	            dance: {}
	        },
	        4: {
	            all: {
	                follower_root: true
	            },
	            dance: {}
	        }
	    },
	    gnarbig: {
	        0: {
	            all: {
	                rock: true
	            },
	            spell1: {},
	            laugh: {}
	        },
	        1: {
	            all: {
	                rock: true
	            },
	            spell1: {},
	            laugh: {}
	        },
	        2: {
	            all: {
	                rock: true,
	                cane_bot: true,
	                cane_top: true
	            },
	            spell1: {
	                cane_bot: true,
	                cane_top: true
	            },
	            laugh: {
	                cane_bot: true,
	                cane_top: true
	            },
	            recall: {
	                rock: true
	            }
	        },
	        3: {
	            all: {
	                rock: true
	            },
	            spell1: {},
	            laugh: {}
	        },
	        4: {
	            all: {
	                rock: true
	            },
	            spell1: {},
	            laugh: {}
	        },
	        5: {
	            all: {
	                rock: true
	            },
	            spell1: {},
	            laugh: {}
	        },
	        6: {
	            all: {
	                rock: true
	            },
	            spell1: {},
	            laugh: {}
	        },
	        7: {
	            all: {
	                rock: true
	            },
	            spell1: {},
	            laugh: {}
	        },
	        8: {
	            all: {
	                rock: true
	            },
	            spell1: {},
	            laugh: {}
	        },
	        9: {
	            all: {
	                rock: true
	            },
	            spell1: {},
	            laugh: {}
	        },
	        10: {
	            all: {
	                rock: true
	            },
	            spell1: {},
	            laugh: {}
	        },
	        11: {
	            all: {
	                rock: true
	            },
	            spell1: {},
	            laugh: {}
	        },
	        12: {
	            all: {
	                rock: true
	            },
	            spell1: {},
	            laugh: {}
	        }
	    }
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AnimationBone(model, anim, r, version) {
	    var self = this;
	    self.model = model;
	    self.anim = anim;
	    var numFrames = r.getUint32();
	    self.bone = r.getString().toLowerCase();
	    self.flags = r.getUint32();
	    self.frames = new Array(numFrames);
	    var scale = [1, 1, 1];
	    for (var i = 0; i < numFrames; ++i) {
	        var pos = [r.getFloat(), r.getFloat(), r.getFloat()];
	        var rot = [r.getFloat(), r.getFloat(), r.getFloat(), r.getFloat()];
	        if (version >= 3) scale = [r.getFloat(), r.getFloat(), r.getFloat()];
	        self.frames[i] = {
	            pos: pos,
	            rot: rot,
	            scale: scale
	        };
	    }
	    self.matrix = mat4.create();
	    self.tmpMat = mat4.create();
	    self.tmpMat2 = mat4.create();
	    self.tmpPos = vec3.create();
	    self.tmpRot = quat.create();
	    self.tmpScale = vec3.create();
	}

	AnimationBone.prototype.update = function(boneId, frame, r) {
	    var self = this;
	    self.index = boneId;
	    var parent = self.model.bones[boneId].parent;
	    var f0 = frame % self.frames.length,
	        f1 = (frame + 1) % self.frames.length;
	    vec3.lerp(self.tmpPos, self.frames[f0].pos, self.frames[f1].pos, r);
	    vec3.lerp(self.tmpScale, self.frames[f0].scale, self.frames[f1].scale, r);
	    quat.slerp(self.tmpRot, self.frames[f0].rot, self.frames[f1].rot, r);
	    self.translation(self.tmpMat2, self.tmpPos);
	    self.rotationQuat(self.tmpMat, self.tmpRot);
	    self.mulSlimDX(self.matrix, self.tmpMat, self.tmpMat2);
	    if (parent != -1) {
	        self.mulSlimDX(self.matrix, self.matrix, self.model.transforms[parent]);
	    }
	    mat4.copy(self.model.transforms[boneId], self.matrix);
	};

	AnimationBone.prototype.translation = function(out, vec) {
	    mat4.identity(out);
	    out[12] = vec[0];
	    out[13] = vec[1];
	    out[14] = vec[2];
	    return out
	};

	AnimationBone.prototype.rotationQuat = function(out, q) {
	    mat4.identity(out);
	    var xx = q[0] * q[0],
	        yy = q[1] * q[1],
	        zz = q[2] * q[2],
	        xy = q[0] * q[1],
	        zw = q[2] * q[3],
	        zx = q[2] * q[0],
	        yw = q[1] * q[3],
	        yz = q[1] * q[2],
	        xw = q[0] * q[3];
	    out[0] = 1 - 2 * (yy + zz);
	    out[1] = 2 * (xy + zw);
	    out[2] = 2 * (zx - yw);
	    out[4] = 2 * (xy - zw);
	    out[5] = 1 - 2 * (zz + xx);
	    out[6] = 2 * (yz + xw);
	    out[8] = 2 * (zx + yw);
	    out[9] = 2 * (yz - xw);
	    out[10] = 1 - 2 * (yy + xx);
	    return out
	};

	AnimationBone.prototype.mulSlimDX = function(out, l, r) {
	    var left = {
	        M11: l[0],
	        M12: l[1],
	        M13: l[2],
	        M14: l[3],
	        M21: l[4],
	        M22: l[5],
	        M23: l[6],
	        M24: l[7],
	        M31: l[8],
	        M32: l[9],
	        M33: l[10],
	        M34: l[11],
	        M41: l[12],
	        M42: l[13],
	        M43: l[14],
	        M44: l[15]
	    };
	    var right = {
	        M11: r[0],
	        M12: r[1],
	        M13: r[2],
	        M14: r[3],
	        M21: r[4],
	        M22: r[5],
	        M23: r[6],
	        M24: r[7],
	        M31: r[8],
	        M32: r[9],
	        M33: r[10],
	        M34: r[11],
	        M41: r[12],
	        M42: r[13],
	        M43: r[14],
	        M44: r[15]
	    };
	    out[0] = left.M11 * right.M11 + left.M12 * right.M21 + left.M13 * right.M31 + left.M14 * right.M41;
	    out[1] = left.M11 * right.M12 + left.M12 * right.M22 + left.M13 * right.M32 + left.M14 * right.M42;
	    out[2] = left.M11 * right.M13 + left.M12 * right.M23 + left.M13 * right.M33 + left.M14 * right.M43;
	    out[3] = left.M11 * right.M14 + left.M12 * right.M24 + left.M13 * right.M34 + left.M14 * right.M44;
	    out[4] = left.M21 * right.M11 + left.M22 * right.M21 + left.M23 * right.M31 + left.M24 * right.M41;
	    out[5] = left.M21 * right.M12 + left.M22 * right.M22 + left.M23 * right.M32 + left.M24 * right.M42;
	    out[6] = left.M21 * right.M13 + left.M22 * right.M23 + left.M23 * right.M33 + left.M24 * right.M43;
	    out[7] = left.M21 * right.M14 + left.M22 * right.M24 + left.M23 * right.M34 + left.M24 * right.M44;
	    out[8] = left.M31 * right.M11 + left.M32 * right.M21 + left.M33 * right.M31 + left.M34 * right.M41;
	    out[9] = left.M31 * right.M12 + left.M32 * right.M22 + left.M33 * right.M32 + left.M34 * right.M42;
	    out[10] = left.M31 * right.M13 + left.M32 * right.M23 + left.M33 * right.M33 + left.M34 * right.M43;
	    out[11] = left.M31 * right.M14 + left.M32 * right.M24 + left.M33 * right.M34 + left.M34 * right.M44;
	    out[12] = left.M41 * right.M11 + left.M42 * right.M21 + left.M43 * right.M31 + left.M44 * right.M41;
	    out[13] = left.M41 * right.M12 + left.M42 * right.M22 + left.M43 * right.M32 + left.M44 * right.M42;
	    out[14] = left.M41 * right.M13 + left.M42 * right.M23 + left.M43 * right.M33 + left.M44 * right.M43;
	    out[15] = left.M41 * right.M14 + left.M42 * right.M24 + left.M43 * right.M34 + left.M44 * right.M44;
	    return out
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Animation(model, r, version) {
	    var self = this,
	        i;
	    self.model = model;
	    self.meshOverride = {};
	    self.name = r.getString().toLowerCase();
	    self.fps = r.getInt32();
	    var numBones = r.getUint32();
	    self.bones = new Array(numBones);
	    self.lookup = {};
	    for (i = 0; i < numBones; ++i) {
	        self.bones[i] = new AnimationBone(model, self, r, version);
	        self.lookup[self.bones[i].bone] = i;
	    }
	    if (numBones == 0 || self.fps <= 1) {
	        self.duration = 1e3;
	    } else {
	        self.duration = Math.floor(1e3 * (self.bones[0].frames.length / self.fps));
	    }
	}

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	var BaseAnimations = {
	    19: {
	        0: {
	            all: "idle"
	        }
	    },
	    32: {
	        4: {
	            all: "idle1_bow",
	            idle1_bow: "idle1"
	        }
	    },
	    55: {
	        7: {
	            idle1_candycane_below: "idle1"
	        }
	    }
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	var vertShader =
	    "attribute vec3 position;" +
	    "attribute vec3 normal;" +
	    "attribute vec2 uv;" +

	    "varying vec3 vNormal;" +
	    "varying vec2 vTexCoord;" +

	    "uniform mat4 modelViewMatrix;" +
	    "uniform mat4 projectionMatrix;" +

	    "void main(void) {" +
	    "	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);" +
	    "	vNormal = mat3(modelViewMatrix) * normalize(normal);" +
	    "	vTexCoord = uv;" +
	    "}";

	var fragShader =
	    "precision mediump float;" +

	    "varying vec3 vNormal;" +
	    "varying vec2 vTexCoord;" +

	    "uniform bool uHasTexture;" +
	    "uniform vec4 uAmbientColor;" +
	    "uniform vec4 uPrimaryColor;" +
	    "uniform vec4 uSecondaryColor;" +
	    "uniform vec3 uLightDir1;" +
	    "uniform vec3 uLightDir2;" +
	    "uniform vec3 uLightDir3;" +
	    "uniform sampler2D uTexture;" +

	    "void main(void) {" +
	    "	vec4 color = vec4(1, 1, 1, 1);" +
	    "	if (uHasTexture) {" +
	    "		color = texture2D(uTexture, vTexCoord.st);" +
	    "	} else {" +
	    "		color = vec4(vTexCoord.st, 0, 1);" +
	    "	}" +
	    "	vec4 litColor = uAmbientColor;" +
	    "	vec3 normal = normalize(vNormal);" +
	    "	float dp = max(0.0, dot(normal, uLightDir1));" +
	    "	litColor += uPrimaryColor * dp;" +
	    "	dp = max(0.0, dot(normal, uLightDir2));" +
	    "	litColor += uSecondaryColor * dp;" +
	    "	dp = max(0.0, dot(normal, uLightDir3));" +
	    "	litColor += uSecondaryColor * dp;" +
	    "	litColor = clamp(litColor, vec4(0,0,0,0), vec4(1,1,1,1));" +
	    "	color *= litColor;" +

	    "	gl_FragColor = color;" +
	    "}";

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function Model(options) {
	    var self = this;
	    self.champion = options.champion || "1";
	    self.skin = options.skin || 0;

	    self.loaded = false;
	    self.animsLoaded = false;

	    self.meshes = null;
	    self.vertices = null;
	    self.indices = null;
	    self.transforms = null;
	    self.bones = null;
	    self.boneLookup = {};
	    self.animIndex = -1;
	    self.animName = null;
	    self.baseAnim = null;
	    self.newAnimation = false;
	    self.animTime = 0;
	    self.tmpMat = mat4.create();
	    self.tmpVec = vec4.create();
	    self.ANIMATED = true;

	    self.dispatch = d3.dispatch('load');

	    self.hiddenBones = null;
	    var hiddenBones = HiddenBones;
	    if (hiddenBones[self.champion] !== undefined) {
	        if (hiddenBones[self.champion][self.skin] !== undefined) {
	            self.hiddenBones = hiddenBones[self.champion][self.skin];
	        }
	    }

	    self.ambientColor = [.35, .35, .35, 1];
	    self.primaryColor = [1, 1, 1, 1];
	    self.secondaryColor = [.35, .35, .35, 1];
	    self.lightDir1 = vec3.create();
	    self.lightDir2 = vec3.create();
	    self.lightDir3 = vec3.create();
	    vec3.normalize(self.lightDir1, [5, 5, -5]);
	    vec3.normalize(self.lightDir2, [5, 5, 5]);
	    vec3.normalize(self.lightDir3, [-5, -5, -5]);

	    self.texture = null;
	    self.geometry = new THREE.BufferGeometry();
	    self.material = new THREE.RawShaderMaterial({
	        uniforms: {
	            uAmbientColor: {
	                value: new THREE.Vector4().fromArray(self.ambientColor)
	            },
	            uPrimaryColor: {
	                value: new THREE.Vector4().fromArray(self.primaryColor)
	            },
	            uSecondaryColor: {
	                value: new THREE.Vector4().fromArray(self.secondaryColor)
	            },
	            uLightDir1: {
	                value: new THREE.Vector3().fromArray(self.lightDir1)
	            },
	            uLightDir2: {
	                value: new THREE.Vector3().fromArray(self.lightDir2)
	            },
	            uLightDir3: {
	                value: new THREE.Vector3().fromArray(self.lightDir3)
	            },
	            uHasTexture: {
	                value: 0
	            },
	            uTexture: {
	                value: null
	            }
	        },
	        vertexShader: vertShader,
	        fragmentShader: fragShader,
	    });
	}

	Model.prototype.getAnimations = function() {
	    if (!this.animations) {
	        return null;
	    }
	    var names = [];
	    this.animations.forEach(function(n) {
	        names.push(n.name);
	    });
	    return names;
	};

	Model.prototype.getAnimation = function(name) {
	    var self = this,
	        i, animIndex = -1;
	    if (!self.animations) {
	        return animIndex
	    }
	    name = name.toLowerCase();
	    if (name == "idle" || name == "attack") {
	        var anims = [],
	            re = new RegExp(name + "[0-9]*");
	        for (i = 0; i < self.animations.length; ++i) {
	            if (self.animations[i].name.search(re) == 0) anims.push(i);
	        }
	        if (anims.length > 0) {
	            animIndex = anims[0];
	        }
	    } else {
	        for (i = 0; i < self.animations.length; ++i) {
	            if (self.animations[i].name == name) {
	                animIndex = i;
	                break
	            }
	        }
	    }
	    return animIndex
	};

	Model.prototype.setAnimation = function(name) {
	    var self = this;
	    self.animName = name;
	    self.newAnimation = true;
	};

	Model.prototype.update = function(time) {
	    var self = this,
	        i, j;

	    if (self.animTime == 0) {
	        self.animTime = time;
	    }

	    if (!self.loaded || !self.vertices || !self.animations || self.animations.length == 0) {
	        return;
	    }

	    self.animIndex = self.getAnimation(self.animName);
	    if (self.animIndex == -1) {
	        self.animIndex = 0;
	        self.animName = "idle";
	    }
	    var baseAnims = BaseAnimations;
	    if (baseAnims[self.champion] !== undefined) {
	        if (baseAnims[self.champion][self.skin] !== undefined) {
	            var baseAnim = baseAnims[self.champion][self.skin],
	                baseIndex = -1;

	            if (baseAnim[self.animations[self.animIndex].name]) {
	                baseIndex = self.getAnimation(baseAnim[self.animations[self.animIndex].name]);
	            } else if (baseAnim["all"]) {
	                baseIndex = self.getAnimation(baseAnim["all"]);
	            }

	            if (baseIndex > -1) {
	                self.baseAnim = self.animations[baseIndex];
	            } else {
	                self.baseAnim = null;
	            }
	        }
	    }

	    var deltaTime = time - self.animTime;
	    var anim = self.animations[self.animIndex];

	    if (deltaTime >= anim.duration) {
	        self.animTime = time;
	        deltaTime = 0;
	    }

	    if (self.ANIMATED) {
	        var timePerFrame = 1e3 / anim.fps;
	        var frame = Math.floor(deltaTime / timePerFrame);
	        var r = deltaTime % timePerFrame / timePerFrame;
	        var hiddenBones = {};
	        if (self.hiddenBones) {
	            if (self.hiddenBones[anim.name]) {
	                hiddenBones = self.hiddenBones[anim.name];
	            } else if (self.hiddenBones["all"]) {
	                hiddenBones = self.hiddenBones["all"];
	            }
	        }
	        var b;
	        if (self.version >= 1) {
	            for (i = 0; i < self.bones.length; ++i) {
	                b = self.bones[i];
	                if (hiddenBones[b.name]) {
	                    mat4.identity(self.tmpMat);
	                    mat4.scale(self.tmpMat, self.tmpMat, vec3.set(self.tmpVec, 0, 0, 0));
	                    mat4.copy(self.transforms[i], self.tmpMat);
	                } else if (anim.lookup[b.name] !== undefined) {
	                    anim.bones[anim.lookup[b.name]].update(i, frame, r);
	                } else if (self.baseAnim && self.baseAnim.lookup[b.name] !== undefined) {
	                    self.baseAnim.bones[self.baseAnim.lookup[b.name]].update(i, frame, r);
	                } else {
	                    if (b.parent != -1) {
	                        AnimationBone.prototype.mulSlimDX(self.transforms[i], b.incrMatrix, self.transforms[b.parent]);
	                    } else {
	                        mat4.copy(self.transforms[i], b.incrMatrix);
	                    }
	                }
	            }
	        } else {
	            for (i = 0; i < anim.bones.length; ++i) {
	                b = anim.bones[i];
	                if (self.boneLookup[b.bone] !== undefined) {
	                    b.update(self.boneLookup[b.bone], frame, r);
	                } else {
	                    var parentBone = anim.bones[i - 1];
	                    if (!parentBone) continue;
	                    if (parentBone.index + 1 < self.transforms.length) {
	                        mat4.copy(self.transforms[parentBone.index + 1], self.transforms[parentBone.index]);
	                    }
	                    b.index = parentBone.index + 1;
	                }
	            }
	        }
	        var numBones = Math.min(self.transforms.length, self.bones.length);
	        for (i = 0; i < numBones; ++i) {
	            AnimationBone.prototype.mulSlimDX(self.transforms[i], self.bones[i].baseMatrix, self.transforms[i]);
	        }
	        mat4.identity(self.tmpMat);
	        var numVerts = self.vertices.length,
	            vec = self.tmpVec,
	            position = self.geometry.attributes.position.array,
	            normal = self.geometry.attributes.normal.array,
	            v, w, m, idx;
	        for (i = 0; i < numVerts; ++i) {
	            v = self.vertices[i];
	            idx = i * 3;
	            position[idx] = position[idx + 1] = position[idx + 2] = 0;
	            normal[idx] = normal[idx + 1] = normal[idx + 2] = 0;
	            for (j = 0; j < 4; ++j) {
	                if (v.weights[j] > 0) {
	                    w = v.weights[j];
	                    m = anim.fps == 1 ? self.tmpMat : self.transforms[v.bones[j]];
	                    vec3.transformMat4(vec, v.position, m);
	                    position[idx] += vec[0] * w;
	                    position[idx + 1] += vec[1] * w;
	                    position[idx + 2] += vec[2] * w;
	                    vec4.transformMat4(vec, v.normal, m);
	                    normal[idx] += vec[0] * w;
	                    normal[idx + 1] += vec[1] * w;
	                    normal[idx + 2] += vec[2] * w;
	                }
	            }
	        }
	        self.geometry.attributes.position.needsUpdate = true;
	        self.geometry.attributes.normal.needsUpdate = true;
	    }
	    if (self.newAnimation) {
	        self.newAnimation = false;
	    }
	};

	Model.prototype.load = function() {
	    var self = this;
	    var url = 'models/' + self.champion + '_' + self.skin + '.lmesh';
	    var loader = new THREE.FileLoader();
	    loader.setResponseType('arraybuffer');
	    loader.load(url, function(buffer) {
	        self.loadMesh(buffer);
	    });
	};

	Model.prototype.loadMesh = function(buffer) {
	    if (!buffer) {
	        console.error("Bad buffer for DataView");
	        return
	    }
	    var self = this,
	        r = new DataView2(buffer),
	        i,
	        v,
	        idx;
	    try {
	        var magic = r.getUint32();
	        if (magic != 604210091) {
	            console.log("Bad magic value");
	            return
	        }
	    } catch (err) {
	        alert("Model currently isn't loading! We're sorry and hope to have this fixed soon.");
	        console.log(err);
	        return
	    }
	    self.version = r.getUint32();
	    var animFile = r.getString();
	    var textureFile = r.getString();
	    if (animFile && animFile.length > 0) {
	        var url = "models/" + animFile + ".lanim";
	        var loader = new THREE.FileLoader();
	        loader.setResponseType('arraybuffer');
	        loader.load(url, function(buffer) {
	            self.loadAnim(buffer);
	        });
	    }
	    if (textureFile && textureFile.length > 0) {
	        self.texture = new Texture(self, "textures/" + self.champion + "/" + textureFile + ".png");
	    }
	    var numMeshes = r.getUint32();
	    if (numMeshes > 0) {
	        self.meshes = new Array(numMeshes);
	        for (i = 0; i < numMeshes; ++i) {
	            var name = r.getString().toLowerCase();
	            var vStart = r.getUint32();
	            var vCount = r.getUint32();
	            var iStart = r.getUint32();
	            var iCount = r.getUint32();
	            self.meshes[i] = {
	                name: name,
	                vStart: vStart,
	                vCount: vCount,
	                iStart: iStart,
	                iCount: iCount
	            };
	        }
	    }
	    var numVerts = r.getUint32();
	    if (numVerts > 0) {
	        self.vertices = new Array(numVerts);
	        self.vbData = new Float32Array(numVerts * 8);
	        var position = [];
	        var normal = [];
	        var uv = [];
	        for (i = 0; i < numVerts; ++i) {
	            idx = i * 8;
	            self.vertices[i] = v = new Vertex(r);
	            self.vbData[idx] = v.position[0];
	            self.vbData[idx + 1] = v.position[1];
	            self.vbData[idx + 2] = v.position[2];
	            self.vbData[idx + 3] = v.normal[0];
	            self.vbData[idx + 4] = v.normal[1];
	            self.vbData[idx + 5] = v.normal[2];
	            self.vbData[idx + 6] = v.u;
	            self.vbData[idx + 7] = v.v;

	            position.push(v.position[0], v.position[1], v.position[2]);
	            normal.push(v.normal[0], v.normal[1], v.normal[2]);
	            uv.push(v.u, v.v);
	        }
	        self.geometry.addAttribute('position',
	            new THREE.BufferAttribute(new Float32Array(position), 3));
	        self.geometry.addAttribute('normal',
	            new THREE.BufferAttribute(new Float32Array(normal), 3));
	        self.geometry.addAttribute('uv',
	            new THREE.BufferAttribute(new Float32Array(uv), 2));
	    }
	    var numIndices = r.getUint32();
	    if (numIndices > 0) {
	        self.indices = new Array(numIndices);
	        for (i = 0; i < numIndices; ++i) {
	            self.indices[i] = r.getUint16();
	        }
	        self.geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(self.indices), 1));
	    }
	    var numBones = r.getUint32();
	    if (numBones > 0) {
	        self.transforms = new Array(numBones);
	        self.bones = new Array(numBones);
	        for (i = 0; i < numBones; ++i) {
	            self.bones[i] = new Bone(self, i, r);
	            if (self.boneLookup[self.bones[i].name] !== undefined) {
	                self.bones[i].name = self.bones[i].name + "2";
	            }
	            self.boneLookup[self.bones[i].name] = i;
	            self.transforms[i] = new mat4.create;
	        }
	    }
	    self.loaded = true;
	    self.dispatch.call('load');
	};

	Model.prototype.loadAnim = function(buffer) {
	    if (!buffer) {
	        console.error("Bad buffer for DataView");
	        return
	    }
	    var self = this,
	        r = new DataView2(buffer),
	        i;
	    var magic = r.getUint32();
	    if (magic != 604210092) {
	        console.log("Bad magic value");
	        return
	    }
	    var version = r.getUint32();
	    if (version >= 2) {
	        var compressedData = new Uint8Array(buffer, r.position);
	        var data = null;
	        try {
	            data = pako.inflate(compressedData);
	        } catch (err) {
	            console.log("Decompression error: " + err);
	            return
	        }
	        r = new DataView2(data.buffer);
	    }
	    var numAnims = r.getUint32();
	    if (numAnims > 0) {
	        self.animations = new Array(numAnims);
	        for (i = 0; i < numAnims; ++i) {
	            self.animations[i] = new Animation(self, r, version);
	        }
	    }
	    self.animsLoaded = true;
	};

	Model.prototype.on = function(eventName, callback) {
	    this.dispatch.on(eventName, callback);
	};

	var champions = [{ "id": 1, "name": "Annie", "title": "黑暗之女", "chinese": "安妮" }, { "id": 11, "name": "Master Yi", "title": "无极剑圣", "chinese": "易大师" }, { "id": 22, "name": "Ashe", "title": "寒冰射手", "chinese": "艾希" }, { "id": 40, "name": "Janna", "title": "风暴之怒", "chinese": "迦娜" }, { "id": 86, "name": "Garen", "title": "德玛西亚之力", "chinese": "盖伦" }, { "id": 99, "name": "Lux", "title": "光辉女郎", "chinese": "拉克丝" }, { "id": 103, "name": "Ahri", "title": "九尾妖狐", "chinese": "阿狸" }, { "id": 117, "name": "Lulu", "title": "仙灵女巫", "chinese": "璐璐" }, { "id": 222, "name": "Jinx", "title": "暴走萝莉", "chinese": "金克丝" }, { "id": 498, "name": "Xayah", "title": "逆羽", "chinese": "霞" }, { "id": "bw_plundercrab", "name": "Plundercrab", "title": "掠夺蟹", "chinese": "掠夺蟹" }, { "id": "sru_crab", "name": "Rift Scuttler", "title": "迅捷蟹", "chinese": "迅捷蟹" }];

	var animNames = [{ "id": 0, "name": "attack1", "chinese": "攻击1" }, { "id": 1, "name": "attack2", "chinese": "攻击2" }, { "id": 2, "name": "channel", "chinese": "施法" }, { "id": 3, "name": "channel_wndup", "chinese": "施法打断" }, { "id": 4, "name": "crit", "chinese": "重击" }, { "id": 5, "name": "dance", "chinese": "跳舞" }, { "id": 6, "name": "death", "chinese": "死亡" }, { "id": 7, "name": "idle1", "chinese": "站立1" }, { "id": 8, "name": "joke", "chinese": "玩笑" }, { "id": 9, "name": "laugh", "chinese": "大笑" }, { "id": 10, "name": "recall", "chinese": "回城" }, { "id": 11, "name": "run", "chinese": "跑步" }, { "id": 12, "name": "spell1", "chinese": "技能1" }, { "id": 13, "name": "spell2", "chinese": "技能2" }, { "id": 14, "name": "spell3", "chinese": "技能3" }, { "id": 15, "name": "spell4", "chinese": "技能4" }, { "id": 16, "name": "taunt", "chinese": "嘲讽" }, { "id": 17, "name": "attack3", "chinese": "攻击3" }, { "id": 18, "name": "idle2", "chinese": "站立2" }, { "id": 19, "name": "idle3", "chinese": "站立3" }, { "id": 20, "name": "idle4", "chinese": "站立4" }];

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	var ID$3 = -1;

	function AddHeroWin(options) {
	    Dialog.call(this, options);
	    options = options || {};
	    this.app = options.app || null;
	    this.title = 'Add Hero';
	    this.width = 200;
	    this.height = 500;
	    this.tree = new Tree({
	        data: champions
	    });
	    this.animFolder = null;
	    this.options = null;
	}

	AddHeroWin.prototype = Object.create(Dialog.prototype);
	AddHeroWin.prototype.constructor = AddHeroWin;

	AddHeroWin.prototype.render = function() {
	    Dialog.prototype.render.call(this);
	    this.tree.parent = this.el.div;
	    this.tree.render();
	    var _this = this;
	    this.tree.on('click', function(event, treeId, treeNode, clickFlag) {
	        _this.onClick(event, treeId, treeNode, clickFlag);
	    });
	    var _this = this;
	    this.app.on('selectObject', function(obj) {
	        _this.onSelectObject.call(_this, obj);
	    });
	};

	AddHeroWin.prototype.onClick = function(event, treeId, treeNode, clickFlag) {
	    var id = 'hero' + ID$3--;
	    var model = new Model({
	        champion: treeNode.id
	    });
	    model.load();
	    var _this = this;
	    model.on('load', function() {
	        var geometry = model.geometry;
	        var material = model.material;
	        var mesh = new THREE.Mesh(geometry, material);
	        mesh.userData.id = id;
	        mesh.userData.name = treeNode.name;
	        mesh.userData.type = 'lol_mesh';
	        mesh.userData.model = model;
	        mesh.scale.set(0.1, 0.1, 0.1);
	        _this.app.scene.add(mesh);

	        model.setAnimation('idle');

	        _this.app.on('onAnimate.' + id, function(clock) {
	            model.update(clock.getElapsedTime() * 1000);
	        });
	    });
	};

	AddHeroWin.prototype.onSelectObject = function(obj) {
	    if (obj.object == null || obj.object.userData == null || obj.object.userData.type != 'lol_mesh') {
	        return;
	    }

	    if (this.animFolder != null) {
	        this.app.gui.removeFolder(this.animFolder);
	    }
	    this.animFolder = this.app.gui.addFolder('animation');
	    this.animFolder.open();

	    var model = obj.object.userData.model;
	    var anims = model.getAnimations();
	    this.options = function() {

	    };
	    var _this = this;
	    anims.forEach(function(name) {
	        _this.options[name] = function() {
	            model.setAnimation(name);
	        };
	    });
	    anims.forEach(function(name) {
	        _this.animFolder.add(_this.options, name);
	    });
	};

	// model
	// ui
	var Lol = {
	    champions: champions,
	    animNames: animNames,
	    Model: Model,
	    vertShader: vertShader,
	    fragShader: fragShader,
	    Texture: Texture,
	    Vertex: Vertex,
	    Bone: Bone,
	    Animation: Animation,
	    AnimationBone: AnimationBone,
	    BaseAnimations: BaseAnimations,
	    HiddenBones: HiddenBones,
	    AddHeroWin: AddHeroWin
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function AddHeroCommand(options) {
	    BaseCommand.call(this, options);
	    options = options || {};
	}

	AddHeroCommand.prototype = Object.create(BaseCommand.prototype);
	AddHeroCommand.prototype.constructor = AddHeroCommand;

	AddHeroCommand.prototype.init = function() {
	    var _this = this;
	    this.app.event.on('addHeroWin.command', function() {
	        _this.run.call(_this);
	    });
	};

	AddHeroCommand.prototype.run = function() {
	    var win = new Lol.AddHeroWin({
	        app: this.app
	    });
	    win.render();
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function CommandDispatcher(options) {
	    options = options || {};
	    this.app = options.app || null;
	    this.commands = [
	        new AddBoxCommand({ app: this.app }),
	        new AddCircleCommand({ app: this.app }),
	        new AddConeCommand({ app: this.app }),
	        new AddCylinderCommand({ app: this.app }),
	        new AddDodecahedronCommand({ app: this.app }),
	        new AddExtrudeCommand({ app: this.app }),
	        new AddIcosahedronCommand({ app: this.app }),
	        new AddLatheCommand({ app: this.app }),
	        new AddOctahedronCommand({ app: this.app }),
	        new AddParametricCommand({ app: this.app }),
	        new AddPlaneCommand({ app: this.app }),
	        new AddRingCommand({ app: this.app }),
	        new AddSphereCommand({ app: this.app }),
	        new AddTetrahedronCommand({ app: this.app }),
	        new AddTorusCommand({ app: this.app }),
	        new AddTorusKnotCommand({ app: this.app }),
	        new AddTubeCommand({ app: this.app }),
	        new AddFireCommand({ app: this.app }),
	        new AddHeroCommand({ app: this.app }),
	    ];
	}

	CommandDispatcher.prototype.start = function() {
	    this.commands.forEach(function(n) {
	        n.init.call(n);
	    });
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function EditorApp(options) {
	    options = options || {};
	    this.event = options.event || new EventManager({
	        app: this
	    });
	    this.call = function(eventName) {
	        this.event.call(params);
	    };
	    this.on = function(eventName, callback) {
	        this.event.on(eventName, callback);
	    };
	    this.ui = options.ui || new EditorUI({
	        app: this
	    });
	    this.cmdDispatcher = new CommandDispatcher({
	        app: this
	    });
	}

	EditorApp.prototype.start = function() {
	    this.event.call('beforeEditorRender', this);
	    this.ui.render();
	    this.cmdDispatcher.start();
	    this.event.call('editorRender', this);
	    this.event.call('editorStart', this);
	};

	/**
	 * @author tengge / https://github.com/tengge1
	 */

	function EditorHierarchy(options) {

	}

	// constant

	exports.Coordinate = Coordinate;
	exports.Geometry = Geometry;
	exports.Point = Point;
	exports.Line = Line;
	exports.Polygon = Polygon;
	exports.Control = Control;
	exports.Container = Container;
	exports.Interaction = Interaction;
	exports.Layout = Layout;
	exports.UiHelper = UiHelper;
	exports.UiStyler = UiStyler;
	exports.FixedContainer = FixedContainer;
	exports.Accordion = Accordion;
	exports.AccordionItem = AccordionItem;
	exports.Autocomplete = Autocomplete;
	exports.Button = Button;
	exports.CheckBox = CheckBox;
	exports.CheckboxField = CheckboxField;
	exports.CheckboxRadio = CheckboxRadio;
	exports.ColorField = ColorField;
	exports.ColorPicker = ColorPicker;
	exports.Controlgroup = Controlgroup;
	exports.DateField = DateField;
	exports.Datepicker = Datepicker;
	exports.Dialog = Dialog;
	exports.Fieldset = Fieldset;
	exports.List = List;
	exports.Menu = Menu;
	exports.MenuItem = MenuItem;
	exports.ProgressBar = ProgressBar;
	exports.Rect = Rect;
	exports.SelectMenu = SelectMenu;
	exports.SelectMenuItem = SelectMenuItem;
	exports.Slider = Slider;
	exports.Spinner = Spinner;
	exports.TabItem = TabItem;
	exports.TabPanel = TabPanel;
	exports.TextField = TextField;
	exports.Tooltip = Tooltip;
	exports.Tree = Tree;
	exports.Draggable = Draggable;
	exports.Droppable = Droppable;
	exports.Resizable = Resizable;
	exports.Selectable = Selectable;
	exports.Sortable = Sortable;
	exports.BorderLayout = BorderLayout;
	exports.CenterLayout = CenterLayout;
	exports.FormLayout = FormLayout;
	exports.HBoxLayout = HBoxLayout;
	exports.TableLayout = TableLayout;
	exports.VBoxLayout = VBoxLayout;
	exports.SvgDom = SvgDom;
	exports.SvgGroup = SvgGroup;
	exports.SvgCircle = SvgCircle;
	exports.SvgElement = SvgElement;
	exports.SvgEllipse = SvgEllipse;
	exports.SvgLine = SvgLine;
	exports.SvgPath = SvgPath;
	exports.SvgPolygon = SvgPolygon;
	exports.SvgPolyline = SvgPolyline;
	exports.SvgRect = SvgRect;
	exports.EventManager = EventManager;
	exports.EditorApp = EditorApp;
	exports.EditorBox = EditorBox;
	exports.EditorMainPanel = EditorMainPanel;
	exports.EditorNav = EditorNav;
	exports.EditorNavMenu = EditorNavMenu;
	exports.EditorPropertyPanel = EditorPropertyPanel;
	exports.EditorUI = EditorUI;
	exports.EditorHierarchy = EditorHierarchy;
	exports.EditorSettings = EditorSettings;
	exports.BaseCommand = BaseCommand;
	exports.CommandDispatcher = CommandDispatcher;
	exports.AddBoxCommand = AddBoxCommand;
	exports.AddCircleCommand = AddCircleCommand;
	exports.AddConeCommand = AddConeCommand;
	exports.AddCylinderCommand = AddCylinderCommand;
	exports.AddDodecahedronCommand = AddDodecahedronCommand;
	exports.AddExtrudeCommand = AddExtrudeCommand;
	exports.AddFireCommand = AddFireCommand;
	exports.AddIcosahedronCommand = AddIcosahedronCommand;
	exports.AddLatheCommand = AddLatheCommand;
	exports.AddOctahedronCommand = AddOctahedronCommand;
	exports.AddParametricCommand = AddParametricCommand;
	exports.AddPlaneCommand = AddPlaneCommand;
	exports.AddRingCommand = AddRingCommand;
	exports.AddSphereCommand = AddSphereCommand;
	exports.AddTetrahedronCommand = AddTetrahedronCommand;
	exports.AddTorusCommand = AddTorusCommand;
	exports.AddTorusKnotCommand = AddTorusKnotCommand;
	exports.AddTubeCommand = AddTubeCommand;
	exports.Scene = Scene;
	exports.LogScene = LogScene;
	exports.GlScene = GlScene;
	exports.GlControl = GlControl;
	exports.GlGUI = GlGUI;
	exports.GlOrbitControls = GlOrbitControls;
	exports.GlStats = GlStats;
	exports.GlTransformControls = GlTransformControls;
	exports.GlHoverObject = GlHoverObject;
	exports.GlSelectObject = GlSelectObject;
	exports.GlAxisHelper = GlAxisHelper;
	exports.GlGridHelper = GlGridHelper;
	exports.GlLight = GlLight;
	exports.Lol = Lol;
	exports.CustomEvents = CustomEvents;
	exports.NavMenus = NavMenus;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
