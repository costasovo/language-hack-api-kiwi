import request from 'request';

// Note: This is where your code should go to fetch a real user.
export default (code) => {
	return new Promise(function (resolve, reject) {
		const url = 'https://iatacodes.org/api/v6/airlines?api_key=e6d744e0-ab38-4e3b-a0c0-9c4e8c8a537d&code=' + code;
		request(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				body = JSON.parse(body);
				if (body.response[0].name) {
					resolve(body.response[0].name);
				}
			} else {
				resolve(null);
			}
		});
	});
};
