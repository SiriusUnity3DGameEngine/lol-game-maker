import { GlControl } from './GlControl';

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
    this.gui.add(this.controls, 'transform', ['translate', 'rotate', 'scale'])
        .onChange(function(value) {
            _this.app.event.call(value + 'Object');
        });
};

export { GlGUI };