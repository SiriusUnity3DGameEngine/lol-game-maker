import { Layout } from '../Layout';

/**
 * @author tengge / https://github.com/tengge1
 */

function HBoxLayout(options) {
    Layout.call(this, options);
    options = options || {};
}

HBoxLayout.prototype = Object.create(Layout.prototype);
HBoxLayout.prototype.constructor = HBoxLayout;

export { HBoxLayout };