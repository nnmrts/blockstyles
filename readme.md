# blockstyles

Blockstyle components are in [`./source/styles/`](./source/styles/) and should be compatible with the example one in [ethblockart-p5-template](https://github.com/ethblockart/ethblockart-p5-template). The fully compatible components can be found under [`./build/eba`](./build/eba) and can replace the `CustomStyle.js` file of the original template. This whole project is based on it, but uses parcel for bundling and [Pumpn Code's template repository](https://github.com/pumpncode/template) as a boilerplate.

The style components also accept a new prop called `hidden`, you can pass `true` there to pause the p5 loop in cases the canvas isn't shown but the component is rendered. I'm using antd's carousel for example, which would lag a lot if we aren't pausing the loop.
