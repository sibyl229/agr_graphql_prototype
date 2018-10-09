import { neo4jgraphql } from 'neo4j-graphql-js';

export const typeDefs = `

type Gene{
  primaryKey: ID!
  symbol: String
  species: Species @relation(name: "FROM_SPECIES", direction: "OUT")
  interactions: [InteractionGeneJoin] @relation(name: "ASSOCIATION", direction: "BOTH")
}

type Species {
  name: String
  primaryKey: ID!
}

type CrossReference {
  primaryKey:ID!
  displayName: String
  crossRefCompleteUrl: String
}

type MITerm {
  primaryKey: ID!
  label: String
}

type Publication {
  primaryKey: ID!
}

type InteractionGeneJoin {
  primaryKey: ID!
  joinType: String
  interactionType: MITerm @relation(name: "INTERACTION_TYPE", direction: "OUT")
  detectionMethod: MITerm @relation(name: "DETECTION_METHOD", direction: "OUT")
  interactorA: Gene @relation(name: "ASSOCIATION", direction: "IN")
  interactorAType: MITerm @relation(name: "INTERACTOR_A_TYPE", direction: "OUT")
  interactorARole: MITerm @relation(name: "INTERACTOR_A_ROLE", direction: "OUT")
  interactorB: Gene @relation(name: "ASSOCIATION", direction: "OUT")
  interactorBType: MITerm @relation(name: "INTERACTOR_B_TYPE", direction: "OUT")
  interactorBRole: MITerm @relation(name: "INTERACTOR_B_ROLE", direction: "OUT")
  evidence: Publication @relation(name: "EVIDENCE", direction: "OUT")
  sourceDatabase: MITerm @relation(name: "SOURCE_DATABASE", direction: "OUT")
  aggregationDatabase: MITerm @relation(name: "AGGREGATION_DATABASE", direction: "OUT")
  crossReference: [CrossReference] @relation(name: "CROSS_REFERENCE", direction: "OUT")
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
