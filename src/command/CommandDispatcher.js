import { AddBoxCommand } from './object/AddBoxCommand';
import { AddCircleCommand } from './object/AddCircleCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function CommandDispatcher(options) {
    options = options || {};
    this.app = options.app || null;
    this.commands = [
        new AddBoxCommand({ app: this.app }),
        new AddCircleCommand({ app: this.app }),
    ];
}

CommandDispatcher.prototype.start = function() {
    this.commands.forEach(function(n) {
        n.init.call(n);
    });
};

export { CommandDispatcher };