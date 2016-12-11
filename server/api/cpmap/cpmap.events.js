/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
import Cpmap from './cpmap.model';
var CpmapEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CpmapEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Cpmap.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CpmapEvents.emit(`${event}:${doc._id}`, doc);
    CpmapEvents.emit(event, doc);
  };
}

export default CpmapEvents;
