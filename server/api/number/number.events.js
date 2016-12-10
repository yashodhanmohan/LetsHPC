/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
import Number from './number.model';
var NumberEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NumberEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Number.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    NumberEvents.emit(`${event}:${doc._id}`, doc);
    NumberEvents.emit(event, doc);
  };
}

export default NumberEvents;
