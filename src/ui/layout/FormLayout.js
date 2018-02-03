import { Layout } from '../Layout';

/**
 * @author tengge / https://github.com/tengge1
 */

function FormLayout(options) {
    Layout.call(this, options);
    options = options || {};
}

FormLayout.prototype = Object.create(Layout.prototype);
FormLayout.prototype.constructor = FormLayout;

export { FormLayout };