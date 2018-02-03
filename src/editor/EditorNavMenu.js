import { Menu } from '../ui/control/Menu'
import { MenuItem } from '../ui/control/MenuItem'
import { NavMenus } from '../constant';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorNavMenu(options) {
    Menu.call(this, options);
    options = options || {};
    this.app = options.app || null;
    this.cls = 'main-menu';
    this.direction = 'horizontal'
    this.children = options.children || [];
    var _this = this;
    NavMenus.forEach(function(n) {
        var item = new MenuItem({
            id: n.id,
            text: n.text,
            children: []
        });
        if (n.children) {
            n.children.forEach(function(m) {
                var subitem = new MenuItem({
                    id: m.id,
                    text: m.text
                });
                item.children.push(subitem);
            });
        }
        _this.children.push(item);
    });
}

EditorNavMenu.prototype = Object.create(Menu.prototype);
EditorNavMenu.prototype.constructor = EditorNavMenu;

EditorNavMenu.prototype.render = function() {
    Menu.prototype.render.apply(this, arguments);
    var _this = this;
    this.on('select', function(event, ui) {
        var id = ui.item[0].id;
        this.app.event.call(id);
        _this.collapseAll();
    });
};

export { EditorNavMenu };