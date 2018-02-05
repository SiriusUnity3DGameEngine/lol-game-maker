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
    var model = new AI.Lol.Model();
    model.load('models/1_0.lmesh');
};