import { Vec2, vec2 } from "./Vec2.ts"
import { turtle } from "./turtle.ts"

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

turtle(({move, turnCW, turnCCW, pos, dir,}) => {
    const grid = new Grid<boolean>()
    grid.set(pos(), true)

    
    const stack: Point[] = []

    const push = () => {
        stack.push({pos: pos().copy(), dir: dir().copy()})
    }
    
    const pop = () => {
        //drawLine(stack.pop()!, {pos, dir})
        const from = stack.pop()!

        turtle(({move, turnCW, turnCCW, pos, dir,}) => {
            while (0) {
                turnCW()
                move()
                if (grid.at(pos())) {

                }
            }
        })({
            pos: from.pos.add(from.dir),
            dir: from.dir
        })
    }

    for (const char of "((-)xx-)") {
        console.log(char, dirToArrow(dir()), pos())
        if (char == "-") {
            push()
            move()
            grid.set(pos(), true)
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
})({pos: vec2(0, 0), dir: vec2(-1, 0)})