import { BaseCommand } from './BaseCommand';
import { UiTabsItem } from '../ui/control/UiTabsItem';
import { WebGLScene } from '../scene/webgl/WebGLScene';

/**
 * @author tengge / https://github.com/tengge1
 */

var ID = -1;

function NewSceneCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
    this.app = options.app || null;
}

NewSceneCommand.prototype = Object.create(BaseCommand.prototype);
NewSceneCommand.prototype.constructor = NewSceneCommand;

NewSceneCommand.prototype.run = function() {
    var scene = new WebGLScene({
        app: this.app,
    });
    var tab = new UiTabsItem({
        title: 'Scene' + ID--,
        closable: true,
        children: [
            scene
        ]
    });
    this.app.mainPanel.add(tab);
};

export { NewSceneCommand };