var app;

var start = function() {
    app = new AI.EditorApp();
    app.start();
};

window.onload = function() {
    start();
    test();
};

var test = function() {
    var loader = new AI.LMeshLoader();
    loader.load('models/1_0.lmesh', function(mesh) {
        debugger
    });
};