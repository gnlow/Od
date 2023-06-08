import {
    Permutation,
    Combination,
} from "npm:js-combinatorics"

import Iteruyo, { $ } from "https://deno.land/x/iteruyo@v0.2.0/mod.ts"

const undup =
    <T>(eq: (a: T, b: T) => boolean) =>
    (it: Iteruyo<T>) => {
        return new Iteruyo(function*() {
            const prev: T[] = []
            for (const curr of it) {
                if (!prev.find(x => eq(x, curr))) {
                    yield curr
                    prev.push(curr)
                }
            }

        })
    }
    /*
    it.reduce(
        (prev, curr) =>
            prev.find(x => eq(x, curr))
                ? prev
                : prev.concat(curr)
        ,
        [] as T[]
    )*/

const norm = (a: string) => {
    let list = "";
    return [...a].map(char => {
        if (char == "x") return "x"
        const foo = list.indexOf(char)
        if (foo == -1) {
            list += char
            return list.length - 1
        } else return foo
    }).join("")
}

const swap = undup<string>((a, b) => {
    return norm(a) == norm(b)
})

console.log(
    $(new Permutation("aabbccxx"))
        .map(chars => chars.join(""))
        .pipe(swap)
        //.length
        .toArray()
)