/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
	var RESPONSES = {
		'/countries': [
			{name: 'Cameroon', continent: 'Africa'},
			{name :'Fiji Islands', continent: 'Oceania'},
			{name: 'Guatemala', continent: 'North America'},
			{name: 'Japan', continent: 'Asia'},
			{name: 'Yugoslavia', continent: 'Europe'},
			{name: 'Tanzania', continent: 'Africa'}
		],
		'/cities': [
			{name: 'Bamenda', country: 'Cameroon'},
			{name: 'Suva', country: 'Fiji Islands'},
			{name: 'Quetzaltenango', country: 'Guatemala'},
			{name: 'Osaka', country: 'Japan'},
			{name: 'Subotica', country: 'Yugoslavia'},
			{name: 'Zanzibar', country: 'Tanzania'}
		],
		'/populations': [
			{count: 138000, name: 'Bamenda'},
			{count: 77366, name: 'Suva'},
			{count: 90801, name: 'Quetzaltenango'},
			{count: 2595674, name: 'Osaka'},
			{count: 100386, name: 'Subotica'},
			{count: 157634, name: 'Zanzibar'}
		]
	};

	setTimeout(function () {
		var result = RESPONSES[url];
		if (!result) {
			return callback('Unknown url');
		}

		callback(null, result);
	}, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */
var requests = ['/countries', '/cities', '/populations'],
	responses = {},
	param = prompt('Enter the name of a continent, country or city', 'Japan');

for (var i = 0; i < requests.length; i++) {
	(function (request){
		var callback = function (error, result) {
			responses[request] = result;

			var l = [];
			for (var k in responses) {
				if(responses.hasOwnProperty(k)) {
					l.push(k);
				}
			}

			if (l.length == requests.length) {
				var countries = [],
					cities = [],
					population = 0;

				for (var i = 0; i < responses['/countries'].length; i++) {
					if (responses['/countries'][i].continent === param) {
						countries.push(responses['/countries'][i].name);
					}
				}

				if(countries.length) {
					for (var i = 0; i < responses['/cities'].length; i++) {
						for (var j = 0; j < countries.length; j++) {
							if (responses['/cities'][i].country === countries[j]) {
								cities.push(responses['/cities'][i].name);
							}
						}
					}
				} else {
					for (var i = 0; i < responses['/cities'].length; i++) {
						if (responses['/cities'][i].country === param) {
							cities.push(responses['/cities'][i].name);
						}
					}
				}

				if(cities.length) {
					for (var i = 0; i < responses['/populations'].length; i++) {
						for (var j = 0; j < cities.length; j++) {
							if (responses['/populations'][i].name === cities[j]) {
								population += responses['/populations'][i].count;
							}
						}
					}
				} else {
					for (var i = 0; i < responses['/populations'].length; i++) {
						if (responses['/populations'][i].name === param) {
							population += responses['/populations'][i].count;
						}
					}
				}

				console.log('Total population in ' + param + ': ' + population);
			}
		};

		getData(request, callback);
	})(requests[i]);
}
