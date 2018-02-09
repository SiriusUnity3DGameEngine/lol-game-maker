import { BaseCommand } from '../BaseCommand';
import { Lol } from '../../lol/Lol';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddHeroCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
}

AddHeroCommand.prototype = Object.create(BaseCommand.prototype);
AddHeroCommand.prototype.constructor = AddHeroCommand;

AddHeroCommand.prototype.init = function() {
    var _this = this;
    this.app.event.on('addHeroWin.command', function() {
        _this.run.call(_this);
    });
};

AddHeroCommand.prototype.run = function() {
    var win = new Lol.AddHeroWin();
    win.render();
};

export { AddHeroCommand };