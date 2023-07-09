const count =
    (str: string) =>
    (arr: string[]) =>
    arr.filter(x => x == str).length

const pp =
    (curr: string, remain: string[]): string[] =>
    remain.length == 0
        ? [curr]
        : remain
        .flatMap(
            (x, i, l) => {
                if (x == "x") {
                    if (curr == "") return []
                }
                if (x == ")") {
                    if (count("(")(remain) == count(")")(remain)) {
                        return []
                    }
                }
                return pp(
                    curr + x,
                    l.filter((_, j) => i != j),
                )
            }
        )

const undup =
    (arr: string[]) =>
    [...new Set(arr)]

const t =
    undup(pp("(", "(xx))".split("")))
    .flatMap(str => {
        const [a,b,c,d,e,f] = str
        return [
            [a,"-",b,c,d,"-",e,f],
            [a,b,"-",c,d,e,"-",f],
            [a,b,c,"-",d,e,f],
        ].map(x => x.join(""))
    })
    .filter(str => !/\(x-x\)|x.-.x|\(x\)|x[^-]x/.test(str))
    .filter(str => !/\(-xxx-\)/.test(str.replace("()", "xx")))

//console.log(t.join("\n"))

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

/*
console.log(t.filter(x => !t23.includes(x)).join("\n"))
console.log(t.length)
*/
//console.log(t)
console.log(t.filter(x => !t23.includes(x)))
console.log(t.filter(x => !t23.includes(x)).length)
console.log(t23.filter(x => !t.includes(x)))