import { UiControl } from '../../ui/UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function WebGLControl(options) {
    UiControl.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.gui = options.gui || new dat.GUI({
        autoPlace: false
    });
    this.parent.appendChild(this.gui.domElement);
    this.gui.domElement.style.position = 'absolute';
    this.gui.domElement.style.top = '64px';
    this.gui.domElement.style.right = '240px';
    this.controls = options.controls || new function() {
        this.transform = 'translate';
    };
    this.dispatch = d3.dispatch('change');
}

WebGLControl.prototype = Object.create(UiControl.prototype);
WebGLControl.prototype.constructor = WebGLControl;

WebGLControl.prototype.render = function() {
    var _this = this;
    this.gui.add(this.controls, 'transform', ['translate', 'rotate', 'scale'])
        .onChange(function() {
            _this.dispatch.call('change', _this);
        });
};

WebGLControl.prototype.on = function(eventName, callback) {
    this.dispatch.on(eventName, callback);
};

export { WebGLControl };