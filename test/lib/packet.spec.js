const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const {
	serializeAMF,
	deserializeAMF,
} = require('../..');
const {
	createU16,
} = require('../../lib/helpers');

const { messages, headers } = require('../fixtures/packet');
const packetFixture = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'packet.bin'));

describe('serializeAMF()', () => {
	it('serializes packet', () => {
		return expect(serializeAMF(headers, messages)).to.deep.equal(packetFixture);
	});
});

describe('deserializeAMF()', () => {
	it('deserializes packet', () => {
		const packet = deserializeAMF(packetFixture);
		
		return expect(packet).to.deep.equal({
			headers,
			messages,
		});
	});
	
	it('throws on non-AMF0 packet', () => {
		const fn = deserializeAMF.bind(null, createU16(3));
		
		return expect(fn).to.throw();
	});
});
