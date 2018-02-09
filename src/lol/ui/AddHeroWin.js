import { Dialog } from '../../ui/control/Dialog';
import { Tree } from '../../ui/control/Tree';
import { champions } from '../constant';

/**
 * @author tengge / https://github.com/tengge1
 */

function AddHeroWin(options) {
    Dialog.call(this, options);
    options = options || {};
    this.title = 'Add Hero';
    this.width = 200;
    this.height = 500;
    this.tree = new Tree({
        data: champions
    });
}

AddHeroWin.prototype = Object.create(Dialog.prototype);
AddHeroWin.prototype.constructor = AddHeroWin;

AddHeroWin.prototype.render = function() {
    Dialog.prototype.render.call(this);
    this.tree.parent = this.el.div;
    this.tree.render();
};

export { AddHeroWin };