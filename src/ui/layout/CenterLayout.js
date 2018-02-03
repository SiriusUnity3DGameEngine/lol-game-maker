import { Layout } from '../Layout';

/**
 * @author tengge / https://github.com/tengge1
 */

function CenterLayout(options) {
    Layout.call(this, options);
    options = options || {};
}

CenterLayout.prototype = Object.create(Layout.prototype);
CenterLayout.prototype.constructor = CenterLayout;

export { CenterLayout };