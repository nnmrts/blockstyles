/**
 * @param tree
 * @param iteratee
 * @example
 */
const asyncMap = async(tree, iteratee) => {
	const tracer = async(node, index, parent) => {
		const {
			children
		} = node;

		const newNode = await iteratee(node, index, parent);

		if (children) {
			newNode.children = await Promise.all(
				children.map(async(child, innerIndex) => tracer(child, innerIndex, node))
			);
		}

		return newNode;
	};

	return tracer(tree, null, null);
};

export default asyncMap;
