import { Container } from './Container';

/**
 * @author tengge / https://github.com/tengge1
 */

function Layout(options) {
    Container.call(this, options);
}

Layout.prototype = Object.create(Container.prototype);
Layout.prototype.constructor = Layout;

export { Layout };