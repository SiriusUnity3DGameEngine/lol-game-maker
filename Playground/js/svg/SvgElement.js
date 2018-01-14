/**
 * @author tengge / https://github.com/tengge1
 */

function SvgElement(options) {
    options = options || [];
    this.parent = d3.select(options.parent || document.body);
}

SvgElement.prototype.render = function() {

};

export { SvgElement };