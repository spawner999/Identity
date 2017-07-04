const express = require("express");
const expressGraphQL = require("express-graphql");
const bodyParser = require("body-parser");
const schema = require("./graphql/schema");
const utils = require("./graphql/utils");

const app = express();

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Listening");
});
