import { AddBoxCommand } from './object/AddBoxCommand';
import { AddCircleCommand } from './object/AddCircleCommand';
import { AddConeCommand } from './object/AddConeCommand';
import { AddCylinderCommand } from './object/AddCylinderCommand';
import { AddDodecahedronCommand } from './object/AddDodecahedronCommand';
import { AddExtrudeCommand } from './object/AddExtrudeCommand';
import { AddIcosahedronCommand } from './object/AddIcosahedronCommand';
import { AddLatheCommand } from './object/AddLatheCommand';
import { AddOctahedronCommand } from './object/AddOctahedronCommand';
import { AddParametricCommand } from './object/AddParametricCommand';
import { AddPlaneCommand } from './object/AddPlaneCommand';
import { AddRingCommand } from './object/AddRingCommand';
import { AddSphereCommand } from './object/AddSphereCommand';
import { AddTetrahedronCommand } from './object/AddTetrahedronCommand';
import { AddTorusCommand } from './object/AddTorusCommand';
import { AddTorusKnotCommand } from './object/AddTorusKnotCommand';
import { AddTubeCommand } from './object/AddTubeCommand';
import { AddFireCommand } from './object/AddFireCommand';
import { AddHeroCommand } from './object/AddHeroCommand';

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
        new AddOctahedronCommand({ app: this.app }),
        new AddParametricCommand({ app: this.app }),
        new AddPlaneCommand({ app: this.app }),
        new AddRingCommand({ app: this.app }),
        new AddSphereCommand({ app: this.app }),
        new AddTetrahedronCommand({ app: this.app }),
        new AddTorusCommand({ app: this.app }),
        new AddTorusKnotCommand({ app: this.app }),
        new AddTubeCommand({ app: this.app }),
        new AddFireCommand({ app: this.app }),
        new AddHeroCommand({ app: this.app }),
    ];
}

CommandDispatcher.prototype.start = function() {
    this.commands.forEach(function(n) {
        n.init.call(n);
    });
};

export { CommandDispatcher };