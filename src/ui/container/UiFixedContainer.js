import { UiContainer } from '../UiContainer';

function UiFixedContainer(options) {
    UiContainer.call(this, options);
    this.children = options.children || [];
    this.width = options.width || '220px'
    this.height = options.height || '120px';
    this.margin = options.margin || '10px';
    this.padding = options.padding || '2px';
    this.display = options.display || 'block';
    this.borderWidth = options.borderWidth || '2px';
    this.borderColor = options.borderColor || 'black';
    this.borderStyle = options.borderStyle || 'solid';
    this.float = options.float || null;
    this.html = options.html || null;
}

UiFixedContainer.prototype = Object.create(UiContainer.prototype);
UiFixedContainer.prototype.constructor = UiFixedContainer;

UiFixedContainer.prototype.render = function() {
    this.el = document.createElement('div');
    this.el.style.width = this.width;
    this.el.style.height = this.height;
    this.el.style.borderWidth = this.borderWidth;
    this.el.style.borderColor = this.borderColor;
    this.el.style.borderStyle = this.borderStyle;
    this.el.style.margin = this.margin;
    this.el.style.padding = this.padding;
    this.el.style.display = this.display;
    this.el.style.float = this.float;
    this.parent.append(this.el);
    if (this.html) {
        this.el.innerHTML = this.html;
    }
    var _this = this;
    this.children.forEach(function(n, i) {
        n.parent = _this.el;
        n.render.call(n);
    });
};

export { UiFixedContainer };