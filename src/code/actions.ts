import { pipe, flow } from "https://esm.sh/@mobily/ts-belt@3.13.1"
import { normalize } from "./util.ts"

type Action<E> = (e: E) => E

export const id: Action<string> =
    s => s
export const rot180: Action<string> =
    s => {
        const split = s.split("-")
        return [split[0], ...split.slice(1)].join("-")
    }
export const flipH: Action<string> =
    s => [...s]
        .reverse()
        .map(x =>
            x == "("
            ? ")"
            : x == ")"
                ? "("
                : x
        )
        .join("")
export const flipV = flow(rot180, flipH)

const genAction =
    (action: Action<string>) =>
    (xs: string[]) =>
    xs.flatMap(x => [x, normalize(action(x))])

export const normalizeAction =
    (...actions: Action<string>[]) =>
    (x: string) =>
    pipe(
        [x],
        ...actions.map(genAction) as [(xs: string[]) => string[]]
    ).sort()[0]