import chroma from "chroma-js";

const eightBitChannelSize = 256;

const numberOfChannels = 3;

const colorSpaceSize = (eightBitChannelSize ** numberOfChannels) - 1;

const hexaDecimalSize = 16;

const hexColorLength = 6;

const wrapAround = (value, boundary) => ((value % boundary) + boundary) % boundary;

const moveForward = ([x, y], orientation, width, height) => {
	switch (orientation) {
		case "up":
			return [x, wrapAround(y - 1, height)];
		case "right":
			return [wrapAround(x + 1, width), y];
		case "down":
			return [x, wrapAround(y + 1, height)];
		case "left":
			return [wrapAround(x - 1, width), y];
		// no default
	}
};

const colorCell = (x, y, size, color, p5) => {
	p5.fill(color);
	p5.square(x * size, y * size, size);
};

const turn = (direction, orientation) => {
	switch (direction) {
		case "right":
			switch (orientation) {
				case "up":
					return "right";
				case "right":
					return "down";
				case "down":
					return "left";
				case "left":
					return "up";
				// no default
			}

			break;
		case "left":
			switch (orientation) {
				case "up":
					return "left";
				case "right":
					return "up";
				case "down":
					return "right";
				case "left":
					return "down";
				// no default
			}

			break;
		// no default
	}
};

/**
 *
 */
const Ant = class {
	/**
	 * @param grid
	 * @param position
	 * @param position.0
	 * @param position.1
	 * @param seed
	 * @param cellSize
	 * @param color
	 * @param scale
	 * @example
	 */
	constructor(grid, [x, y], seed, cellSize, color, scale = true) {
		this.grid = grid;

		this.position = [x, y];

		const colorScale = Array.isArray(color)
			? chroma.scale(color)
			: chroma.scale([
				"white",
				color,
				"black"
			]);

		this.states = seed.split("").map((letter, index) => {
			let cellColor = color;

			if (cellColor && scale) {
				cellColor = colorScale(index / (seed.length - 1)).hex();
			}
			else if (!cellColor) {
				cellColor = `#${Math.round(colorSpaceSize - ((colorSpaceSize * index) / (seed.length - 1))).toString(hexaDecimalSize)
					.slice(0, hexColorLength)
					.padEnd(hexColorLength, "0")}`;
			}

			return {
				color: cellColor,
				direction: letter === "R" ? "right" : "left",
				index
			};
		});

		const {
			states: [firstState]
		} = this;

		if (grid.get([0, 0]) === 0) {
			grid.setAll(firstState);
		}

		this.cellSize = cellSize;

		this.orientation = "up";
	}

	/**
	 * @param p5
	 * @example
	 */
	step(p5) {
		const {
			cellSize,
			orientation,
			position,
			position: [x, y],
			states,
			grid,
			grid: {
				width,
				height
			}
		} = this;

		const state = grid.get([x, y]);

		const {
			direction,
			index
		} = state;

		this.orientation = turn(direction, orientation);

		const newState = {
			...states[wrapAround(index + 1, states.length)]
		};

		grid.set([x, y], {
			...newState
		});

		const {
			color: newColor
		} = newState;

		colorCell(x, y, cellSize, newColor, p5);

		this.position = moveForward(position, this.orientation, width, height);
	}
};

export default Ant;
