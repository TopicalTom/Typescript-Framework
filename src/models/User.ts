import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { AxiosResponse } from 'axios';

export interface UserProps {
    id?: number,
    name?: string,
    age?: number,
}

const rootUrl = 'http://localhost:3000/users'

export class User {
    private events: Eventing = new Eventing();
    private sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
    private attributes: Attributes<UserProps>;

    constructor(attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs);
    };

    // Single-method
    // Uses get (getter accessor) for direct access to nested methods
    // Uses arrow functions within methods to bind "this" to the right context
    get get() { return this.attributes.get; };

    get on() { return this.events.on; };

    get trigger() { return this.events.trigger; };

    // Multi-method
    set(update: UserProps): void {
        this.attributes.set(update);
        this.events.trigger('change');
    };

    fetch(): void {
        const id = this.attributes.get('id');

        if (typeof id !== 'number') {
            throw new Error('Cannot fetch withouut id')
        };

        this.sync.fetch(id).then((response: AxiosResponse): void => {
            this.set(response.data);
        });
    };

    save(): void {
        this.sync.save(this.attributes.getAll())
        .then((response: AxiosResponse): void => {
            this.trigger('save');
        })
        .catch(() => {
            this.trigger('error');
        });
    };
};