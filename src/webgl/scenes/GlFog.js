/**
 * @author tengge / https://github.com/tengge1
 */

function GlFog(color, near, far) {
    GlFog.call(this, color, near, far);
}

GlFog.prototype = Object.create(THREE.Fog.prototype);
GlFog.prototype.constructor = GlFog;

export { GlFog };