import { Vec2, vec2 } from "./Vec2.ts"
import { turtle } from "./turtle.ts"

type Point = {pos: Vec2, dir: Vec2}

const dirToArrow =
    ({x, y}: Vec2) =>
    "─││─"[1.5*x + 0.5*y + 1.5]
const dirToCorner =
    ({x, y}: Vec2) =>
    "╯╮╰╭"[1.5*x + 0.5*y + 1.5]

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
    render() {
        const lines: string[] = []
        const keys = [...this.data.keys()]
        const minX = Math.min(...keys.map(key => +key.split(",")[0]))
        const maxX = Math.max(...keys.map(key => +key.split(",")[0]))
        const minY = Math.min(...keys.map(key => +key.split(",")[1]))
        const maxY = Math.max(...keys.map(key => +key.split(",")[1]))
        for (let y = minY; y <= maxY; y++) {
            let line = ""
            for (let x = minX; x <= maxX; x++) {
                const pos = vec2(x, y)
                const value = this.at(pos)
                if (value) {
                    line += value
                } else {
                    line += " "
                }
            }
            lines.push(line)
        }
        return lines.reverse().join("\n")
    }
}

turtle(({move, turnCW, turnCCW, pos, dir,}) => {
    const grid = new Grid<string>()
    
    const stack: Point[] = []

    const push = () => {
        stack.push({pos: pos().copy(), dir: dir().copy()})
    }
    
    const pop = () => {
        //drawLine(stack.pop()!, {pos, dir})
        const from = stack.pop()!
        const to = {pos: pos().copy(), dir: dir().copy()}

        turtle(({move, turnCW, turnCCW, pos, dir,}) => {
            if (pos().eq(to.pos)) {
                return
            }
            let turn = 1

            console.log("    ", dirToArrow(dir()), pos()+"")
            while (true) {
                turnCW()
                grid.set(pos(), turn != 0 ? dirToCorner(dir()) : dirToArrow(dir()))
                move()
                if (pos().eq(to.pos)) {
                    break
                }
                if (grid.at(pos())) {
                    turnCW()
                    turnCW()
                    move()
                    turn = 0
                } else {
                    console.log("    ", dirToArrow(dir()), pos()+"", turn)
                    turn += 1
                }
            }
            console.log("    ", dirToArrow(dir()), pos()+"")
        })({
            pos: from.pos.add(from.dir),
            dir: from.dir
        })
    }

    for (const char of "((-)xx-)") {
        console.log(char, dirToArrow(dir()), pos()+"")
        if (char == "-") {
            push()
            move()
            grid.set(pos(), "┼")
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

    console.log(grid.render())
})({pos: vec2(0, 0), dir: vec2(-1, 0)})