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

describe('Services', () => {
    it('should create a service', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `mutation { createService(service: "Payment") { id service } }`
            })
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.data.createService).toBeTruthy();
    });

    it('should return list of lead', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `{ services {  id service  } }`
            })
        
        expect(response.status).toBe(200);
        expect(response.body.data.services).toBeTruthy();
        expect(response.body.data.services).toBeInstanceOf(Array);
    });
});