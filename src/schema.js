import { neo4jgraphql } from 'neo4j-graphql-js';

export const typeDefs = `
type Gene {
  primaryKey: ID!,
  symbol: String,
}

type Query {
  GeneByPrimaryKey(primaryKey: ID!): Gene
}`;

export const resolvers = {
  // root entry point to GraphQL service
  Query: {
    GeneByPrimaryKey(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
  }
};