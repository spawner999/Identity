const graphql = require("graphql");
const createUser = require("./mutations");
const queries = require("./queries");
const utils = require("./utils");
const contract = require("../web3.init").identityContract;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    userName: { type: GraphQLString },
    userEmail: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { userAddress: { type: GraphQLString } },
      resolve(parentValue, { userAddress }) {
        return queries.getUser({ contract, userAddress });
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        return queries.getUsers({ contract });
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        sender: { type: new GraphQLNonNull(GraphQLString) },
        userName: { type: new GraphQLNonNull(GraphQLString) },
        userEmail: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { sender, userName, userEmail }) {
        return createUser({
          contract,
          sender,
          payload: {
            userName: utils.fromAscii(userName),
            userEmail: utils.fromAscii(userEmail)
          }
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation });
