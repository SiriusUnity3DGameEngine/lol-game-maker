/**
 * @author tengge / https://github.com/tengge1
 */

function BaseProperty(options) {
    options = options || {};
    this.app = options.app || null;
    this.items = options.item || []; // PropertyItem Array
}

export { BaseProperty };