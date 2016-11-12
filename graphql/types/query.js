import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,    
} from 'graphql';
import UserType from './user';
import KiwiRoute from './route';
import { nodeField } from '../node';
import db from '../database';

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    viewer: {
      type: UserType,
      resolve: (_, _args, context) => db.getViewer({}, context),
    },
    flights: {
      type: new GraphQLList(KiwiRoute),
      args: {
        date: {
          name: 'Departure date',
          type: new GraphQLNonNull(GraphQLString),
        },
        destination: {
          name: 'Destination name',
          type: new GraphQLNonNull(GraphQLString),
        },
        origin: {
          name: 'Origin name',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_, _args, context) => {
        return db.getRoutes(_args, context);
      },
    }
  }),
});

export default QueryType;
