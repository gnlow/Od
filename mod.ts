import {
    Permutation,
    Combination,
    CartesianProduct
} from "npm:js-combinatorics"

import Iteruyo, { $ } from "https://deno.land/x/iteruyo@v0.2.0/mod.ts"

const undup =
    <T>
    (it: Iteruyo<T>) =>
    new Iteruyo(new Set(it))

const norm = (a: string) => {
    let list = "";
    return [...a].map(char => {
        if (char == "x") return "x"
        const foo = list.indexOf(char)
        if (foo == -1) {
            list += char
            return "abc"[list.length - 1]
        } else return "abc"[foo]
    }).join("")
}

const inspect = <T>(it: Iteruyo<T>) => {
    console.log(it.length)
    return it
}

console.log(
    $(new Permutation("aabbccxx")) // 8!
        .map(chars => chars.join(""))
            .pipe(undup)    // /2^4
            .pipe(inspect)
        .map(norm)
            .pipe(undup)    // /3!
            .pipe(inspect)
        .pipe(() => {})
        //.toArray()
)