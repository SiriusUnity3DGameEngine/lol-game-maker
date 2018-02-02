import { Control } from '../Control';

/**
 * @author tengge / https://github.com/tengge1
 */

var ID = -1;

function UiTree(options) {
    Control.call(this, options);
    options = options || {};
    this.id = options.id || 'tree' + ID--;
    this.setting = options.setting || {
        treeId: this.id
    };
    this.data = options.data || [];
}

UiTree.prototype = Object.create(Control.prototype);
UiTree.prototype.constructor = UiTree;

UiTree.prototype.render = function() {
    this.el.ul = document.createElement('ul');
    this.el.ul.className = 'ztree';
    //this.el.ul.setAttribute('id', this.id);
    this.parent.appendChild(this.el.ul);
    $.fn.zTree.init($(this.el.ul), this.setting, this.data);
};

export { UiTree };