const fetch = require("node-fetch");
const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require("graphql");

const nameType = new GraphQLObjectType({
  name: "CardName",
  description: "...",
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: name => name
    }
  })
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "query",
    description: "...",
    fields: () => ({
      cardName: {
        type: nameType,
        args: {
          searchTerm: { type: GraphQLString }
        },
        resolve: (root, args) =>
          fetch(`https://api.scryfall.com/cards/named?fuzzy=${args.searchTerm}`)
            .then(response => response.json())
            .then(data => data.name)
      }
    })
  })
});
