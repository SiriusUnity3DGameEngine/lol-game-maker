// rollup.config.js
function glsl() {

    return {

        transform(code, id) {

            if (/\.glsl$/.test(id) === false) return;

            var transformedCode = 'export default ' + JSON.stringify(
                code
                .replace(/[ \t]*\/\/.*\n/g, '')
                .replace(/[ \t]*\/\*[\s\S]*?\*\//g, '')
                .replace(/\n{2,}/g, '\n')
            ) + ';';
            return {
                code: transformedCode,
                map: { mappings: '' }
            };

        }

    };

}

export default {
    input: 'js/main.js',
    output: {
        indent: '\t',
        format: 'umd',
        name: 'AI',
        file: 'js/bundle.js'
    },
    plugins: [
        glsl()
    ]
};