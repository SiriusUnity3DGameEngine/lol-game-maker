import { Control } from '../control';

/**
 * @author tengge / https://github.com/tengge1
 */

function GridPanel(options) {
    Control.call(this, options);
    options = options || {};
}

GridPanel.prototype = Object.create(Control.prototype);
GridPanel.prototype.constructor = GridPanel;

GridPanel.prototype.render = function() {

};

export { GridPanel };