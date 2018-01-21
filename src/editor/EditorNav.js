import { UiControl } from '../ui/UiControl';
import { EditorNavMenu } from './EditorNavMenu';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorNav(options) {
    UiControl.call(this, options);
    options = options || {};
    this.cls = options.cls || 'nav';
    this.menu = new EditorNavMenu();
}

EditorNav.prototype = Object.create(UiControl.prototype);
EditorNav.prototype.constructor = EditorNav;

EditorNav.prototype.render = function() {
    this.el.div = document.createElement('div');
    this.el.div.className = this.cls;
    this.parent.appendChild(this.el.div);

    this.menu.parent = this.el.div;
    this.menu.render();
};

export { EditorNav };