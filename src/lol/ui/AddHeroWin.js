import { Dialog } from '../../ui/control/Dialog';
import { Tree } from '../../ui/control/Tree';
import { champions } from '../constant';
import { Model } from '../model/Model';

/**
 * @author tengge / https://github.com/tengge1
 */

var ID = -1;

function AddHeroWin(options) {
    Dialog.call(this, options);
    options = options || {};
    this.app = options.app || null;
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
    var _this = this;
    this.tree.on('click', function(event, treeId, treeNode, clickFlag) {
        _this.onClick(event, treeId, treeNode, clickFlag);
    });
};

AddHeroWin.prototype.onClick = function(event, treeId, treeNode, clickFlag) {
    var id = 'hero' + ID--;
    var model = new Model({
        champion: treeNode.id
    });
    model.load();
    var _this = this;
    model.on('load', function() {
        var geometry = model.geometry;
        var material = model.material;
        var mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(0.1, 0.1, 0.1);
        _this.app.scene.add(mesh);

        model.setAnimation('idle');

        _this.app.on('onAnimate.' + id, function(clock) {
            model.update(clock.getElapsedTime() * 1000);
        });
    });
};

export { AddHeroWin };