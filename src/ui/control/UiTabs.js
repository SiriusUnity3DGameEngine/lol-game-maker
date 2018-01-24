import { UiControl } from '../UiControl';

/**
 * @author tengge / https://github.com/tengge1
 */

function UiTabs(options) {
    UiControl.call(this, options);
    options = options || {};
    this.children = options.children || [];
    this.width = options.width || null;
    this.cls = options.cls || null;
    this.fit = options.fit || false;
    this.sortable = options.sortable || true;
}

UiTabs.prototype = Object.create(UiControl.prototype);
UiTabs.prototype.constructor = UiTabs;

UiTabs.prototype.refresh = function() {
    $(this.el.div).tabs('refresh');
};

UiTabs.prototype.add = function(control) {
    this.children.push(control);
    control.parent = this.el.div;
    control.render.call(control);
    this.refresh();
    $(this.el.div).tabs('option', 'active', this.children.length - 1);
    this.refresh();
};

UiTabs.prototype.insert = function(index, control) {
    this.children.splice(index, 0, control);
    control.parent = this.el.div;
    control.render.call(control);
    this.refresh();
    //$(this.el.div).tabs('option', 'active', index);
    //this.refresh();
};

UiTabs.prototype.remove = function(control) {
    var index = this.children.indexOf(control);
    if (index > -1) {
        this.children.splice(index, 1);
        control.close();
        this.refresh();
    }
};

UiTabs.prototype.removeAt = function(index) {
    var control = this.children[index];
    control.close();
    this.children.splice(index, 1);
    this.refresh();
};

UiTabs.prototype.render = function() {
    this.el.div = document.createElement('div');
    this.el.div.className = this.cls;
    this.el.div.style.width = this.width;
    this.parent.appendChild(this.el.div);
    this.el.ul = document.createElement('ul');
    this.el.div.appendChild(this.el.ul);
    var _this = this;
    this.children.forEach(function(n) {
        n.parent = _this.el.div;
        n.render.call(n);
    });
    if (this.fit) {
        $(this.el.div).tabs({
            heightStyle: "fill"
        });
    } else {
        $(this.el.div).tabs();
    }
    if (this.sortable) {
        var _this = this;
        $(this.el.div).find('.ui-tabs-nav').sortable({
            axis: 'x',
            stop: function() {
                $(_this.el.div).tabs('refresh');
            }
        });
    }
};

export { UiTabs };