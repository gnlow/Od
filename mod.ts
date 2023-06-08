import {
    Permutation,
    Combination,
    CartesianProduct
} from "npm:js-combinatorics"

import Iteruyo, { $ } from "https://deno.land/x/iteruyo@v0.2.0/mod.ts"

const undup =
    (it: Iteruyo<string>) =>
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

const rotStr = (str: string) =>
    [...str].map((_, i) => [
        ...str.slice(i),
        ...str.slice(0, i),
    ].join(""))

const rotate = 
    (it: Iteruyo<string>) =>
    it.flatMap(
        (s: string) =>
            new CartesianProduct(
                rotStr(s.slice(0, 4)),
                rotStr(s.slice(4, 8)),
            )        
    )
    .map(x => x.join(""))

const swap =
    (s: string) =>
    [s, s.slice(4, 8) + s.slice(0, 4)]

const result =
$(new Permutation("aabbccxx")) // 8!
    .map(chars => chars.join(""))
        .pipe(undup)    // /2^4
        .pipe(inspect)
    .map(norm)
        .pipe(undup)    // /3!
        .pipe(inspect)
    .map(
        s => new CartesianProduct(
            rotStr(s.slice(0, 4)),
            rotStr(s.slice(4, 8)),
        ).toArray()
        .map(x => x.join(""))
        .sort()[0]
    )
        .pipe(undup)    // 
        .pipe(inspect)

Deno.writeTextFile("68.txt", result.join("\n"))