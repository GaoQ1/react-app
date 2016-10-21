export function parse_url(url) {
    var pattern = /(\w+)=([^\#&]*)/ig;
    var parames = {};
    url.replace(pattern, function (attr, key, value) {
        parames[key] = decodeURIComponent(value);
    });
    return parames;
};

export function buildUrl(url, serializedParams) {
	if (serializedParams.length > 0) {
		url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams;
	}
	return url;
};
