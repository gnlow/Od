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

const swap =
    (s: string) =>
    [s, s.slice(s.length/2) + s.slice(0, s.length/2)].sort()[0]

const result =
$(new Permutation("aabbxx")) // 6!
    .map(chars => chars.join(""))
        .pipe(undup)    // /2^3
        .pipe(inspect)
    .map(norm)
        .pipe(undup)    // /2!
        .pipe(inspect)
    .map(swap)
        .pipe(undup)
        .pipe(inspect)
    .map(norm)
        .pipe(undup)
        .pipe(inspect)
    .filter(str => !/(a.a|b.b|x.x)...|...(a.a|b.b|x.x)/.test(str))
        .pipe(inspect)
    .filter(str => !/.a..a.|.b..b.|.x..x./.test(str))
        .pipe(inspect)
    .filter(str => !/a.*b.*a.*b/.test(str))
        .pipe(inspect)
    //.filter()

Deno.writeTextFile("result.txt", result.join("\n"))