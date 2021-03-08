module.exports = {
	extends: [
		"stylelint-config-standard",
		"stylelint-config-sass-guidelines",
		"stylelint-config-idiomatic-order"
	],
	rules: {
		"block-closing-brace-newline-before": "always",
		"block-opening-brace-newline-after": "always",
		"color-named": "always-where-possible",
		indentation: "tab",
		"length-zero-no-unit": null,
		"max-empty-lines": 1,
		"max-nesting-depth": null,
		"order/properties-alphabetical-order": null,
		"selector-combinator-space-after": "always",
		"selector-combinator-space-before": "always",
		"selector-max-compound-selectors": null,
		"selector-max-id": null,
		"selector-no-qualifying-type": null
	}
};
