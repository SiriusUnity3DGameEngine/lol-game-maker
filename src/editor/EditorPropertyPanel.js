import { Control } from '../ui/Control';
import { TabPanel } from '../ui/control/TabPanel';
import { TabItem } from '../ui/control/TabItem';
import { Tree } from '../ui/control/Tree';
import { EditorSettings } from './settings/EditorSettings';
import { PropertyPanel } from '../property/PropertyPanel';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorPropertyPanel(options) {
    Control.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.cls = 'right-panel ui-widget-content';

    this.hierarchyPanel = new Tree({
        data: [{
            name: 'Camera'
        }, {
            name: 'Light'
        }]
    });
    this.app.hierarchyPanel = this.hierarchyPanel;

    this.editorSettingsPanel = new EditorSettings({ app: this.app });
    this.app.editorSettingsPanel = this.editorSettingsPanel;

    this.topPanel = new TabPanel({
        fit: true,
        children: [
            new TabItem({
                title: 'Hierarchy',
                overflow: 'scroll',
                children: [
                    this.hierarchyPanel
                ]
            }),
            new TabItem({
                title: 'Settings',
                overflow: 'scroll',
                children: [
                    this.editorSettingsPanel
                ]
            }),
        ]
    });

    this.propertyPanel = new PropertyPanel({ app: this.app });

    this.bottomPanel = new TabPanel({
        fit: true,
        children: [
            new TabItem({
                title: 'Property',
                overflow: 'scroll',
                children: [this.propertyPanel]
            }),
            new TabItem({
                title: 'Animation',
                overflow: 'scroll',
                html: 'content 2'
            }),
        ]
    });

    this.app.topPanel = this.topPanel;
    this.app.bottomPanel = this.bottomPanel;
}

EditorPropertyPanel.prototype = Object.create(Control.prototype);
EditorPropertyPanel.prototype.constructor = EditorPropertyPanel;

EditorPropertyPanel.prototype.render = function() {
    this.el.div = document.createElement('div');
    this.el.div.className = this.cls;
    this.parent.appendChild(this.el.div);

    this.el.topDiv = document.createElement('div');
    this.el.topDiv.style.height = '50%';
    this.el.div.appendChild(this.el.topDiv);

    this.el.bottomDiv = document.createElement('div');
    this.el.bottomDiv.style.height = '50%';
    this.el.div.appendChild(this.el.bottomDiv);

    this.topPanel.parent = this.el.topDiv;
    this.topPanel.render();

    this.bottomPanel.parent = this.el.bottomDiv;
    this.bottomPanel.render();
};

export { EditorPropertyPanel };