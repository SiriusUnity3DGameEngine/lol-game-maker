import { BaseCommand } from './BaseCommand';
import { UiTabsItem } from '../ui/control/UiTabsItem';
import { WebGLScene } from '../scene/WebGLScene';

/**
 * @author tengge / https://github.com/tengge1
 */

var ID = -1;

function NewSceneCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.app.scenes = this.app.scenes || {};
}

NewSceneCommand.prototype = Object.create(BaseCommand.prototype);
NewSceneCommand.prototype.constructor = NewSceneCommand;

NewSceneCommand.prototype.run = function() {
    var scene = new WebGLScene({
        app: this.app,
    });
    var tab = new UiTabsItem({
        title: scene.name + ID--,
        closable: true,
        children: [
            scene
        ]
    });
    this.app.scenes[tab.id] = scene;
    this.app.mainPanel.add(tab);
};

export { NewSceneCommand };