// OpenSeaAI editor custom events
var CustomEvents = [
    // ./editor/EditorApp.js
    'beforeEditorRender',
    'editorRender',
    'editorStart',

    // ./editor/EditorNavMenu.js
    'newScene',
    'openScene',
    'saveScene',
    'quitEditor',
    'undo',
    'redo',
    'propertyPanel',
    'logPanel',
    'addBox',
    'addCircle',
    'addCone',
    'addCylinder',
    'addDodecahedron',
    'addExtrude',
    'addIcosahedron',
    'addLathe',
    'addOctahedron',
    'addParametric',
    'addPlane',
    'addRing',
    'addSphere',
    'addTetrahedron',
    'addText',
    'addTorus',
    'addTorusKnot',
    'addTube',
    'addFire',
    'addTransform',
    'addRigidBody',
    'addMaterial',
    'debug',
    'play',
    'document',
    'about',

    // ./scene/webgl/GlScene.js
    'beforeAnimate',
    'onAnimate',

    // ./scene/webgl/control/GlGUI.js
    'translateObject',
    'rotateObject',
    'scaleObject',
];

var NavMenus = [{
    id: 'scene',
    text: 'Scene',
    children: [{
        id: 'newScene',
        text: 'New Scene',
    }, {
        id: 'openScene',
        text: 'Open Scene'
    }, {
        id: 'saveScene',
        text: 'Save Scene',
    }, {
        id: 'quitEditor',
        text: 'Quit'
    }]
}, {
    id: 'edit',
    text: 'Edit',
    children: [{
        id: 'undo',
        text: 'Undo'
    }, {
        id: 'redo',
        text: 'Redo'
    }]
}, {
    id: 'view',
    text: 'View',
    children: [{
        id: 'propertyPanel',
        text: 'PropertyPanel'
    }, {
        id: 'logPanel',
        text: 'Log Panel'
    }]
}, {
    id: 'object',
    text: 'Object',
    children: [{
        id: 'addBox',
        text: 'Box'
    }, {
        id: 'addCircle',
        text: 'Circle'
    }, {
        id: 'addCone',
        text: 'Cone'
    }, {
        id: 'addCylinder',
        text: 'Cylinder'
    }, {
        id: 'addDodecahedron',
        text: 'Dodecahedron'
    }, {
        id: 'addExtrude',
        text: 'Extrude'
    }, {
        id: 'addIcosahedron',
        text: 'Icosahedron'
    }, {
        id: 'addLathe',
        text: 'Lathe'
    }, {
        id: 'addOctahedron',
        text: 'Octahedron'
    }, {
        id: 'addParametric',
        text: 'Parametric'
    }, {
        id: 'addPlane',
        text: 'Plane'
    }, {
        id: 'addRing',
        text: 'Ring'
    }, {
        id: 'addSphere',
        text: 'Sphere'
    }, {
        id: 'addTetrahedron',
        text: 'Tetrahedron'
    }, {
        id: 'addTorus',
        text: 'Torus'
    }, {
        id: 'addTorusKnot',
        text: 'Torus Knot'
    }, {
        id: 'addTube',
        text: 'Tube'
    }, {
        id: 'addFire',
        text: 'Fire'
    }]
}, {
    id: 'component',
    text: 'Component',
    children: [{
        id: 'addTransform',
        text: 'Transform'
    }, {
        id: 'addRigidBody',
        text: 'Rigid Body'
    }, {
        id: 'addMaterial',
        text: 'Material'
    }]
}, {
    id: 'run',
    text: 'Run',
    children: [{
        id: 'debug',
        text: 'Debug'
    }, {
        id: 'play',
        text: 'Play'
    }]
}, {
    id: 'help',
    text: 'Help',
    children: [{
        id: 'document',
        text: 'Document'
    }, {
        id: 'about',
        text: 'About'
    }]
}];

export { CustomEvents, NavMenus };