import request from 'request';
import unique from 'array-unique';

// Note: This is where your code should go to fetch a real user.
export default (_params) => {
	let codes = unique(_params);
	return new Promise(function (resolve, reject) {
		resolve(codes.map((code) => {
			return {
				code: code,
				name: null
			}
		}));
	});
	
};
