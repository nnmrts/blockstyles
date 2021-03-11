import React, {
	Component
} from "react";
import Sketch from "react-p5";

import {
	chunkArray
} from "../utilities.js";

import Ball from "./billiard/ball.js";
import Edge from "./billiard/edge.js";
import Point from "./billiard/point.js";

let currentHash = "";

/**
 *
 */
const Billiard = class extends Component {
	/**
	 * @example
	 */
	render() {
		const {
			props: {
				block,
				block: {
					hash,
					transactions
				},
				canvasRef,
				attributesRef,
				width,
				height,
				color1,
				color2,
				color3,
				color4,
				background,
				hidden,
				handleResize
			}
		} = this;

		console.log(hash);

		const slicedHash = hash.slice(2);

		const chunkSize = 4;

		const parts = chunkArray(slicedHash.split(""), chunkSize * 2)
			.map((digits) => chunkArray(digits, chunkSize).map((innerDigits) => innerDigits.join("")));

		console.log(parts);

		const hexadecimal = 16;

		const maximum = (hexadecimal ** chunkSize) - 1;

		const points = parts.map(
			([x, y]) => new Point(
				...[
					(hexadecimal ** -chunkSize) *
				width *
				Number(`0x${x}`),
					(hexadecimal ** -chunkSize) *
				height *
				Number(`0x${y}`)
				]
					.map(Math.round)
			)
		);

		const centroid = new Point(0, 0);

		for (const {
			x, y
		} of points) {
			centroid.x += x;
			centroid.y += y;
		}

		centroid.x /= points.length;
		centroid.y /= points.length;

		console.log(centroid);

		const {
			x: centroidX, y: centroidY
		} = centroid;

		const vertices = [...points].sort(({
			x: aX,
			y: aY
		}, {
			x: bX,
			y: bY
		}) => {
			const angleA = Math.atan2(aY - centroidY, aX - centroidX);
			const angleB = Math.atan2(bY - centroidY, bX - centroidX);

			return angleA - angleB;
		});

		console.log(vertices);

		const edges = vertices.map(({
			x, y
		}, index, array) => {
			const {
				x: nextX,
				y: nextY
			} = array[index + 1] || array[0];

			return new Edge(new Point(x, y), new Point(nextX, nextY));
		});

		console.log(edges);

		const canvasEdges = [
			new Point(0, 0),
			new Point(0, width),
			new Point(height, width),
			new Point(height, 0)
		]
			.map(({
				x, y
			}, index, array) => {
				const {
					x: nextX,
					y: nextY
				} = array[index + 1] || array[0];

				return new Edge(new Point(x, y), new Point(nextX, nextY));
			});

		let ball;

		// setup() initializes p5 and the canvas element, can be mostly ignored in our case (check draw())
		const setup = (p5, canvasParentRef, fresh = true) => {
			// Keep reference of canvas element for snapshots

			if (fresh) {
				p5.createCanvas(width, height).parent(canvasParentRef);
				canvasRef.current = p5;

				attributesRef.current = () => ({
					// This is called when the final image is generated, when creator opens the Mint NFT modal.
					// should return an object structured following opensea/enjin metadata spec for attributes/properties
					// https://docs.opensea.io/docs/metadata-standards
					// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema

					attributes: [
						{
							display_type: "number",
							trait_type: "your trait here number",
							value: hoistedValue.current // using the hoisted value from within the draw() method, stored in the ref.
						},
						{
							trait_type: "your trait here text",
							value: "replace me"
						}
					]
				});

				p5.frameRate(60);
			}

			p5.background("white");

			ball = new Ball(p5, {
				x: 400,
				y: 400
			}, 10);
		};

		const draw = (p5) => {
			if (hash !== currentHash) {
				currentHash = hash;

				setup(p5, null, false);
			}

			p5.fill(255, 12);
			p5.noStroke();
			p5.rect(0, 0, width, height);
			// p5.background(background);
			p5.noFill();
			p5.stroke(color1);
			p5.strokeWeight(4);
			// p5.noLoop();
			// p5.noStroke();

			const center = [width / 2, height / 2];

			p5.beginShape();

			for (const {
				x,
				y
			} of vertices) {
				p5.vertex(x, y);
				// p5.circle(x, y, 10);
			}

			p5.endShape(p5.CLOSE);

			if (ball) {
				for (let index = 0; index < 1000; index++) {
					ball.collide(edges);
					ball.collide(canvasEdges);
					ball.update();
					ball.show();
				}
			}
		};

		return <Sketch setup={setup} draw={hidden ? () => {} : draw} windowResized={handleResize} />;
	}
};

const styleMetadata = {
	creator_name: "",
	description: "",
	image: "",
	name: "",
	options: {
		background: "white",
		color1: "red",
		color2: "red",
		color3: "#00ff00",
		color4: "blue",
		mod1: 0.01,
		mod2: 0.25
	}
};

export {
	styleMetadata
};

export default Billiard;
