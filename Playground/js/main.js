var initUI = function() {
    $('#menu').menu({
        position: { 
            my: "left bottom", 
            at: "left top" 
        },
        icons: {
            submenu: "ui-icon-triangle-1-s",
        }
    });
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
};

var canvas = null;
var scene = null;
var camera = null;
var renderer = null;
var initThreeJs = function() {
    canvas = document.getElementById('mycanvas');
    canvas.style.height = $('#leftPanel').height() - $('#leftPanel ul:eq(1)').height() + 'px';
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 10000);
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });
    renderer.setSize(canvas.width, canvas.height);

    var light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(200, 200, 200);
    light.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(light);

    var gridHelper = new THREE.GridHelper(2000, 20);
    scene.add(gridHelper);

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

$(function() {
    initUI();
    initThreeJs();
});