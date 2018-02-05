/**
 * @author tengge / https://github.com/tengge1
 */

function LMeshLoader(manager) {
    this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;
}

LMeshLoader.prototype.load = function(url, onLoad, onProgress, onError) {
    var scope = this;
    var loader = new THREE.FileLoader(scope.manager);
    loader.setResponseType('arraybuffer');
    loader.load(url, function(text) {
        onLoad(scope.parse(text));
    }, onProgress, onError);
};

LMeshLoader.prototype.parse = function(data) {

};

export { LMeshLoader };