require("dotenv").config();
const connectToDB = require("./db");

const bodyParser = require("body-parser");
const express = require("express");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");

const schema = require("./schema");
const app = express();

const PORT = process.env.port || 5000;

// Middleware
app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlExpress({
    schema
  })
);
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

connectToDB.then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
