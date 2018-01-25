import { UiTabs } from '../ui/control/UiTabs';
import { UiTabsItem } from '../ui/control/UiTabsItem';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorMainPanel(options) {
    UiTabs.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.children = options.children || [
        new UiTabsItem({
            title: 'Home Page',
            html: 'Welcome to use Open Sea AI.<br />Github: https://github.com/tengge1/OpenSeaAI'
        }),
    ];
    this.cls = 'left-panel';
    this.fit = true;
}

EditorMainPanel.prototype = Object.create(UiTabs.prototype);
EditorMainPanel.prototype.constructor = EditorMainPanel;

EditorMainPanel.prototype.render = function() {
    UiTabs.prototype.render.apply(this, arguments);
};

export { EditorMainPanel };