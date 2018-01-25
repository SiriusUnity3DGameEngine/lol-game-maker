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
    this.dispatch = d3.dispatch('activate', 'beforeActivate', 'beforeLoad', 'create', 'load');
}

UiTabs.prototype = Object.create(UiControl.prototype);
UiTabs.prototype.constructor = UiTabs;

UiTabs.prototype.refresh = function() {
    $(this.el.div).tabs('refresh');
};

UiTabs.prototype.add = function(control) {
    this.children.push(control);
    control.parent = this.el.div;
    control.tabs = this;
    control.render.call(control);
    this.refresh();
    $(this.el.div).tabs('option', 'active', this.children.length - 1);
    this.refresh();
};

UiTabs.prototype.insert = function(index, control) {
    this.children.splice(index, 0, control);
    control.parent = this.el.div;
    control.tabs = this;
    control.render.call(control);
    this.refresh();
    $(this.el.div).tabs('option', 'active', index);
    this.refresh();
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
        n.tabs = _this;
        n.render.call(n);
    });
    $(this.el.div).tabs({
        heightStyle: this.fit ? "fill" : null,
        activate: function(event, ui) {
            _this.dispatch.call('activate', _this, event, ui);
        },
        beforeActivate: function(event, ui) {
            _this.dispatch.call('beforeActivate', _this, event, ui);
        },
        beforeLoad: function(event, ui) {
            _this.dispatch.call('beforeLoad', _this, event, ui);
        },
        create: function(event, ui) {
            _this.dispatch.call('create', _this, event, ui);
        },
        load: function(event, ui) {
            _this.dispatch.call('load', _this, event, ui);
        },
    });
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

UiTabs.prototype.on = function(eventName, callback) {
    this.dispatch.on(eventName, callback);
};

export { UiTabs };