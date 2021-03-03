import test from "ava";

import hello from "../source/hello.js";

test("returns hello", (t) => {
	t.is(hello(), "hello");
});
