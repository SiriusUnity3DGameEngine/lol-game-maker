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

export { Scene };