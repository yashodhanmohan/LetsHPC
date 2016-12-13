/**
 * Thing model events
 */

'use strict';

import { EventEmitter } from 'events';
import Explanation from './explanation.model';
var ExplanationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ExplanationEvents.setMaxListeners(0);

// Model events
var events = {
    save: 'save',
    remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
    let event = events[e];
    Explanation.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
    return function(doc) {
        ExplanationEvents.emit(`${event}:${doc._id}`, doc);
        ExplanationEvents.emit(event, doc);
    };
}

export default ExplanationEvents;
