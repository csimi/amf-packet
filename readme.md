[![npm version](https://img.shields.io/npm/v/amf-packet.svg?logo=npm)](https://www.npmjs.com/package/amf-packet)
[![build status](https://github.com/csimi/amf-packet/workflows/build/badge.svg)](https://github.com/csimi/amf-packet/actions)
[![codecov](https://codecov.io/gh/csimi/amf-packet/branch/master/graph/badge.svg)](https://codecov.io/gh/csimi/amf-packet)

# About

AMF0 packet serializer and deserializer.

# Usage

Install using npm:

```
$ npm install amf-packet
```

## Serialize

```
const { serializeAMF } = require('amf-packet');

const headers = {
	'foo': 'bar',
};
const messages = [{
	'targetUri': 'Service.doSomething',
	'responseUri': '/0',
	'body': [],
}];

console.log(serializeAMF(headers, messages));
```

## Deserialize

```
const { deserializeAMF } = require('amf-packet');

const {
	headers,
	messages,
} = deserializeAMF(buf);
const {
	targetUri,
	responseUri,
	body,
} = messages[0];
```

# Implementation notes

The must-understand flag of headers is not implemented.

Message body can be any value supported by [amf-codec](https://www.npmjs.com/package/amf-codec).
