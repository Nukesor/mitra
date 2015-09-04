export default class Event {
    constructor(name) {
        if (typeof name !== 'string'){
            throw 'No event name defined';
        }
        this.name = name;
    }
}

