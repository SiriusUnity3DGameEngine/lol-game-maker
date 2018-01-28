import { UiTabs } from '../ui/control/UiTabs';
import { UiTabsItem } from '../ui/control/UiTabsItem';
import { WebGLScene } from '../scene/webgl/WebGLScene';
import { LogScene } from '../scene/log/LogScene';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorMainPanel(options) {
    UiTabs.call(this, options);
    options = options || {};
    this.app = options.app || null;

    this.sceneTab = new UiTabsItem({
        id: 'sceneTab',
        title: 'Scene',
        children: [

        ]
    });
    this.app.sceneTab = this.sceneTab;

    this.logTab = new UiTabsItem({
        id: 'logTab',
        title: 'Logs',
        children: [

        ]
    });
    this.app.logTab = this.logTab;

    this.children = options.children || [
        this.sceneTab,
        this.logTab,
    ];
    this.cls = 'left-panel';
    this.fit = true;
}

EditorMainPanel.prototype = Object.create(UiTabs.prototype);
EditorMainPanel.prototype.constructor = EditorMainPanel;

EditorMainPanel.prototype.render = function() {
    var _this = this;
    this.on('create', function(event, ui) {
        _this.onCreateTabs.call(_this, event, ui);
    });
    this.on('activate', function(event, ui) {
        _this.onActivateTab.call(_this, event, ui);
    });
    this.on('close', function(tabitem) {
        _this.onCloseTab.call(_this, tabitem);
    });
    UiTabs.prototype.render.apply(this, arguments);
};

EditorMainPanel.prototype.onCreateTabs = function(event, ui) {
    this.webglScene = new WebGLScene({
        app: this.app,
        width: ui.panel[0].clientWidth,
        height: ui.panel[0].clientHeight,
    });
    this.app.webglScene = this.webglScene;
    this.sceneTab.add(this.webglScene);
    this.webglScene.start();

    this.logScene = new LogScene({
        app: this.app,
        width: ui.panel[0].clientWidth,
        height: ui.panel[0].clientHeight,
    });
    this.app.logScene = this.logScene;
    this.logTab.add(this.logScene);
    this.logScene.start();
};

EditorMainPanel.prototype.onActivateTab = function(event, ui) {

};

EditorMainPanel.prototype.onCloseTab = function(tabitem) {

};

export { EditorMainPanel };