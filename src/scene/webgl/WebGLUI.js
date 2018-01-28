import { UiControl } from '../../ui/UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function WebGLUI(options) {
    UiControl.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.gui = options.gui || new dat.GUI({
        autoPlace: false
    });
    this.parent.appendChild(this.gui.domElement);
    this.gui.domElement.style.position = 'absolute';
    this.gui.domElement.style.top = '0';
    this.gui.domElement.style.right = '0';
    this.controls = options.controls || new function() {
        this.transform = 'translate';
    };
    this.dispatch = d3.dispatch('change');
}

WebGLUI.prototype = Object.create(UiControl.prototype);
WebGLUI.prototype.constructor = WebGLUI;

WebGLUI.prototype.render = function() {
    var _this = this;
    this.gui.add(this.controls, 'transform', ['translate', 'rotate', 'scale'])
        .onChange(function() {
            _this.dispatch.call('change', _this);
        });
};

WebGLUI.prototype.on = function(eventName, callback) {
    this.dispatch.on(eventName, callback);
};

export { WebGLUI };