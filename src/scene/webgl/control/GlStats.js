import { GlControl } from './GlControl';

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

export { GlStats };