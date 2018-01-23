import { EditorUI } from './EditorUI';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorApp(options) {
    options = options || {};
    this.ui = options.ui || new EditorUI({
        app: this
    });
}

EditorApp.prototype.start = function() {
    this.ui.render();
};

export { EditorApp };