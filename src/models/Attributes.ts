export class Attributes<T> {
    constructor(private data: T) {};

    // Retrieves User Props
    // Constrains based on provided UserProps keys
    // Uses values as types 
    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key];
    };

    getAll(): T {
        return this.data;
    };

    // Updates User Props
    set(update: T): void {
        Object.assign(this.data, update);
    };
};