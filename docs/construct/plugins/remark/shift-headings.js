/**
 * @example
 */
const shiftHeadings = () => (tree) => {
	const {
		children
	} = tree;

	const newChildren = [];

	let foundFirstHeading = false;

	for (const child of children) {
		if (child.type === "heading" && !foundFirstHeading) {
			foundFirstHeading = true;
		}
		else {
			newChildren.push(child);
		}
	}

	return {
		...tree,
		children: newChildren
	};
};

export default shiftHeadings;
