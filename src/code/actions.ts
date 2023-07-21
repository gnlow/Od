type Action<E> = (e: E) => E

const id: Action<string> =
    s => s
const rot180: Action<string> =
    s => s.slice(3) + s.slice(0, 3)
const flip: Action<string> =
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