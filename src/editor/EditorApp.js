import { EditorUI } from './EditorUI';
import { EventManager } from '../event/EventManager';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorApp(options) {
    options = options || {};
    this.event = options.event || new EventManager({
        app: this
    });
    this.ui = options.ui || new EditorUI({
        app: this
    });
}

EditorApp.prototype.start = function() {
    this.event.call('beforeEditorRender', this);
    this.ui.render();
    this.event.call('editorRender', this);
    this.event.call('editorStart', this);
};

export { EditorApp };