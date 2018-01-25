import { UiControl } from '../ui/UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function Scene(options) {
    UiControl.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.name = options.name || 'Scene';
    this.width = this.app.mainPanel.children[0].el.div.clientWidth;
    this.height = this.app.mainPanel.children[0].el.div.clientHeight;
}

Scene.prototype = Object.create(UiControl.prototype);
Scene.prototype.constructor = Scene;

Scene.prototype.getName = function() {
    return this.name;
};

Scene.prototype.setName = function(name) {
    this.name = name;
};

export { Scene };