import { Control } from '../ui/Control';
import { UiTabs } from '../ui/control/UiTabs';
import { UiTabsItem } from '../ui/control/UiTabsItem';
import { UiTree } from '../ui/control/UiTree';
import { EditorSettings } from './settings/EditorSettings';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorPropertyPanel(options) {
    Control.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.cls = 'right-panel ui-widget-content';

    this.hierarchy = new UiTree({
        data: [{
            name: 'Camera'
        }, {
            name: 'Light'
        }]
    });
    this.app.hierarchy = this.hierarchy;

    this.editorSettings = new EditorSettings({ app: this.app });
    this.app.editorSettings = this.editorSettings;
    this.topPanel = new UiTabs({
        fit: true,
        children: [
            new UiTabsItem({
                title: 'Hierarchy',
                children: [
                    this.hierarchy
                ]
            }),
            new UiTabsItem({
                title: 'Settings',
                children: [
                    this.editorSettings
                ]
            }),
        ]
    });
    this.bottomPanel = new UiTabs({
        fit: true,
        children: [
            new UiTabsItem({ title: 'Property', html: 'content 1' }),
            new UiTabsItem({ title: 'Animation', html: 'content 2' }),
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