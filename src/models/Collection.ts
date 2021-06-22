import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

export class Collection<T, K> { // T can be User, K can be UserProps
    models: T[] = [];
    events: Eventing = new Eventing();

    constructor(
        public rootUrl: string,
        public deserialize: (json: K) => T // Deserialize takes the json data and returns Collection Type
    ) {}
    
    // Uses get (getter accessor) as events wasn't initialized through constructor
    // Allows direct access
    get on() {
        return this.events.on;
    };

    get trigger() {
        return this.events.trigger;
    };

    fetch(): void {
        axios.get(this.rootUrl).then((response: AxiosResponse) => {
            response.data.forEach((value: K) => {
                this.models.push(this.deserialize(value));
            });

            this.trigger('change');
        });
    }
}