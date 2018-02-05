/**
 * @author tengge / https://github.com/tengge1
 */

function Texture(model, url) {
    var self = this;
    self.model = model;
    self.url = url;
    self.texture = null;
    self.load()
};

Texture.prototype.destroy = function() {
    var self = this;
    //gl = self.model.renderer.context;
    //if (self.texture) gl.deleteTexture(self.texture);
    self.texture = null;
    self.img = null
};

Texture.prototype.load = function() {
    var self = this;
    //gl = self.model.renderer.context;
    (function(self) {
        self.img = new Image;
        self.img.crossOrigin = "";
        self.img.onload = function() {
            self.img.loaded = true;
            // self.texture = gl.createTexture();
            // gl.bindTexture(gl.TEXTURE_2D, self.texture);
            // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, self.img);
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        };
        self.img.onerror = function() {
            self.img = null;
            self.error = true
        };
        self.img.src = self.url
    })(self)
};

export { Texture };