import { BaseCommand } from './BaseCommand';
import { UiTabsItem } from '../ui/control/UiTabsItem';
import { StandardScene } from '../scene/standard/StandardScene';

/**
 * @author tengge / https://github.com/tengge1
 */

var ID = -1;

function NewStandardSceneCommand(options) {
    BaseCommand.call(this, options);
    options = options || {};
    this.app = options.app || null;
}

NewStandardSceneCommand.prototype = Object.create(BaseCommand.prototype);
NewStandardSceneCommand.prototype.constructor = NewStandardSceneCommand;

NewStandardSceneCommand.prototype.run = function() {
    var scene = new StandardScene({
        app: this.app,
    });
    var tab = new UiTabsItem({
        title: scene.name + ID--,
        closable: true,
        children: [
            scene
        ]
    });
    this.app.mainPanel.add(tab);
};

export { NewStandardSceneCommand };