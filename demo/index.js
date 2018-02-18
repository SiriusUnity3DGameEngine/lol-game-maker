var app;

var start = function() {
    app = new AI.EditorApp();
    app.start();
};

window.onload = function() {
    start();
};