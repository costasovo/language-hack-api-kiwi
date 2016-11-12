import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { nodeInterface } from '../node';
import db from '../database';

const Airline = new GraphQLObjectType({
  name: 'Airline',
  fields: () => ({
	code: {
		type: GraphQLString,
		description: 'Code',
	},
	name: {
		type: GraphQLString,
		description: 'Name',
		resolve(airline) {
			return db.getAirlineName(airline.code);
		}
	},
  }),
});

export default Airline;