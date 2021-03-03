import test from "ava";

import helloWorld from "../source/index.js";

test("returns Hello World!", (t) => {
	t.is(helloWorld(), "Hello World!");
});
