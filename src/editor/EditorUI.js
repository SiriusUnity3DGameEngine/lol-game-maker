import { Control } from '../ui/Control';
import { EditorNav } from './EditorNav';
import { EditorBox } from './EditorBox';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorUI(options) {
    Control.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.nav = options.nav || new EditorNav({
        app: this.app
    });
    this.box = options.box || new EditorBox({
        app: this.app
    });
    this.app.nav = this.nav;
    this.app.box = this.box;
}

EditorUI.prototype = Object.create(Control.prototype);
EditorUI.prototype.constructor = EditorUI;

EditorUI.prototype.render = function() {
    this.nav.parent = this.parent;
    this.box.parent = this.parent;
    this.nav.render();
    this.box.render();
};

export { EditorUI };