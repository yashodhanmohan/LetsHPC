/**
 * Thing model events
 */

'use strict';

import { EventEmitter } from 'events';
import Apmap from './apmap.model';
var ApmapEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ApmapEvents.setMaxListeners(0);

// Model events
var events = {
    save: 'save',
    remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
    let event = events[e];
    Apmap.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
    return function(doc) {
        ApmapEvents.emit(`${event}:${doc._id}`, doc);
        ApmapEvents.emit(event, doc);
    };
}

export default ApmapEvents;
