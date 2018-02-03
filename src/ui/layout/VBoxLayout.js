import { Layout } from '../Layout';

/**
 * @author tengge / https://github.com/tengge1
 */

function VBoxLayout(options) {
    Layout.call(this, options);
    options = options || {};
}

VBoxLayout.prototype = Object.create(Layout.prototype);
VBoxLayout.prototype.constructor = VBoxLayout;

export { VBoxLayout };