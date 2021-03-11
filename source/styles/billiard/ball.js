import Edge from "./edge.js";
import Point from "./point.js";

/**
 * Ball class.
 * @private
 */
const Ball = class {
	/**
	 * Ball constructor.
	 *
	 * @param {Function} p5  - P5.
	 * @param {object} position - Position.
	 * @param {number} position.x - X.
	 * @param {number} position.y - Y.
	 * @param {number} size - Size.
	 * @example
	 * const ball = new Ball(p5, {
	 * 	x: 0,
	 * 	y: 0
	 * }, 10);
	 */
	constructor(p5, {
		x, y
	}, size) {
		this.p5 = p5;
		this.size = size;
		this.radius = size / 2;
		this.position = p5.createVector(x, y);

		this.velocity = p5.createVector(0.1, 0.2);
	}

	/**
	 * @private
	 */
	update() {
		const {
			velocity,
			position,
			p5,
			size
		} = this;

		const {
			x,
			y
		} = position.add(velocity);

		this.position = p5.createVector(x, y);

		const {
			position: {
				x: newX,
				y: newY
			}
		} = this;
	}

	/**
	 * @param base
	 * @param vec
	 * @param myColor
	 * @example
	 */
	drawArrow(base, vec, myColor) {
		const {
			p5
		} = this;
		p5.push();
		p5.stroke(myColor);
		p5.strokeWeight(3);
		p5.fill(myColor);
		p5.translate(base.x, base.y);
		p5.line(0, 0, vec.x, vec.y);
		p5.rotate(vec.heading());
		const arrowSize = 7;
		p5.translate(vec.mag() - arrowSize, 0);
		p5.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
		p5.pop();
	}

	/**
	 * @param to
	 * @example
	 */
	dist(to) {
		const {
			position,
			p5
		} = this;

		if (to instanceof Edge) {
			const [
				{
					x: startX,
					y: startY
				},
				{
					x: endX,
					y: endY
				}
			] = to;

			const startVector = p5.createVector(startX, startY);
			const endVector = p5.createVector(endX, endY);
			const edgeVector = endVector.sub(startVector);
			const distanceVector = position.copy().sub(startVector);
			const edgeLength = edgeVector.mag();

			const scalar = p5.constrain(
				distanceVector.dot(edgeVector.normalize()),
				0,
				edgeLength
			);

			const orthogonalPointOnEdge = startVector.add(edgeVector.mult(scalar));

			const distance = position.dist(orthogonalPointOnEdge);

			return distance;
		}
	}

	/**
	 * @param edges
	 * @example
	 */
	collide(edges) {
		const {
			position: {
				x,
				y
			},
			radius,
			p5
		} = this;

		const distancesToEdges = edges.map((edge) => this.dist(edge));

		// console.log(distancesToEdges.map(Math.round));

		for (const [index, distance] of distancesToEdges.entries()) {
			const center = new Point(x, y);

			const inside = center.inside(edges);

			// console.log([inside,Math.round(distance),radius*20])

			if (distance <= radius) {
				const [
					{
						x: startX,
						y: startY
					},
					{
						x: endX,
						y: endY
					}
				] = edges[index];

				const startVector = p5.createVector(startX, startY);
				const endVector = p5.createVector(endX, endY);

				const edgeVector = startVector.copy().sub(endVector);

				const normal = edgeVector
					.copy()
					.rotate(-p5.HALF_PI);

				this.velocity = this.velocity.copy().reflect(normal);

				break;
			}
		}
	}

	/**
	 * @private
	 */
	show() {
		const {
			p5,
			position,
			position: {
				x,
				y
			},
			size,
			velocity
		} = this;

		p5.fill(255, 0, 0);
		p5.noStroke();
		p5.circle(x, y, size);
	}
};

export default Ball;
