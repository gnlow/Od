const c =
    (x: number, y: number) =>
    ({x, y})

const pos = c(0, 0)
const dir = c(-1, 0)

const move = () => {
    pos.x += dir.x
    pos.y += dir.y
}

const turnCW = () => {
    const {x, y} = dir
    dir.x = y
    dir.y = -x
}

const turnCCW = () => {
    const {x, y} = dir
    dir.x = -y
    dir.y = x
}

type Vec2 = {x: number, y: number}
type Point = {pos: Vec2, dir: Vec2}

const stack: Point[] = []

const push = () => {
    stack.push(copy({pos, dir}))
}

const pop = () => {
    drawLine(stack.pop()!, {pos, dir})
}

const dirToArrow =
    ({x, y}: Vec2) =>
    "←↓↑→"[1.5*x + 0.5*y + 1.5]

const lines: [Point, Point][] = []

const copy = (object: any) => JSON.parse(JSON.stringify(object))

const drawLine =
    (from: Point, to: Point) =>
    lines.push([copy(from), copy(to)])

const posToCoord =
    ({x, y}: Vec2) =>
    `${x},${y}` as const

class Grid<T> {
    data: Map<`${number},${number}`, T> = new Map()
    consturctor() {
    }

    at(pos: Vec2) {
        return this.data.get(posToCoord(pos))
    }
    set(pos: Vec2, value: T) {
        this.data.set(posToCoord(pos), value)
    }
}

const grid = new Grid<boolean>()
grid.set(pos, true)

for (const char of "((-)xx-)") {
    console.log(char, dirToArrow(dir), pos)
    if (char == "-") {
        push()
        move()
        grid.set(pos, true)
        turnCW()
        turnCW()
        pop()
        turnCW()
    } else {
        if (char == "(") {
            push()
        }
        if (char == ")") {
            pop()
        }
        if (char == "x") {
            //
        }
        turnCW()
    }
}

console.log(lines)