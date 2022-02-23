const {
	toAMF,
	decodeAMF,
	Memo,
} = require('amf-codec');
const {
	encodeStringValue,
	decodeString,
} = require('amf-codec/lib/types/string');
const {
	createU16,
	createU32,
} = require('./helpers');

const serializeAMF = (headers, messages) => {
	const headerKeys = Object.keys(headers);
	const buf = [
		createU16(0), // version
		createU16(headerKeys.length), // header-count
	];
	
	for (const key of headerKeys) {
		const headerValue = toAMF(headers[key]);
		buf.push(
			Buffer.concat(encodeStringValue(key)), // header-name
			Buffer.from([0]), // must-understand
			createU32(headerValue.length), // header-length
			headerValue, // (header-)value-type
		);
	}
	
	buf.push(createU16(messages.length));
	for (const message of messages) {
		const messageBody = toAMF(message.body);
		buf.push(
			Buffer.concat(encodeStringValue(message.targetUri)), // target-uri
			Buffer.concat(encodeStringValue(message.responseUri)), // response-uri
			createU32(messageBody.length), // message-length
			messageBody, // (message-)value-type
		);
	}
	
	return Buffer.concat(buf);
};

const deserializeAMF = (buf) => {
	const memo = new Memo(0);
	const version = buf.readUInt16BE(memo.consume(2)); // version
	
	if (version !== 0 && version !== 1) {
		throw new Error(`AMF version ${version} is not supported`);
	}
	
	const headers = {};
	const messages = [];
	
	const headersLength = buf.readUInt16BE(memo.consume(2)); // header-count
	for (let i = 0; i < headersLength; i++) {
		const headerKey = decodeString(buf, memo); // header-name
		
		memo.consume(1); // must-understand
		memo.consume(4); // header-length
		
		const headerValue = decodeAMF(buf, memo); // (header-)value-type
		headers[headerKey] = headerValue;
	}
	
	const messagesLength = buf.readUInt16BE(memo.consume(2));
	for (let i = 0; i < messagesLength; i++) {
		const targetUri = decodeString(buf, memo); // target-uri
		const responseUri = decodeString(buf, memo); // response-uri
		
		memo.consume(4); // message-length
		
		const body = decodeAMF(buf, memo); // (message-)value-type
		messages.push({
			targetUri,
			responseUri,
			body,
		});
	}
	
	return {
		headers,
		messages,
	};
};

module.exports = {
	serializeAMF,
	deserializeAMF,
};
