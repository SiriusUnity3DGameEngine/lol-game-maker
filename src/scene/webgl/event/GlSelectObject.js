import { GlControl } from '../control/GlControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function GlSelectObject(options) {
    GlControl.call(this, options);
    options = options || {};
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
}

GlSelectObject.prototype = Object.create(GlControl.prototype);
GlSelectObject.prototype.constructor = GlSelectObject;

GlSelectObject.prototype.start = function() {
    var _this = this;
    this.app.glEvent.on('click.selectObject', function() {
        _this.onClick.call(_this, d3.event);
    });
    this.app.glEvent.on('dblclick.selectObject', function() {
        _this.onDblClick.call(_this, d3.event);
    });
}

GlSelectObject.prototype.onClick = function() {
    this.mouse.x = (event.offsetX / this.app.sceneWidth) * 2 - 1;
    this.mouse.y = -(event.offsetY / this.app.sceneHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.app.camera);
    var _this = this;
    this.raycaster.intersectObjects(this.app.scene.children)
        .filter(function(o) {
            return o.object instanceof THREE.Mesh &&
                o.object != _this.app.gridHelper;
        }).forEach(function(n) {
            if (n.object.material.oldColor == null ||
                n.object.material.color.getHex() == n.object.material.oldColor.getHex()) {
                // unselect object first
                _this.unselectObject.call(_this);

                // select new object
                n.object.material.oldColor = n.object.material.color;
                n.object.material.color = new THREE.Color(0xffff00);
                n.object.material.needsUpdate = true;
                _this.app.selected = n.object;
                _this.app.event.call('selectObject', _this, n);
            }
        });
};

GlSelectObject.prototype.unselectObject = function() {
    if (this.app.selected) {
        this.app.selected.material.color = this.app.selected.material.oldColor;
        this.app.selected.material.needsUpdate = true;
        this.app.event.call('unselectObject', this);
        this.app.selected = null;
    }
};

GlSelectObject.prototype.onDblClick = function() {
    this.mouse.x = (event.offsetX / this.app.sceneWidth) * 2 - 1;
    this.mouse.y = -(event.offsetY / this.app.sceneHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.app.camera);
    var _this = this;
    this.app.scene.children.forEach(function(n) {
        if (n == _this.app.gridHelper) {
            return true;
        }
        if (n instanceof THREE.Mesh &&
            n.material.oldColor != null &&
            n.material.color.getHex() != n.material.oldColor.getHex()) {
            n.material.color = n.material.oldColor;
            n.material.needsUpdate = true;
        }
    });
    this.app.selected = null;
};

export { GlSelectObject };