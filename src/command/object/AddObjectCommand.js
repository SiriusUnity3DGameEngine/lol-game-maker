import { BaseCommand } from '../BaseCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddObjectCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddObjectCommand.prototype = Object.create(BaseCommand.prototype);
AddObjectCommand.prototype.constructor = AddObjectCommand;

AddObjectCommand.prototype.run = function() {

};

export { AddObjectCommand };