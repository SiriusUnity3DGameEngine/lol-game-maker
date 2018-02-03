import { Layout } from '../Layout';

/**
 * @author tengge / https://github.com/tengge1
 */

function TableLayout(options) {
    Layout.call(this, options);
    options = options || {};
}

TableLayout.prototype = Object.create(Layout.prototype);
TableLayout.prototype.constructor = TableLayout;

export { TableLayout };