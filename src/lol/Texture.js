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

Texture.prototype.load = function() {
    var self = this;

    self.texture = new THREE.TextureLoader().load(self.url);
    self.texture.magFilter = THREE.LinearFilter;
    self.texture.minFilter = THREE.LinearFilter; // gl.TEXTURE_MIN_FILTER
};

export { Texture };