import axios, { AxiosPromise } from 'axios';

// Constraint for Data types
interface HasId {
    id?: number
};

export class Sync<T extends HasId > {
    constructor(public rootUrl: string) {};
    
    // Grabs User from Server and Sets as Current User
    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rootUrl}/${id}`);
    };

    // Saves Current User to Server
    save(data: T): AxiosPromise {
        const { id } = data;

        if (id) {
            return axios.put(`${this.rootUrl}/${id}`, data);
        } else {
            return axios.post(this.rootUrl, data);
        };
    };
}