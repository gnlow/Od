export type SkeletonControl = {
    move: () => void
    turnCW: () => void

    addPoint: () => void
    readChar: (char: string) => void
}

export const skeleton =
    ({move, turnCW, addPoint, readChar}: SkeletonControl) =>
    (code: string) => {
        addPoint()
        for (const char of code) {
            if (char == "-") {
                move()
                addPoint()
                turnCW()
                turnCW()
                turnCW()
            } else {
                readChar(char)
                turnCW()
            }
        }
    }