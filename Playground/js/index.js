$(function() {
    $('#leftPanel').tabs();
    $('#accordion').accordion({
        heightStyle: "fill"
    });
    $("#rightPanel").resizable({
        minHeight: 140,
        minWidth: 200,
        resize: function() {
            $("#accordion").accordion("refresh");
        }
    });
});

var initThreeJs = function() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(200, 200, 200);
    light.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(light);

    var geometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    plane.position.set(0, -160, 0);
    plane.rotation.set(Math.PI / 2, 0, 0);

    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.set(0, 0, 0);

    camera.position.set(500, 500, 200);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;

    function render() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    render();
};