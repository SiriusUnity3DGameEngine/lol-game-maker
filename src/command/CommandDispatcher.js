import { AddBoxCommand } from './object/AddBoxCommand';
import { AddCircleCommand } from './object/AddCircleCommand';
import { AddConeCommand } from './object/AddConeCommand';
import { AddCylinderCommand } from './object/AddCylinderCommand';
import { AddDodecahedronCommand } from './object/AddDodecahedronCommand';
import { AddExtrudeCommand } from './object/AddExtrudeCommand';
import { AddIcosahedronCommand } from './object/AddIcosahedronCommand';
import { AddLatheCommand } from './object/AddLatheCommand';

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
        new AddDodecahedronCommand({ app: this.app }),
        new AddExtrudeCommand({ app: this.app }),
        new AddIcosahedronCommand({ app: this.app }),
        new AddLatheCommand({ app: this.app }),
    ];
}

CommandDispatcher.prototype.start = function() {
    this.commands.forEach(function(n) {
        n.init.call(n);
    });
};

export { CommandDispatcher };