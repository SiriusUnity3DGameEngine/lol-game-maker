import { UiTabs } from '../ui/control/UiTabs';
import { UiTabsItem } from '../ui/control/UiTabsItem';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorMainPanel(options) {
    UiTabs.call(this, options);
    options = options || {};
    this.children = options.children || [
        new UiTabsItem({ title: 'Svg Scene' }),
        new UiTabsItem({ title: 'WebGL Scene' }),
        new UiTabsItem({ title: 'Logs' }),
    ];
    this.cls = 'left-panel';
}

EditorMainPanel.prototype = Object.create(UiTabs.prototype);
EditorMainPanel.prototype.constructor = EditorMainPanel;

EditorMainPanel.prototype.render = function() {
    UiTabs.prototype.render.apply(this, arguments);
};

export { EditorMainPanel };