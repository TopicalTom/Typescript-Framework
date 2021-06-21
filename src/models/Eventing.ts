import axios, { AxiosResponse } from 'axios';

type Callback = () => void; // Type alias

export class Eventing {
    events: { [key: string]: Callback[] } = {};

    // Creates Event Types
    on = (eventName: string, callback: Callback): void => {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    };

    // Calls Event Types
    trigger = (eventName: string): void  => {
        const handlers = this.events[eventName];

        if (!handlers || handlers.length === 0) {
            return;
        }

        handlers.forEach(callback => {
            callback();
        });
    };
}