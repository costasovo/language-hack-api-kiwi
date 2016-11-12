import request from 'request';

var searches = {};

// Note: This is where your code should go to fetch a real user.
export default (code) => {
	if (searches[code]) {
		return searches[code];
	}
	searches[code] = new Promise(function (resolve, reject) {
		if (code === 'U2') {
			resolve('easyJet');
			return;
		}
		if (code === 'FR') {
			resolve('Ryanair');
			return;
		}
		const url = 'https://iatacodes.org/api/v6/airlines?api_key=e6d744e0-ab38-4e3b-a0c0-9c4e8c8a537d&code=' + code;
		request(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				body = JSON.parse(body);
				if (body.response[0].name) {
					resolve(body.response[0].name);
				} else {
					resolve(code);
				}
			} else {
				resolve(code);
			}
		});
	});
	return searches[code];
};
