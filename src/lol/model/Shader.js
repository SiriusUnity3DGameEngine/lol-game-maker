/**
 * @author tengge / https://github.com/tengge1
 */

var vertShader =
    "attribute vec3 position;" +
    "attribute vec3 normal;" +
    "attribute vec2 uv;" +

    "varying vec3 vNormal;" +
    "varying vec2 vTexCoord;" +

    "uniform mat4 modelViewMatrix;" +
    "uniform mat4 projectionMatrix;" +

    "void main(void) {" +
    "	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);" +
    "	vNormal = mat3(modelViewMatrix) * normalize(normal);" +
    "	vTexCoord = uv;" +
    "}";

var fragShader =
    "precision mediump float;" +

    "varying vec3 vNormal;" +
    "varying vec2 vTexCoord;" +

    "uniform bool uHasTexture;" +
    "uniform vec4 uAmbientColor;" +
    "uniform vec4 uPrimaryColor;" +
    "uniform vec4 uSecondaryColor;" +
    "uniform vec3 uLightDir1;" +
    "uniform vec3 uLightDir2;" +
    "uniform vec3 uLightDir3;" +
    "uniform sampler2D uTexture;" +

    "void main(void) {" +
    "	vec4 color = vec4(1, 1, 1, 1);" +
    "	if (uHasTexture) {" +
    "		color = texture2D(uTexture, vTexCoord.st);" +
    "	} else {" +
    "		color = vec4(vTexCoord.st, 0, 1);" +
    "	}" +
    "	vec4 litColor = uAmbientColor;" +
    "	vec3 normal = normalize(vNormal);" +
    "	float dp = max(0.0, dot(normal, uLightDir1));" +
    "	litColor += uPrimaryColor * dp;" +
    "	dp = max(0.0, dot(normal, uLightDir2));" +
    "	litColor += uSecondaryColor * dp;" +
    "	dp = max(0.0, dot(normal, uLightDir3));" +
    "	litColor += uSecondaryColor * dp;" +
    "	litColor = clamp(litColor, vec4(0,0,0,0), vec4(1,1,1,1));" +
    "	color *= litColor;" +

    "	gl_FragColor = color;" +
    "}";

export { vertShader, fragShader };