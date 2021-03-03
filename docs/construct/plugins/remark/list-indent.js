/**
 * @param node
 * @param parent
 * @param context
 * @example
 */
const list = (node, parent, context) => {
	let {
		level
	} = context;

	if (level === undefined) {
		level = 0;
	}
	else {
		level += 1;
	}

	const test = node.children
		.map((child, index) => {
			const listContent = context.handle(child, node, {
				...context,
				level,
				listIndex: index
			});

			return listContent;
		})
		.join("\n");

	return test;
};

/**
 * @param node
 * @param parent
 * @param context
 * @example
 */
const listItem = (node, parent, context) => {
	const {
		level,
		listIndex
	} = context;

	const indent = "\t".repeat(level);

	const bullet = parent.ordered ? `${listIndex + 1}.` : "-";

	return node.children
		.map((child, index) => {
			const content = context.handle(child, node, context);

			if (child.type === "list") {
				return content;
			}

			return index === 0
				? `${indent}${bullet} ${content.split("\n").join(`\n${indent}\t`)}`
				: `${indent}\t${content.split("\n").join(`\n${indent}\t`)}`;
		})
		.join("\n");
};

export {
	list,
	listItem
};

export default {
	settings: {
		handlers: {
			list,
			listItem
		}
	}
};
