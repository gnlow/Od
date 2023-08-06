// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"

const count =
    (as: string[]) =>
    as.reduce(
        (prev, curr) => 
            prev + (curr == "*" ? 1 : 0),
        0,
    )

const rotate =
    (i: number) =>
    <A>(as: A[]) => as.slice(i).concat(as.slice(0, i))

const align1x =
    (x: string[]) =>
    rotate(x.join("").indexOf("*"))(x)

const align2x =
    (x: string[]) =>
    rotate(x.join("").repeat(2).indexOf("**"))(x)

const normalize =
    (abc: string[][]) => {
        const obj = _.groupBy(abc, count)
        return [
            obj[0] || [],
            (obj[1] || []).map(align1x),
            (obj[2] || []).map(align2x),
        ]
    }

const charType =
    (c: string) => {
        if (c.toUpperCase() == c.toLowerCase()) return "punc"
        if (c.toUpperCase() == c) return "upper"
        if (c.toLowerCase() == c) return "lower"
    }

const compareChar =
    (a: string, b: string) => {
        if (a == "*" && b == "*") return true
        if (a == "*") return false
        if (b == "*") return false
        if (charType(a) == "punc") return true
        if (charType(b) == "punc") return true
        if (a.toUpperCase() != b.toUpperCase()) return false
        return charType(a) == charType(b)
    }

const compareCapture =
    (a: string[], b: string[], result: Record<string, string> = {}) => {
        const isComparable = a.every((_, i) => {
            if (result[a[i].toUpperCase()]) {
                if (!compareChar(a[i], b[i]))
                    return false
                if (result[a[i].toUpperCase()] != b[i].toUpperCase())
                    return false
            } else {
                if (!compareChar(a[i], b[i]))
                    return false
                result[a[i].toUpperCase()] = b[i].toUpperCase()
            }
            return true
        })
        return isComparable ? result : false
    }

const compareAbc =
    (a: string[][], b: string[][]) => {
        const [a0, a1, a2] = normalize(a)
        const [b0, b1, b2] = normalize(b)
        if (!(a0.length == b0.length && a1.length == b1.length && a2.length == b2.length))
            return false
        let result: false | Record<string, string>
        if (a2.length == 1) {
            // deno-lint-ignore no-cond-assign
            if (result = compareCapture(a2[0], b2[0]))
                return compareCapture(a0[0], b0[0], result)
                // TODO

            else return false

        } else if (a1.length == 2) {
            // deno-lint-ignore no-cond-assign
            if (result = compareCapture(a1[0], b1[0]))
                return compareCapture(a1[1], b1[1], result)

            // deno-lint-ignore no-cond-assign
            else if (result = compareCapture(a1[0], b1[1]))
                return compareCapture(a1[1], b1[0], result)
            
            else return false
        } else { 
            throw new Error("wrong input")
         }
    }

const stringToAbc =
    (s: string) => s.split(" ").map(x => x.split(""))


console.log(compareAbc(stringToAbc("A*0b 0aB*"), stringToAbc("A*B0 0*ba")))

console.log(compareAbc(stringToAbc("A*0B 0ab*"), stringToAbc("A*B0 0*ba")))

import { toAbc } from "./toAbc.ts"

console.log(toAbc("((x-)x)"), toAbc("(x-)(x-)"))

console.log(compareAbc(toAbc("(x(-x))"), toAbc("(x-)(x-)")))

import { Combination } from "npm:js-combinatorics"
import { t29, t15, t13, t12 } from "../collection/mod.ts"

import { $ } from "https://deno.land/x/iteruyo@v0.3.0/mod.ts"

const tuple = <A extends unknown[]>(...as: A) => as

const c = $(new Combination(t29, 2))
    .map(x => [x, x])
    .map(([o, x]) => tuple(o, x.map(toAbc)))
    .map(([o, x]) => tuple(o, compareAbc(x[0], x[1])))
    .filter(([o, x]) => !!x)
    .map(([[o1, o2], x]) => tuple(o1, o2, x))

import { flipH, flipV, rot180, normalizeAction } from "./actions.ts"

const cc = c
    .bypass(x => x.forEach(([o1, o2]) => console.log(o1, o2)))
    .filter(([o1, o2]) => o1 != flipH(o2))

console.log(cc.toArray())

import { flow } from "https://esm.sh/@mobily/ts-belt@3.13.1"
import {
    normalize as codeNormalize,
    denormalize
} from "./util.ts"

const norm = flow(
    codeNormalize,
    normalizeAction(flipH, flipV, rot180),
    denormalize,
)

console.log(_.difference(t15.map(norm), t12.map(norm)))
console.log(_.difference(t12.map(norm), t15.map(norm)))
console.log(norm("()x-()x-"), norm("()-x()-x"))
//console.log(t12.map(toAbc))