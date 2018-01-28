import { UiMenu } from '../ui/control/UiMenu'
import { UiMenuItem } from '../ui/control/UiMenuItem'
import { CommandDispatcher } from '../command/CommandDispatcher';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorNavMenu(options) {
    UiMenu.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.cls = 'main-menu';
    this.direction = 'horizontal'
    this.dispatcher = new CommandDispatcher({
        app: this.app
    });
    this.app.dispatcher = this.dispatcher;
    this.children = options.children || [
        new UiMenuItem({
            text: 'Scene',
            children: [
                new UiMenuItem({
                    id: 'newScene',
                    text: 'New Scene'
                })
            ]
        }),
        new UiMenuItem({
            text: 'Edit',
            children: [
                new UiMenuItem({
                    text: 'Undo',
                }),
                new UiMenuItem({
                    text: 'Redo'
                })
            ]
        }),
        new UiMenuItem({
            text: 'View',
            children: [
                new UiMenuItem({
                    text: 'Property Panel'
                }),
                new UiMenuItem({
                    text: 'Log Panel'
                }),
            ]
        }),
        new UiMenuItem({
            text: 'Object',
            children: [
                new UiMenuItem({
                    id: 'addBox',
                    text: 'Box'
                }),
                new UiMenuItem({
                    id: 'addCircle',
                    text: 'Circle'
                }),
                new UiMenuItem({
                    id: 'addCone',
                    text: 'Cone'
                }),
                new UiMenuItem({
                    id: 'addCylinder',
                    text: 'Cylinder'
                }),
                new UiMenuItem({
                    id: 'addDodecahedron',
                    text: 'Dodecahedron'
                }),
                new UiMenuItem({
                    id: 'addExtrude',
                    text: 'Extrude'
                }),
                new UiMenuItem({
                    id: 'addIcosahedron',
                    text: 'Icosahedron'
                }),
                new UiMenuItem({
                    id: 'addLathe',
                    text: 'Lathe'
                }),
                new UiMenuItem({
                    id: 'addOctahedron',
                    text: 'Octahedron'
                }),
                new UiMenuItem({
                    id: 'addParametric',
                    text: 'Parametric'
                }),
                new UiMenuItem({
                    id: 'addPlane',
                    text: 'Plane'
                }),
                new UiMenuItem({
                    id: 'addRing',
                    text: 'Ring'
                }),
                new UiMenuItem({
                    id: 'addSphere',
                    text: 'Sphere'
                }),
                new UiMenuItem({
                    id: 'addTetrahedron',
                    text: 'Tetrahedron'
                }),
                new UiMenuItem({
                    id: 'addText',
                    text: 'Text'
                }),
                new UiMenuItem({
                    id: 'addTorus',
                    text: 'Torus'
                }),
                new UiMenuItem({
                    id: 'addTorusKnot',
                    text: 'Torus Knot'
                }),
                new UiMenuItem({
                    id: 'addTube',
                    text: 'Tube'
                })
            ]
        }),
        new UiMenuItem({
            text: 'Component',
            children: [
                new UiMenuItem({
                    text: 'Transform'
                }),
                new UiMenuItem({
                    text: 'Rigid Body'
                }),
                new UiMenuItem({
                    text: 'Material'
                }),
            ]
        }),
        new UiMenuItem({
            text: 'Control',
            children: [
                new UiMenuItem({
                    text: 'Play'
                })
            ]
        }),
        new UiMenuItem({
            text: 'Help',
            children: [
                new UiMenuItem({
                    text: 'Document'
                }),
                new UiMenuItem({
                    text: 'About'
                }),
            ]
        })
    ];
}

EditorNavMenu.prototype = Object.create(UiMenu.prototype);
EditorNavMenu.prototype.constructor = EditorNavMenu;

EditorNavMenu.prototype.render = function() {
    UiMenu.prototype.render.apply(this, arguments);
    var _this = this;
    this.on('select', function(event, ui) {
        var id = ui.item[0].id;
        this.dispatcher.dispatch(id);
    });
};

export { EditorNavMenu };