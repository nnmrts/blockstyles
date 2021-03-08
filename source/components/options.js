import React, {
	Fragment,
	useState
} from "react";
import {
	Slider,
	InputNumber,
	Row,
	Col,
	Divider,
	Layout,
	Button
} from "antd";
import {
	ChromePicker
} from "react-color";

const {
	Header,
	Content
} = Layout;

/**
 * @param options
 * @param options.mods
 * @param options.blockNumber
 * @param options.blocks
 * @param options.attributes
 * @param options.handleBlockChange
 * @param options.options
 * @example
 */
const Options = ({
	mods,
	blockNumber,
	blocks,
	attributes,
	handleBlockChange,
	options
}) => {
	const [visible, toggle] = useState({
		background: false,
		color1: false
	});

	return (
	<>
		<Layout>
			<Header>
				Change Block
			</Header>
			<Content>
				<div className="option">
					<Row gutter={8}>
						<Col span={16}>
						<Slider
							min={0}
							max={blocks.length - 1}
							value={blockNumber}
							onChange={handleBlockChange}
						/>
						</Col>
						<Col span={8}>
						<InputNumber
							min={0}
							max={blocks.length - 1}
							value={blockNumber}
							onChange={handleBlockChange}
						/>
						</Col>
					</Row>
				</div>
			</Content>
		</Layout>
		<Layout>
			<Header>
				Change Style
			</Header>
			<Content>
				<>
					{
						mods.map(({
							key,
							set
						}) => (key.match(/color|background/i)
							? <div className="option" key={key}>
								<Divider orientation="left">
									{key}
								</Divider>
								<Button
									shape="circle"
									onClick={() => toggle({
										...visible,
										[key]: true
									})}
								>
									<div
										className="swatch"
										style={{
											backgroundColor: options[key]
										}}
									></div>
								</Button>
								{
									visible[key]
										? <div className="popover">
											<div className="cover" onClick={() => toggle({
												...visible,
												[key]: false
											})}/>
											<ChromePicker
												color={options[key]}
												onChange={({
													hex
												}) => set(hex)}
												disableAlpha
											/>
										</div>
										: null
								}

							</div>
							: <div className="option" key={key}>
								<Divider orientation="left">
									{key}
								</Divider>
								<Row gutter={8}>
									<Col span={16}>
										<Slider
											min={0}
											max={1}
											step={0.01}
											value={options[key]}
											onChange={set}
										/>
									</Col>
									<Col span={8}>
										<InputNumber
											min={0}
											max={1}
											step={0.01}
											value={options[key]}
											onChange={set}
										/>
									</Col>
								</Row>
							</div>))
					}
				</>
			</Content>
		</Layout>
	</>
	);
};

export default Options;
