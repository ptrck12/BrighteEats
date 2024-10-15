import db from '../database';

export interface Customer {
    id?: number;
    name: string;
    email: string;
    mobile: string;
    postcode: string;
    service: number;
}

export const CustomerModel = {
    getAll: () => db<Customer>('customer').select('*'),
    get: (filter: any) => db<Customer>('customer').where(filter).first(),
    create: (customer: Customer) => db<Customer>('customer').insert(customer)
};
