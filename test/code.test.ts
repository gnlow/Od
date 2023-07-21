import { assertEquals } from "../deps.ts"

import { toAbc } from "../src/mod.ts"

Deno.test("toAbc", () => {
    assertEquals(
        toAbc("(x-)(x-)"),
        [
            [ "A", "*", "0", "b" ],
            [ "0", "a", "B", "*" ],
        ] 
    )
})