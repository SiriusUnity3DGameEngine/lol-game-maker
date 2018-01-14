import { Scene2D } from './Scene2D';

/**
 * @author tengge / https://github.com/tengge1
 */

function SvgScene(options) {
    Scene2D.call(this, options);
    options = options || {};
    this.width = options.width || 960;
    this.height = options.height || 500;
    this.radius = options.radius || 10;
    this.p0 = options.p0 || [960, 500, 10];
    this.p1 = options.p1 || [560, 300, 120];
}

SvgScene.prototype = Object.create(Scene2D.prototype);
SvgScene.prototype.constructor = SvgScene;

SvgScene.prototype.render = function() {
    var width = 960,
        height = 500,
        radius = 10;

    var p0 = [250, 200, 60],
        p1 = [560, 300, 120];

    var svg = d3.select(this.container).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .call(transition, p0, p1);

    svg.append("path")
        .attr("class", "mesh")
        .attr("d", d3.hexbin()
            .size([width, height])
            .radius(radius)
            .mesh);

    svg.selectAll("circle")
        .data([p0, p1])
        .enter().append("circle")
        .attr("class", function(d, i) { return i ? "end" : "start"; })
        .attr("cx", function(d) { return d[0]; })
        .attr("cy", function(d) { return d[1]; })
        .attr("r", function(d) { return d[2] / 2 - .5; });

    function transition(svg, start, end) {
        var center = [width / 2, height / 2],
            i = d3.interpolateZoom(start, end);

        svg
            .attr("transform", transform(start))
            .transition()
            .delay(250)
            .duration(i.duration * 2)
            .attrTween("transform", function() { return function(t) { return transform(i(t)); }; });

        function transform(p) {
            var k = height / p[2];
            return "translate(" + (center[0] - p[0] * k) + "," + (center[1] - p[1] * k) + ")scale(" + k + ")";
        }
    }
};

export { SvgScene };