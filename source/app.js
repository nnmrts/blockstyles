import React, {
	Component
} from "react";
import {
	Carousel,
	Layout,
	Typography
} from "antd";

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

/**
 *
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
			afterChange
		} = this;

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
											width={500}
											block={blocks[blockNumber]}
											height={500}
											canvasRef={canvasRef}
											attributesRef={attributesRef}
											visible={activeSlide === index}
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

export default App;
