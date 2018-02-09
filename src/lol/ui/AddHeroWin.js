import { Dialog } from '../../ui/control/Dialog';
import { Tree } from '../../ui/control/Tree';
import { champions } from '../constant';
import { Model } from '../model/Model';

/**
 * @author tengge / https://github.com/tengge1
 */

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
    var id = treeNode.id;
    var model = new Model({
        app: app
    });
    model.load('models/1_0.lmesh');
    var _this = this;
    app.event.on('loadMesh', function() {
        var geometry = model.geometry;
        var material = model.material;
        var mesh = new THREE.Mesh(geometry, material);
        _this.app.scene.add(mesh);

        model.setAnimation('idle');

        _this.app.on('onAnimate', function(clock) {
            model.update(clock.getElapsedTime() * 1000);
        });
    });
};

export { AddHeroWin };