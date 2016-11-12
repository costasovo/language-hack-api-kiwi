import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import { nodeInterface } from '../node';
import Airline from './airline';
import db from '../database';

const KiwiRoute = new GraphQLObjectType({
  name: 'KiwiRoute',
  fields: () => ({
	id: {
		type: GraphQLString,
		description: 'id',
	},
	price: {
		type: GraphQLString,
		description: 'Formatted price',
	},
	destination: {
		type: GraphQLString,
		description: 'Destination IATA',
	},
	duration: {
		type: GraphQLString,
		description: 'Formatted duration',
	},
	departureDate: {
		type: GraphQLString,
	},
	departureTime: {
		type: GraphQLString,
	},
	arrivalDate: {
		type: GraphQLString,
	},
	arrivalTime: {
		type: GraphQLString,
	},
	origin: {
		type: GraphQLString,
		description: 'Origin IATA',
	},
	airlineCodes: {
		type: new GraphQLList(GraphQLString),
		description: 'Airline codes',
	},
	airportCodes: {
		type: new GraphQLList(GraphQLString),
		description: 'Airport codes',
	},
	airlines: {
		type: new GraphQLList(Airline),
		description: 'Airlines',
		resolve(route) {
			return db.getAirlines(route.airlineCodes);
		}
	},
	token: {
		type: GraphQLString,
		description: 'Booking token',
	}
  }),
});

export default KiwiRoute;