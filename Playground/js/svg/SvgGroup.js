import { SvgElement } from './SvgElement';

/**
 * @author tengge / https://github.com/tengge1
 */

function SvgGroup(options) {
    SvgElement.call(this, options);
}

SvgGroup.prototype = Object.create(SvgElement.prototype);
SvgGroup.prototype.constructor = SvgGroup;