import { path } from "../src/path.ts"

const t23 =
`(-x()-x)
(-()x-x)
((-)xx-)
((-xx)-)
(-)x(-x)
(x-()x-)
(-x()-x)
(-xx(-))
(-(xx-))
(x-)x(-)
()-x()-x
()x-x()
()(-)xx
()(-xx)
()x-()x
()-xx(-)
(xx-)()
(xx-())
(-())-xx
(x(-x))
(()-xx)
(()-)xx
((x-)x)`
.split("\n")

;["(-x()-x)"].forEach(code => {
    console.log(path(code, console.log).render())
})