import React, {
	Component
} from "react";
import Sketch from "react-p5";

import {
	chunkArray
} from "../utilities.js";

const ternaryToEth = (string) => string.replaceAll("0", "E").replaceAll("1", "T")
	.replaceAll("2", "H");

const drawE = (x, y, size, p5) => {
	const blockSize = size / 5;

	p5.rect(x, y, size, blockSize);
	p5.rect(x, y + (blockSize * 2), size, blockSize);
	p5.rect(x, y + (blockSize * 4), size, blockSize);
	p5.rect(x, y, blockSize, size);
};

const drawT = (x, y, size, p5) => {
	const blockSize = size / 5;

	p5.rect(x, y, size, blockSize);
	p5.rect(x + (blockSize * 2), y, blockSize, size);
};

const drawH = (x, y, size, p5) => {
	const blockSize = size / 5;

	p5.rect(x, y, blockSize, size);
	p5.rect(x + (blockSize * 4), y, blockSize, size);
	p5.rect(x, y + (blockSize * 2), size, blockSize);
};

const drawLetter = (letter, ...rest) => {
	switch (letter) {
		case "E":
			drawE(...rest);
			break;
		case "T":
			drawT(...rest);
			break;
		case "H":
			drawH(...rest);
			break;
		default:
			break;
	}
};

/**
 *
 */
const Eth = class extends Component {
	/**
	 * @example
	 */
	render() {
		const {
			props: {
				block,
				block: {
					hash: blockHash,
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
				visible
			}
		} = this;

		const ternaryHashes = [block, ...transactions]
			.map(({
				hash
			}) => BigInt(BigInt(hash).toString(3)));

		const gridSize = ternaryHashes
			.map((hash) => String(hash).length)
			.reduce((hash1Length, hash2Length) => hash1Length + hash2Length, 0);

		const gridSideLength = Math.sqrt(Math.ceil(Math.sqrt(gridSize)) ** 2);

		const oneDimensionalGrid = [];

		for (const [index, hash] of ternaryHashes.entries()) {
			oneDimensionalGrid.push(...[...ternaryToEth(String(hash))]);
		}

		const annotatedOneDimensionalGrid = oneDimensionalGrid.map((letter, index, array) => {
			const lettersBefore = [array[index - 2], array[index - 1]].join("");
			const lettersAfter = [array[index + 1], array[index + 2]].join("");

			let inHorizontalEth = false;

			if (
				(letter === "E" && lettersAfter === "TH") ||
				(letter === "T" && lettersBefore.endsWith("E") && lettersAfter.startsWith("H")) ||
				(letter === "H" && lettersBefore === "ET")
			) {
				inHorizontalEth = true;
			}

			return {
				inHorizontalEth,
				letter
			};
		});

		const grid = chunkArray(annotatedOneDimensionalGrid, gridSideLength);

		const annotatedGrid = grid.map((row, rowIndex, array) => {
			const rowsAbove = [array[rowIndex - 2], array[rowIndex - 1]];
			const rowsBelow = [array[rowIndex + 1], array[rowIndex + 2]];

			return row.map(({
				inHorizontalEth,
				letter
			}, letterIndex, letterArray) => {
				const lettersAbove = rowsAbove.map((rowAbove) => rowAbove?.[letterIndex]?.letter).join("");
				const lettersBelow = rowsBelow.map((rowBelow) => rowBelow?.[letterIndex]?.letter).join("");

				let inVerticalEth = false;

				if (
					(letter === "E" && lettersBelow === "TH") ||
					(letter === "T" && lettersAbove.endsWith("E") && lettersBelow.startsWith("H")) ||
					(letter === "H" && lettersAbove === "ET")
				) {
					inVerticalEth = true;
				}

				return {
					inHorizontalEth,
					inVerticalEth,
					letter
				};
			});
		});

		const letterSize = width / grid[0].length;

		// setup() initializes p5 and the canvas element, can be mostly ignored in our case (check draw())
		const setup = (p5, canvasParentRef) => {
			// Keep reference of canvas element for snapshots
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
			p5.frameRate(30);
		};

		const draw = (p5) => {
			p5.background(background);
			p5.fill("black");
			// p5.noLoop();
			p5.noStroke();

			for (const [rowIndex, row] of annotatedGrid.entries()) {
				for (const [
					letterIndex,
					{
						inHorizontalEth,
						inVerticalEth,
						letter
					}
				] of row.entries()) {
					const x = letterIndex * letterSize;
					const y = rowIndex * letterSize;

					if (inHorizontalEth && inVerticalEth) {
						p5.fill(color4);
						p5.stroke(color4);
					}
					else if (inVerticalEth) {
						p5.fill(color3);
						p5.stroke(color3);
					}
					else if (inHorizontalEth) {
						p5.fill(color2);
						p5.stroke(color2);
					}
					else {
						p5.fill(color1);
						p5.stroke(color1);
					}

					// drawLetter(letter, x, y, letterSize, p5);

					p5.rect(x, y, letterSize, letterSize);
				}
			}
		};

		return <Sketch setup={setup} draw={visible ? draw : () => {}} />;
	}
};

export default Eth;
