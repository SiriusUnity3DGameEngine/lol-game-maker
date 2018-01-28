import { Scene } from '../Scene';

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

export { LogScene };