// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { S } from "../../web/.svelte-kit/output/client/_app/immutable/chunks/index.14be1a5c.js"

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
            if (result[a[i]]) {
                if (!compareChar(a[i], b[i]))
                    return false
                if (!compareChar(result[a[i]], b[i]))
                    return false
            } else {
                if (!compareChar(a[i], b[i]))
                    return false
                result[a[i]] = b[i]
                return true
            }
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
            return compareCapture(a2[0], b2[0])
        } else if (a1.length == 2) {
            console.log(a1, b1)
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

console.log(normalize([ [ "A", "*", "0", "b" ], [ "0", "a", "B", "*" ] ] ))
console.log(normalize(stringToAbc("A*0b 0aB*")))

console.log(compareAbc(stringToAbc("A*0b 0aB*"), stringToAbc("A*B0 0*ba")))

console.log(compareCapture(["*", "0", "b", "A"], ["*", "B", "0", "A"]))
console.log(compareCapture(["*", "0", "a", "B"], ["*", "b", "a", "0"]))

console.log(compareChar("0", "B"))