import { SvgElement } from '../SvgElement';

/**
 * @author tengge / https://github.com/tengge1
 */

function SvgCircle(options) {
    SvgElement.call(this, options);
    options = options || {};
    this.cx = options.cx || 0;
    this.cy = options.cy || 0;
    this.r = options.r || 50;
    this.stroke = options.stroke || 'black';
    this.strokeWidth = options.strokeWidth || 2;
    this.fill = options.fill || 'red';
}

SvgCircle.prototype = Object.create(SvgElement.prototype);
SvgCircle.prototype.constructor = SvgCircle;

SvgCircle.prototype.render = function() {
    this.parent.append('circle')
        .attr('cx', this.cx)
        .attr('cy', this.cy)
        .attr('r', this.r)
        .attr('stroke', this.stroke)
        .attr('stroke-width', this.strokeWidth)
        .attr('fill', this.fill);
};

export { SvgCircle };