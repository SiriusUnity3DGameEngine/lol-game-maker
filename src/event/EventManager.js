import { CustomEvents } from '../constant';

/**
 * @author tengge / https://github.com/tengge1
 */

/**
 * Create an EventManager to manage custom events.
 * Before you call or listen an custom event, you should
 * add the eventName to the `CustomEvents` array in the
 * `../constant.js` file.
 */
function EventManager(options) {
    options = options || {};
    this.app = options.app || null;
    this.dispatch = d3.dispatch.apply(d3, CustomEvents);
}

/**
 * Call a custom event.
 * @params eventName, scope, arg1, arg2, arg3, ...
 */
EventManager.prototype.call = function(eventName) {
    if (this.app && this.app.debug) {
        this.app.debug('Event `' + eventName + '` is called.');
    }
    this.dispatch.call.apply(this.dispatch, arguments);
};

/**
 * Listen on a custom event.
 */
EventManager.prototype.on = function(eventName, callback) {
    this.dispatch.on(eventName, callback);
};

export { EventManager };