import { UiControl } from '../ui/UiControl';
import { EditorNav } from './EditorNav';
import { EditorBox } from './EditorBox';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorUI(options) {
    UiControl.call(this, options);
    options = options || {};
    this.nav = options.nav || new EditorNav();
    this.box = options.box || new EditorBox();
}

EditorUI.prototype = Object.create(UiControl.prototype);
EditorUI.prototype.constructor = EditorUI;

EditorUI.prototype.render = function() {
    this.nav.parent = this.parent;
    this.box.parent = this.parent;
    this.nav.render();
    this.box.render();
};

export { EditorUI };