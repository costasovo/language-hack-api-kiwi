import request from 'request';
import * as moment from 'moment';

// Note: This is where your code should go to fetch a real user.
export default (_params) => {
	return new Promise(function (resolve, reject) {
		const dateFrom = moment.parseZone(_params.date);
		const dateTo = dateFrom.clone().add(1, 'day');
		const url = 'https://api.skypicker.com/flights?flyFrom='+_params.origin+'&to='+_params.destination+'&dateFrom='+ dateFrom.format('DD/MM/YYYY') + '&dateTo=' + dateTo.format('DD/MM/YYYY') + '&limit=10';
		request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			body = JSON.parse(body);
			let result = body.data.map((item) => {
				let arrivalDate = moment.unix(item.aTime);
				let departureDate = moment.unix(item.dTime);
				let route = {
					price: '€' + item.price,
					id: item.id,
					origin: item.flyFrom,
					destination: item.flyTo,
					duration: item.fly_duration,
					airlineCodes: item.route.map((route) => route.airline),
					airportCodes: item.route.map((route) => route.flyTo),
					departureDate: departureDate.format('MM/DD'),
					departureTime: departureDate.format('HH:mma'),
					arrivalDate: arrivalDate.format('MM/DD'),
					arrivalTime: arrivalDate.format('HH:mma'),
					token: item.booking_token,
				};
				return route;
			});
			resolve(result);
		}
		else {
			reject(error);
		}
	});
	});
	
};
