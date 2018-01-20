/**
 * @author tengge / https://github.com/tengge1
 */

function UiControl(options) {
    options = options || {};
    this.parent = options.parent || document.body;
    this.el = {};
}

UiControl.prototype.render = function() {

};

export { UiControl };