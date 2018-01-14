import { SvgElement } from './SvgElement';

/**
 * @author tengge / https://github.com/tengge1
 */

function SvgRect(options) {
    SvgElement.call(this, options);
    options = options || {};
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 100;
    this.height = options.height || 60;
}

SvgRect.prototype = Object.create(SvgElement.prototype);
SvgRect.prototype.constructor = SvgRect;

SvgRect.prototype.render = function() {
    this.parent.append('rect')
        .attr('x', this.x)
        .attr('y', this.y)
        .attr('width', this.width)
        .attr('height', this.height)
        .call(this.renderStyle, this);
};

export { SvgRect };