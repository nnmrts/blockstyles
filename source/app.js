import React, {
	Component
} from "react";
import {
	Carousel,
	Layout,
	Typography
} from "antd";
import useDimensions from "react-cool-dimensions";

import blocks from "./blocks.js";
import styles from "./styles.js";
import Options from "./components/options.js";

const {
	Title
} = Typography;

const {
	Header,
	Footer,
	Content,
	Sider
} = Layout;

const withDimensions = (WrappedComponent) => {
	const returnedComponent = (props) => <WrappedComponent {...props} {...useDimensions({})} />;

	returnedComponent.displayName = `Wrapped${WrappedComponent.displayName}`;

	return returnedComponent;
};

/**
 * @param p5
 * @example
 */
const App = class extends Component {
	displayName = "App"

	state = {
		activeSlide: 0,
		blockNumber: 0,
		mods: [],
		options: {
			background: "black",
			color1: "white",
			color2: "red",
			color3: "#00ff00",
			color4: "blue",
			mod1: 0.01,
			mod2: 0.25
		}
	}

	/**
	 * @param props
	 * @example
	 */
	constructor(props) {
		super(props);

		this.canvasRef = React.createRef();
		this.attributesRef = React.createRef();
	}

	/**
	 * @example
	 */
	componentDidMount() {
		const {
			state: {
				options
			}
		} = this;

		const mods = Object.entries(options).map(([key, value]) => ({
			key,
			set: (newValue) => {
				const {
					state: {
						options: currentOptions
					}
				} = this;

				const newOptions = {
					...currentOptions,
					[key]: newValue
				};

				this.setState({
					options: newOptions
				});
			},
			value
		}));

		this.setState({
			mods
		});
	}

	/**
	 * @param blockNumber
	 * @example
	 */
	setBlockNumber(blockNumber) {
		this.setState({
			blockNumber
		});
	}

	/**
	 * @param current
	 * @example
	 */
	afterChange(current) {
		this.setState({
			activeSlide: current
		});

		this.#onCanvasResize();
	}

	#onCanvasResize(p5) {
		const {
			props: {
				height,
				width
			}
		} = this;

		p5.resizeCanvas(width, height);
	}

	/**
	 * @example
	 */
	render() {
		const {
			attributesRef,
			canvasRef,
			state: {
				blockNumber,
				options,
				mods,
				activeSlide
			},
			setBlockNumber,
			afterChange,
			props: {
				height,
				width
			}
		} = this;

		const onCanvasResize = this.#onCanvasResize;

		return (
			<Layout>
				<Header>
					<Title>blockstyles</Title>
				</Header>
				<Layout>
					<Content>
					<Carousel
						arrows
						dots={false}
						infinite={false}
						afterChange={(current) => {
							this.afterChange(current);
						}}
					>
						{
							styles
								.map(
									(Style, index) => <div className="style" key={index}>
										<Style
											key={index}
											width={width}
											block={blocks[blockNumber]}
											height={height}
											canvasRef={canvasRef}
											attributesRef={attributesRef}
											hidden={activeSlide !== index}
											handleResize={onCanvasResize}
											{...options}
										/>
									</div>
								)
						}
					</Carousel>

					</Content>
					<Sider width={300}>
						<Options
							blocks={blocks}
							blockNumber={blockNumber}
							attributes={attributesRef.current || {}}
							mods={mods}
							options={options}
							handleBlockChange={(number) => this.setBlockNumber(number)}
						/>
					</Sider>
				</Layout>
				<Footer>Footer</Footer>
			</Layout>
		);
	}
};

export default withDimensions(App);
