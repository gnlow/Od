import { Vec2, vec2 } from "./Vec2.ts"

type Controler = {
    move: () => void
    turnCW: () => void
    turnCCW: () => void

    getState(): {
        pos: Vec2
        dir: Vec2
    }
}

const turtle = (turtle: (controler: Controler) => void) => {
    let pos = vec2(0, 0)
    const dir = vec2(-1, 0)

    const move = () => {
        pos = pos.add(dir)
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

    const getState = () => ({pos, dir})

    turtle({
        move,
        turnCW,
        turnCCW,
        getState,
    })
}
type Point = {pos: Vec2, dir: Vec2}

const dirToArrow =
    ({x, y}: Vec2) =>
    "←↓↑→"[1.5*x + 0.5*y + 1.5]

const copy = (object: any) => JSON.parse(JSON.stringify(object))

class Grid<T> {
    data: Map<`${number},${number}`, T> = new Map()
    consturctor() {
    }

    at(pos: Vec2) {
        return this.data.get(pos.toCoord())
    }
    set(pos: Vec2, value: T) {
        this.data.set(pos.toCoord(), value)
    }
}

turtle(({move, turnCW, turnCCW, getState}) => {
    const {pos, dir} = getState()
    const grid = new Grid<boolean>()
    grid.set(pos, true)

    
    const stack: Point[] = []

    const push = () => {
        stack.push(copy({pos, dir}))
    }
    
    const pop = () => {
        //drawLine(stack.pop()!, {pos, dir})
    }

    for (const char of "((-)xx-)") {
        const {pos, dir} = getState()

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

    //console.log(lines)
})