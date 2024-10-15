import { buildSchema } from 'graphql';
import { ServiceModel } from './models/services';
import { CustomerModel } from './models/customer';

// Define the schema
export const schema = buildSchema(`
    type Services {
      id: ID!
      service: String!
    }

    type Customer {
        id: ID!,
        name: String!, 
        email: String!, 
        mobile: String!, 
        postcode: String!, 
        service: Int!
    }
  
    type Query {
      services: [Services]
      leads: [Customer]
      lead(id: ID, name: String): Customer
    }
  
    type Mutation {
      createService(service: String!): Services
      register(name: String!, email: String!, mobile: String!, postcode: String!, service: Int!): Customer
    }
  `);


// Define the root resolver
export const root = {
    lead: async (filter: any) => {
        const data = await CustomerModel.get(filter)
        return data;
    },
    leads: async () => {
        return await CustomerModel.getAll();
    },
    services: async () => {
        return await ServiceModel.getAll();
    },
    createService: async (service: any) => {
        const data = await ServiceModel.create(service)
        return {
            id: data[0],
            ...service
        }
    },
    register: async (customerModel: any) => {
        const data = await CustomerModel.create(customerModel)
        return {
            id: data[0],...customerModel
        }
    }
};
