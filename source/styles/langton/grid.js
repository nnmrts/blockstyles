

const Grid = class {


	

	get([x,y]) {
		return this.rows[x][y];
	}

	set([x, y], value) {
		this.rows[x][y] = value;
	}

	setAll(value) {
		const {
			rows
		} = this;

		this.rows = rows.map(row => {
			return row.map(cell => {
				return value
			})
		})
	}

	constructor(width, height = width, initialValue = 0) {
		this.rows = Array(height).fill()
			.map(() => Array(width).fill()
				.map(() => initialValue));

		this.width = width;
		this.height = height;
	}
};

export default Grid;



