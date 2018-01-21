import { UiControl } from '../ui/UiControl';
import { EditorMainPanel } from './EditorMainPanel';
import { EditorPropertyPanel } from './EditorPropertyPanel.js';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorBox(options) {
    UiControl.call(this, options);
    options = options || {};
    this.cls = options.cls || 'box';
    this.leftPanel = options.leftPanel || new EditorMainPanel();
    this.rightPanel = options.rightPanel || new EditorPropertyPanel();
}

EditorBox.prototype = Object.create(UiControl.prototype);
EditorBox.prototype.constructor = EditorBox;

EditorBox.prototype.render = function() {
    this.el.div = document.createElement('div');
    this.el.div.className = this.cls;
    this.parent.appendChild(this.el.div);
    this.leftPanel.parent = this.el.div;
    this.leftPanel.render();
    this.rightPanel.parent = this.el.div;
    this.rightPanel.render();
};

export { EditorBox };