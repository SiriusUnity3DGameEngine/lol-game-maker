import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

var ID = -1;

function Tree(options) {
    Control.call(this, options);
    options = options || {};
    this.id = options.id || 'tree' + ID--;
    this.setting = options.setting || {
        treeId: this.id
    };
    this.data = options.data || [];
}

Tree.prototype = Object.create(Control.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.render = function() {
    this.el.ul = document.createElement('ul');
    this.el.ul.className = 'ztree';
    //this.el.ul.setAttribute('id', this.id);
    this.parent.appendChild(this.el.ul);
    $.fn.zTree.init($(this.el.ul), this.setting, this.data);
};

export { Tree };