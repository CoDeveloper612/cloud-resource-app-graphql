// index.js
const { ApolloServer, gql } = require('apollo-server');

// Mock data for the cloud resources
const resources = [
  { id: "1", name: "AWS S3", type: "Storage", status: "Active" },
  { id: "2", name: "Google Cloud Compute", type: "Compute", status: "Active" },
  { id: "3", name: "Azure Blob Storage", type: "Storage", status: "Inactive" },
];

// GraphQL schema definition
const typeDefs = gql`
  type Resource {
    id: ID!
    name: String!
    type: String!
    status: String!
  }

  type Query {
    resources: [Resource]
  }

  type Subscription {
    resourceUpdated: Resource
  }
`;

// Resolvers for the schema
const resolvers = {
  Query: {
    resources: () => resources,
  },
  Subscription: {
    resourceUpdated: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator(['RESOURCE_UPDATED']),
    },
  },
};

// Set up the Apollo Server
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ pubsub }),
});

// Start the Apollo Server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
