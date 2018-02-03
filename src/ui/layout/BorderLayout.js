import { Layout } from '../Layout';

/**
 * @author tengge / https://github.com/tengge1
 */

function BorderLayout(options) {
    Layout.call(this, options);
    options = options || {};
}

BorderLayout.prototype = Object.create(Layout.prototype);
BorderLayout.prototype.constructor = BorderLayout;

export { BorderLayout };