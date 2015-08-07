class Eventmanager {
    constructor () {
        this.listener = {}
    }
    addListener (listenerName, eventName, func) {
        if (typeof listenerName !== 'string'){
            throw 'Error in Eventmanager.addListener, no listenerName defined'
        }
        if (typeof eventName !== 'string'){
            throw 'Error in Eventmanager.addListener, no eventName defined for listener: ' + listenerName
        }
        if (typeof func !== 'function'){
            throw 'Error in Eventmanager.addListener, no function defined for listener: ' + listenerName
        }
        if (!this.listener[eventName]) {
            this.listener[eventName] = {};
        }
        this.listener[eventName][listenerName] = func;
    }
    removeListener (listenerName, eventName) {
        if (typeof listenerName !== 'String'){
            throw 'Error in Eventmanager.removeListener, no listenerName defined'
        }
        if (typeof eventName !== 'String'){
            throw 'Error in Eventmanager.removeListener, no eventName defined for listener: ' + listenerName
        }
        this.listener[eventName][listenerName] = null;
    }
    spreadEvent (event) {
        if (this.listener[event.name]) {
            for (let key in this.listener[event.name]){
                this.listener[event.name][key](event);
            }
        }
    }
}

class Event {
    constructor(name) {
        if (typeof name !== 'string'){
            throw 'No event name defined'
        }
        this.name = name;
    }
}

