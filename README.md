# GraphQL-Families

A GraphQL API for families 👪

This is an example implementation for storing information about families and their relationships. This was created with Node, Express and MongoDB and shows the querying power of GraphQL.

# Usage

Simply clone the repo and run `$ npm install` then `$ npm start`. A server will be started with Graphiql running at the url `http://localhost:{PORT}/graphiql`.

Port is set to 5000 and MongoDB to your local database by default, but these can be configured with a `.env` file containing the keys `MONGO_URI` and `PORT` at the root of the project folder
