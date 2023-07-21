import {
    Permutation,
    CartesianProduct as Prod,
} from "npm:js-combinatorics"

const rotate =
    (i: number) =>
    <A>(as: A[]) => as.slice(i).concat(as.slice(0, i))

const rotateAll =
    (as: string[]) => [
        as,
        rotate(1)(as),
        rotate(2)(as),
        rotate(3)(as),
    ]

const alignForX =
    (as: string[]) => {
        const base = as.join().repeat(2)
        
        const f =
            base.indexOf("xx") != -1
                ? base.indexOf("xx")
                : base.indexOf("x")
        return f != -1
            ? [rotate(f)(as)]
            : rotateAll(as)
    }

const permutateAbc =
    (abc: string[][]) => {
        new Prod(...abc.map(x => alignForX(x)))
    }