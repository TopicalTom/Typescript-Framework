import { View } from './View';
import { User, UserProps } from '../models/User';

// Passes both class and props into View class
export class UserForm extends View<User, UserProps> {
    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick,
            'click:.save-model': this.onSaveModel
        };
    };

    onSetNameClick = (): void => {
        const input = this.parent.querySelector('input');

        // Type guard against 'null' cases
        if (input) {
            const name = input.value
            this.model.set({ name });
        }
    };

    // Arrow function to fix "this" issues
    onSetAgeClick = (): void => {
        this.model.setRandomAge();
    };

    onSaveModel = (): void => {
        this.model.save();
    };

    template(): string {
        return `
            <div>
                <input placeholder="${this.model.get('name')}"/>
                <button class="set-name">Change Name</button>
                <button class="set-age">Set Random Age</button>
                <button class="save-model">Save</button>
            </div>
        `;
    };
};