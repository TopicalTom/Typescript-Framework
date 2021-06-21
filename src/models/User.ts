import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
import { Model } from './Model';

export interface UserProps {
    id?: number,
    name?: string,
    age?: number,
}

const rootUrl = 'http://localhost:3000/users'

export class User extends Model<UserProps> {
    
    // Direct method that uses Model class to build user
    // Needs intial attributes passed through to do so
    static buildUser(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new Eventing(),
            new ApiSync<UserProps>(rootUrl)
        )
    };
};