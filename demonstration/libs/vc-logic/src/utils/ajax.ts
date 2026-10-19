export function get(
	url
) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();

		request.onload  = function (text) {
			resolve(request.responseText)
		}
		request.onerror = function (error) {
			reject(error)
		}
		request.open("GET", url);
		request.send();
	})
}