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

const stack: {pos: Vec2, dir: Vec2}[] = []

const push = () => {
    stack.push({pos, dir})
}

const pop = () => {
    stack.pop()
}

const dirToArrow =
    ({x, y}: Vec2) =>
    "←↓↑→"[1.5*x + 0.5*y + 1.5]


for (const char of "((-)xx-)") {
    console.log(char, dirToArrow(dir), pos)
    if (char == "-") {
        move()
        turnCCW()
    } else {
        if (char == "(") {
            push()
        }
        if (char == ")") {
            pop()
        }
        if (char == "x") {
        }
        turnCW()
    }
}