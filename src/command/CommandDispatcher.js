import { NewSceneCommand } from '../command/NewSceneCommand';
import { NewStandardSceneCommand } from '../command/NewStandardSceneCommand';

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
            cmd = new AddBasicObjectCommand({
                app: this.app,
                geometry: 'BoxGeometry'
            });
            cmd.run();
            break;
        default:
            console.log('CommandDispatcher:' + commandName + 'is not found.');
            break;
    }
};

export { CommandDispatcher };