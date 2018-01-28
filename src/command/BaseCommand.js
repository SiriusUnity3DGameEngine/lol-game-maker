/**
 * @author tengge / https://github.com/tengge1
 */

function BaseCommand(options) {
    options = options || {};
    this.app = options.app || null;
    this.enabled = options.enabled || true;
}

BaseCommand.prototype.enable = function() {
    this.enabled = true;
};

BaseCommand.prototype.disable = function() {
    this.enabled = false;
};

/**
 * Run the command when hear the specific custom event.
 */
BaseCommand.prototype.init = function() {

};

BaseCommand.prototype.run = function() {

};

BaseCommand.prototype.undo = function() {

};

BaseCommand.prototype.redo = function() {

};

export { BaseCommand };