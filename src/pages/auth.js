/** @format */

export default async function AJAX(url, message = null) {
	try {
		const requestOptions = {
			method: message ? 'POST' : 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include', // Include cookies in the request
		};

		if (message) {
			// For POST request
			requestOptions.body = JSON.stringify(message);
		}

		const response = await fetch(url, requestOptions);
		const result = await response.json();

		if (result.error === 'ALREADY_LOGGED_IN') {
			return true;
		}
		if (!response.ok) {
			throw new Error(
				`Request failed with status: ${response.status} ${result.error}`
			);
		}

		if (message) {
			// Handle the result for POST request
			console.log('POST Response:', result);
			return true;
		} else {
			// Handle the result for GET request
			console.log('GET Response:', result);
		}
	} catch (error) {
		// Handle errors
		console.error('AJAX Error:', error.message);
		return false;
	}
}
