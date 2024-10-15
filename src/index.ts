import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema, root } from './schema';
import dotenv from 'dotenv';

dotenv.config()

const app = express();

// Set up the GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL interface for testing
}));


app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/graphql`);
});
