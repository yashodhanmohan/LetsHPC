/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
import Machine from './machine.model';
var MachineEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MachineEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Machine.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MachineEvents.emit(`${event}:${doc._id}`, doc);
    MachineEvents.emit(event, doc);
  };
}

export default MachineEvents;
