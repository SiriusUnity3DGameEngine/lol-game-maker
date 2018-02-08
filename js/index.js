var app;

var start = function() {
    app = new AI.EditorApp();
    app.start();
};

window.onload = function() {
    start();
    test();
};

var model = null;
var geometry = null;
var material = null;
var mesh = null;
var test = function() {
    model = new AI.Lol.Model({
        app: app
    });
    model.load('models/1_0.lmesh');
    app.event.on('loadMesh', function() {
        geometry = model.geometry;
        material = model.material;
        mesh = new THREE.Mesh(geometry, material);
        app.scene.add(mesh);

        model.setAnimation('idle');

        app.on('onAnimate', function(clock) {
            model.update(clock.getElapsedTime() * 1000);
        });
    });
};