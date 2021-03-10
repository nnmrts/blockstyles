import React, {
	Component
} from "react";
import Sketch from "react-p5";

import {
	chunkArray
} from "../utilities.js";

import propTypes from "./prop-types.js";
import Ant from "./langton/ant.js";
import Grid from "./langton/grid.js";

// console.log(grid);

let currentHash = "";
let ants = [];
let calledStep = 0;
let calledDraw = 0;

const hexPrefix = "0x";
const hexColorLength = 6;
const numberOfColors = 3;

const stepsPerBlock = 10000;
const stepsPerLoop = 10000;
const extraStepsPerTransaction = 10000;
const frameRate = 60;

/**
 *
 */
const Langton = class extends Component {
	static propTypes = propTypes

	/**
	 * @example
	 */
	render() {
		const {
			props: {
				block: {
					number,
					transactions,
					hash
				},
				canvasRef,
				attributesRef,
				width,
				height,
				hidden,
				handleResize
			}
		} = this;

		const gridSize = 250;

		let grid = new Grid(gridSize);

		const cellSize = width / gridSize;

		// setup() initializes p5 and the canvas element, can be mostly ignored in our case (check draw())
		const setup = (p5, canvasParentRef) => {
			// Keep reference of canvas element for snapshots
			p5.createCanvas(width, height).parent(canvasParentRef);
			canvasRef.current = p5;

			attributesRef.current = () => ({
				attributes: [
					{
						display_type: "number",
						trait_type: "your trait here number",
						value: hoistedValue.current
					},
					{
						trait_type: "your trait here text",
						value: "replace me"
					}
				]
			});

			p5.background("white");
			p5.noStroke();
			p5.frameRate(frameRate);
		};

		const draw = (p5) => {
			if (hash !== currentHash) {
				p5.background("white");
				ants = [];
				grid = new Grid(gridSize);

				calledStep = 0;
				calledDraw = 0;

				currentHash = hash;

				const seeds = [number].map(
					(value) => BigInt(value)
						.toString(2)
						.replaceAll("0", "R")
						.replaceAll("1", "L")
				);

				for (const [index, seed] of seeds.entries()) {
					const x = ((gridSize / seeds.length) * index) + ((gridSize / seeds.length) / 2);
					const y = gridSize / 2;

					const colors = chunkArray(
						hash
							.split("")
							.slice(hexPrefix.length),
						hexColorLength
					)
						.slice(0, numberOfColors)
						.map((characters) => characters.join(""));

					ants.push(new Ant(
						grid,
						[x, y].map(Math.round),
						seed,
						cellSize,
						colors,
						true
					));
				}
			}

			const maxNumberOfSteps = (
				transactions.length *
				extraStepsPerTransaction
			) +
			stepsPerBlock;

			for (let index = 0; index < Math.min(calledDraw, stepsPerLoop); index++) {
				for (const ant of ants) {
					if (calledStep <= maxNumberOfSteps) {
						ant.step(p5);

						calledStep += 1;
					}
				}
			}

			calledDraw += 1;
		};

		return <Sketch setup={setup} draw={hidden ? () => {} : draw} windowResized={handleResize} />;
	}
};

const styleMetadata = {
	creator_name: "",
	description: "",
	image: "",
	name: "",
	options: {}
};

export {
	styleMetadata
};

export default Langton;
