function Coordinate(options) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.z = options.z || 0;

    this.set = function(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    this.get = function() {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    }
}

export default { Coordinate };