/**
 * @author tengge / https://github.com/tengge1
 */

function GlFogExp2(color, density) {
    GlFogExp2.call(this, color, density);
}

GlFogExp2.prototype = Object.create(THREE.GlFogExp2.prototype);
GlFogExp2.prototype.constructor = GlFogExp2;

export { GlFogExp2 };