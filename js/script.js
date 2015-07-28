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
var requests = ['/countries', '/cities', '/populations'];
var responses = {};
var param = prompt('Enter the name of a continent, country or city', 'Japan');

for (var i = 0; i < 3; i++) {
	calculate(requests[i]);
}

function calculate(request){
	var callback = function (error, result) {
		responses[request] = result;
		var l = [];
		for (var k in responses) {
			l.push(k);
		}

		if (l.length == 3) {
			var c = [], cc = [], p = 0;
			for (var i = 0; i < responses['/countries'].length; i++) {
				if (responses['/countries'][i].continent === param) {
					c.push(responses['/countries'][i].name);
				}
			}

			if(c.length) {
				for (var i = 0; i < responses['/cities'].length; i++) {
					for (var j = 0; j < c.length; j++) {
						if (responses['/cities'][i].country === c[j]) {
							cc.push(responses['/cities'][i].name);
						}
					}
				}
			} else {
				for (var i = 0; i < responses['/cities'].length; i++) {
					if (responses['/cities'][i].country === param) {
						cc.push(responses['/cities'][i].name);
					}
				}
			}

			if(cc.length) {
				for (var i = 0; i < responses['/populations'].length; i++) {
					for (var j = 0; j < cc.length; j++) {
						if (responses['/populations'][i].name === cc[j]) {
							p += responses['/populations'][i].count;
						}
					}
				}
			} else {
				for (var i = 0; i < responses['/populations'].length; i++) {
					if (responses['/populations'][i].name === param) {
						p += responses['/populations'][i].count;
					}
				}
			}

			console.log('Total population in ' + param + ': ' + p);
		}
	};

	getData(request, callback);
}