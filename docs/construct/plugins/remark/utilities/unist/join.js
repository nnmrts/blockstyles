/**
 * @param nodes
 * @param joinNode
 * @example
 */
const join = (nodes, joinNode) => {
	const joined = [];

	for (const [index, node] of nodes.entries()) {
		joined.push(node);

		if (index === nodes.length - 1) {
			break;
		}

		joined.push(joinNode);
	}

	return joined;
};

export default join;
