import { AddBoxCommand } from './object/AddBoxCommand';
import { AddCircleCommand } from './object/AddCircleCommand';
import { AddConeCommand } from './object/AddConeCommand';
import { AddCylinderCommand } from './object/AddCylinderCommand';

/**
 * @author tengge / https://github.com/tengge1
 */

function CommandDispatcher(options) {
    options = options || {};
    this.app = options.app || null;
    this.commands = [
        new AddBoxCommand({ app: this.app }),
        new AddCircleCommand({ app: this.app }),
        new AddConeCommand({ app: this.app }),
        new AddCylinderCommand({ app: this.app }),
    ];
}

CommandDispatcher.prototype.start = function() {
    this.commands.forEach(function(n) {
        n.init.call(n);
    });
};

export { CommandDispatcher };