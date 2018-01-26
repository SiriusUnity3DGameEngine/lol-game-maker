import { NewSceneCommand } from '../command/NewSceneCommand';
import { NewStandardSceneCommand } from '../command/NewStandardSceneCommand';
import { AddObjectCommand } from '../command/AddObjectCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function CommandDispatcher(options) {
    options = options || {};
    this.app = options.app || null;
}

CommandDispatcher.prototype.dispatch = function(commandName) {
    var cmd;
    switch (commandName) {
        case 'newScene':
            cmd = new NewSceneCommand({
                app: this.app
            });
            cmd.run();
            break;
        case 'newStandardScene':
            cmd = new NewStandardSceneCommand({
                app: this.app
            });
            cmd.run();
            break;
        case 'addBox':
            cmd = new AddObjectCommand({
                app: this.app,
                geometry: 'BoxGeometry'
            });
            cmd.run();
            break;
        case 'addCircle':
            cmd = new AddObjectCommand({
                app: this.app,
                geometry: 'CircleGeometry'
            });
            cmd.run();
            break;
        case 'addCone':
            break;
        case 'addCylinder':
            break;
        case 'addDodecahedron':
            break;
        case 'addExtrude':
            break;
        case 'addIcosahedron':
            break;
        case 'addLathe':
            break;
        case 'addOctahedron':
            break;
        case 'addParametric':
            break;
        case 'addPlane':
            break;
        case 'addRing':
            break;
        case 'addSphere':
            break;
        case 'addTetrahedron':
            break;
        case 'addText':
            break;
        case 'addTorus':
            break;
        case 'addTorusKnot':
            break;
        case 'addTube':
            break;
        default:
            console.log('CommandDispatcher:' + commandName + 'is not found.');
            break;
    }
};

export { CommandDispatcher };