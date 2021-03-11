import Edge from "./edge.js";

/**
 * @private
 */
const Point = class {
	/**
	 * @param x - X.
	 * @param y - Y.
	 * @example
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	/**
	 * @param edges
	 * @example
	 */
	inside(edges) {
		const {
			x
		} = this;

		const ray = new Edge(this, new Point(x, 10000));

		const intersections = edges
			.map((edge) => ray.intersects(edge))
			.filter((boolean) => boolean);

		return intersections.length % 2 !== 0;
	}
};

export default Point;
