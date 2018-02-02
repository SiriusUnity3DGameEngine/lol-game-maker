import { Control } from '../../../ui/Control';

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

export { GlControl };