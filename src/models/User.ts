import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
import { Model } from './Model';
import { Collection } from './Collection';

export interface UserProps {
    id?: number,
    name?: string,
    age?: number,
}

const rootUrl = 'http://localhost:3000/users';

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

    // Direct method that uses Collection class to build collection
    // Retreives all Users in the collection from server side
    static buildUserCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(
            rootUrl,
            (json: UserProps) => User.buildUser(json)
        );
    };
};