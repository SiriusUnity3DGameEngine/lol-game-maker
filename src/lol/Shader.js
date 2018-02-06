/**
 * @author tengge / https://github.com/tengge1
 */

var vertShader =
    "attribute vec3 aPosition;" +
    "attribute vec3 aNormal;" +
    "attribute vec2 aTexCoord;" +

    "varying vec3 vNormal;" +
    "varying vec2 vTexCoord;" +

    "uniform mat4 uModelMatrix;" +
    "uniform mat4 uViewMatrix;" +
    "uniform mat4 uProjMatrix;" +

    "void main(void) {" +
    "	gl_Position = uProjMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1);" +
    "	vNormal = mat3(uViewMatrix * uModelMatrix) * normalize(aNormal);" +
    "	vTexCoord = aTexCoord;" +
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