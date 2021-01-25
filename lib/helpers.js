const createU16 = (value) => {
	const buf = Buffer.allocUnsafe(2);
	buf.writeUInt16BE(value);
	return buf;
};

const createU32 = (value) => {
	const buf = Buffer.allocUnsafe(4);
	buf.writeUInt32BE(value);
	return buf;
};

module.exports = {
	createU16,
	createU32,
};
