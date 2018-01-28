import { EditorUI } from './EditorUI';
import { EventManager } from '../event/EventManager';
import { CommandDispatcher } from '../command/CommandDispatcher';

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
    this.cmdDispatcher = new CommandDispatcher({
        app: this
    });
}

EditorApp.prototype.start = function() {
    this.event.call('beforeEditorRender', this);
    this.ui.render();
    this.cmdDispatcher.start();
    this.event.call('editorRender', this);
    this.event.call('editorStart', this);
};

export { EditorApp };