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
    

console.log(normalize([ [ "A", "*", "0", "b" ], [ "0", "a", "B", "*" ] ] ))