const counterclockwise = ({
	x: x1,
	y: y1
}, {
	x: x2,
	y: y2
}, {
	x: x3,
	y: y3
}) => (y3 - y1) * (x2 - x1) > (y2 - y1) * (x3 - x1);

/**
 * @private
 */
const Edge = class extends Array {
	/**
	 * @param start
	 * @param end
	 * @example
	 */
	constructor(start, end) {
		super(start, end);

		Object.seal(this);
	}

	/**
	 * @param edge
	 * @param edge.0
	 * @param edge.1
	 * @example
	 */
	intersects([withStart, withEnd]) {
		const [start, end] = this;

		return (
			counterclockwise(start, withStart, withEnd) !==
			counterclockwise(end, withStart, withEnd)
		) &&
		(
			counterclockwise(start, end, withStart) !==
			counterclockwise(start, end, withEnd)
		);
	}
};

export default Edge;
