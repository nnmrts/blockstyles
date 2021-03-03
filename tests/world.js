import test from "ava";

import world from "../source/world.js";

test("returns world", (t) => {
	t.is(world(), "world");
});
