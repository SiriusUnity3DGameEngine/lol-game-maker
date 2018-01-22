import { UiMenu } from '../ui/control/UiMenu'
import { UiMenuItem } from '../ui/control/UiMenuItem'

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorNavMenu(options) {
    UiMenu.call(this, options);
    options = options || {};
    this.cls = 'main-menu';
    this.direction = 'horizontal'
    this.children = options.children || [
        new UiMenuItem({
            text: 'Add',
            children: [
                new UiMenuItem({
                    text: 'Box'
                })
            ]
        }),
        new UiMenuItem({
            text: 'Play'
        })
    ];
}

EditorNavMenu.prototype = Object.create(UiMenu.prototype);
EditorNavMenu.prototype.constructor = EditorNavMenu;

EditorNavMenu.prototype.render = function() {
    UiMenu.prototype.render.apply(this, arguments);
};

export { EditorNavMenu };