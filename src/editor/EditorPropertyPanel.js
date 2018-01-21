import { UiAccordion } from '../ui/control/UiAccordion';
import { UiAccordionItem } from '../ui/control/UiAccordionItem';

/**
 * @author tengge / https://github.com/tengge1
 */

function EditorPropertyPanel(options) {
    UiAccordion.call(this, options);
    options = options || {};
    this.cls = 'right-panel ui-widget-content';
    this.fit = true;
    this.children = options.children || [
        new UiAccordionItem({ title: 'Property', html: 'content 1' }),
        new UiAccordionItem({ title: 'Action', html: 'content 2' }),
        new UiAccordionItem({ title: 'Script', html: 'content 3' }),
    ];
}

EditorPropertyPanel.prototype = Object.create(UiAccordion.prototype);
EditorPropertyPanel.prototype.constructor = EditorPropertyPanel;

EditorPropertyPanel.prototype.render = function() {
    UiAccordion.prototype.render.apply(this, arguments);
};

export { EditorPropertyPanel };