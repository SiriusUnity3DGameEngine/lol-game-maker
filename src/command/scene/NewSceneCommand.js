import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function NewSceneCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

NewSceneCommand.prototype = Object.create(BaseCommand.prototype);
NewSceneCommand.prototype.constructor = NewSceneCommand;

NewSceneCommand.prototype.run = function() {

};

export { NewSceneCommand };