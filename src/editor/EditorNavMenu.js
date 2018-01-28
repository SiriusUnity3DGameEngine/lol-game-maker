import { UiMenu } from '../ui/control/UiMenu'
import { UiMenuItem } from '../ui/control/UiMenuItem'
import { NavMenus } from '../constant';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorNavMenu(options) {
    UiMenu.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.cls = 'main-menu';
    this.direction = 'horizontal'
    this.children = options.children || [];
    var _this = this;
    NavMenus.forEach(function(n) {
        var item = new UiMenuItem({
            id: n.id,
            text: n.text,
            children: []
        });
        if (n.children) {
            n.children.forEach(function(m) {
                var subitem = new UiMenuItem({
                    id: m.id,
                    text: m.text
                });
                item.children.push(subitem);
            });
        }
        _this.children.push(item);
    });
}

EditorNavMenu.prototype = Object.create(UiMenu.prototype);
EditorNavMenu.prototype.constructor = EditorNavMenu;

EditorNavMenu.prototype.render = function() {
    UiMenu.prototype.render.apply(this, arguments);
    var _this = this;
    this.on('select', function(event, ui) {
        var id = ui.item[0].id;
        this.app.event.call(id);
        _this.collapseAll();
    });
};

export { EditorNavMenu };