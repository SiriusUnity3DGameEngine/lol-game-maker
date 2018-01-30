import { UiControl } from '../ui/UiControl';
import { UiTabs } from '../ui/control/UiTabs';
import { UiTabsItem } from '../ui/control/UiTabsItem';
import { UiAccordion } from '../ui/control/UiAccordion';
import { UiAccordionItem } from '../ui/control/UiAccordionItem';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorPropertyPanel(options) {
    UiControl.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.cls = 'right-panel ui-widget-content';

    this.topPanel = new UiTabs({
        fit: true,
        children: [
            new UiTabsItem({ title: 'Hierarchy', html: 'content 1' }),
            new UiTabsItem({ title: 'Settings', html: 'content 2' }),
        ]
    });
    this.bottomPanel = new UiTabs({
        fit: true,
        children: [
            new UiTabsItem({ title: 'Property', html: 'content 1' }),
            new UiTabsItem({ title: 'Animation', html: 'content 2' }),
        ]
    });
}

EditorPropertyPanel.prototype = Object.create(UiControl.prototype);
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