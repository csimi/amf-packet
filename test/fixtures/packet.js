const headers = {
	'foo': 'bar',
};

const messages = [{
	'targetUri': 'Class.Func',
	'responseUri': '/0',
	'body': 'foo',
}, {
	'targetUri': 'Class/Func',
	'responseUri': '/1',
	'body': [{
		'': 42,
	}],
}];

module.exports = {
	headers,
	messages,
};
