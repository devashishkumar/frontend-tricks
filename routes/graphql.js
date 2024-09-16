var express = require("express");
var router = express.Router();
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

const Owners = [
  {
    id: 1,
    name: 'Ashish'
  },
  {
    id: 2,
    name: 'Sunny'
  }
];
const Websites = [
  { id: 1, name: 'ABCD', ownerId: 1 },
  { id: 2, name: 'ABCDE', ownerId: 1 },
  { id: 3, name: 'ABCDEF', ownerId: 2 },
  { id: 4, name: 'ABCDEFG', ownerId: 2 },
  { id: 5, name: 'ABCDEFGH', ownerId: 2 }
];
const WebsiteType = new GraphQLObjectType({
  name: "Website",
  description: "Represents websites",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    ownerId: { type: new GraphQLNonNull(GraphQLInt) }
  })
});
const OwnerType = new GraphQLObjectType({
  name: "Owner",
  description: "Represents owner",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    websites: {
      type: new GraphQLList(WebsiteType),
      description: "All Websites",
      resolve: () => Websites,
    },
    owners: {
      type: new GraphQLList(OwnerType),
      description: "All Owners",
      resolve: () => Owners,
    }
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ name: "Ashish" });
});

router.get(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema
  })
);

module.exports = router;
