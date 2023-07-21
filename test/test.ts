import { assertEquals } from "https://deno.land/std@0.195.0/assert/mod.ts"

import { path } from "../src/render/path.ts"

const cards =
`(-x()-x)
(-()x-x)
((-)xx-)
((-xx)-)
(-)x(-x)
()-x()-x
()x-x()
()(-)xx
()(-xx)
(xx-())
(-())-xx
(x(-x))`
.split("\n")

Deno.test("12 paths", async () => {
    assertEquals(
        cards.map(code => path(code).render()).join("\n"),
        await Deno.readTextFile("./test/p12.txt")
    )
})