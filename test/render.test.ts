import { assertEquals } from "../deps.ts"

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