import request from 'supertest';
import express, { query } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema, root } from '../schema';

const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: false,
}));

describe('Leads', () => {
    it('should register a customer', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `mutation {
                    register(name: "John Doe", email: "DJ@gmail.com", mobile: "09123456789", postcode: "3022", service: 1) {
                    name
                    email
                    mobile
                    postcode
                    service
                    }
                }`
            })
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.data.register.name).toBe("John Doe");
        expect(response.body.data.register.email).toBe("DJ@gmail.com");
        expect(response.body.data.register.mobile).toBe("09123456789");
        expect(response.body.data.register.postcode).toBe("3022");
        expect(response.body.data.register.service).toBe(1);
    });

    it('should return list of lead', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `{ leads {  id name email mobile postcode service  } }`
            })
        
        expect(response.status).toBe(200);
        expect(response.body?.data?.leads).toBeInstanceOf(Array);
    })

    it('should return specific lead', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `{ lead(name: "John Doe"){ name email mobile postcode service  } }`
            })
        
        expect(response.status).toBe(200);
        expect(response.body.data.lead).toBeTruthy();
        expect(response.body.data.lead).toHaveProperty("name");
        expect(response.body.data.lead).toHaveProperty("email");
        expect(response.body.data.lead).toHaveProperty("mobile");
        expect(response.body.data.lead).toHaveProperty("postcode");
        expect(response.body.data.lead).toHaveProperty("service");
    })
});