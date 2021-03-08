# blockstyles

Blockstyle components are in [[./source/styles/]] and should be compatible with the example one in [ethblockart-p5-template](https://github.com/ethblockart/ethblockart-p5-template). This whole project is based on it, but uses parcel for bundling and [Pumpn Code's template repository](https://github.com/pumpncode/template) as a boilerplate, so I can use new JavaScript features like BigInt for example.

The style components also accept a new prop called `visible`, you can pass false there to pause the p5 loop in cases the canvas isn't shown but the component is rendered. I'm using antd's carousel for example, which would lag a lot if we aren't pausing the loop.
