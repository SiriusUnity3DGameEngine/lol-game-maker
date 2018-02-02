import { Control } from '../ui/Control';
import { EditorNavMenu } from './EditorNavMenu';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorNav(options) {
    Control.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.cls = options.cls || 'nav';
    this.menu = new EditorNavMenu({
        app: this.app
    });
    this.app.navMenu = this.menu;
}

EditorNav.prototype = Object.create(Control.prototype);
EditorNav.prototype.constructor = EditorNav;

EditorNav.prototype.render = function() {
    this.el.div = document.createElement('div');
    this.el.div.className = this.cls;
    this.parent.appendChild(this.el.div);

    this.menu.parent = this.el.div;
    this.menu.render();
};

export { EditorNav };