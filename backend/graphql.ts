import { gql } from "apollo-server-micro";
import queries from "./queries";
import mutations from "./mutations";

export const typeDefs = gql`
type Location {
  _id: String!
  name: String!
  zombiesCount: Int!
}

type Query {
  getLocations: [Location!]!
}

type Mutation {
  moveZombies(from: String!, to: String!, amount: Int!): [Location!]!
}
`;

export const resolvers = {
  Query: {
    ...queries
  },
  Mutation: {
    ...mutations
  }
};
