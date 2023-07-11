import { Vec2, vec2 } from "./Vec2.ts"
import { Grid } from "./Grid.ts"
import { turtle } from "./turtle.ts"

type Point = {pos: Vec2, dir: Vec2}

const dirToArrow =
    ({x, y}: Vec2) =>
    ["───"," │ "," │ ","───"][1.5*x + 0.5*y + 1.5]
const dirToCorner =
    ({x, y}: Vec2) =>
    ["─╯ ","─╮ "," ╰─"," ╭─"][1.5*x + 0.5*y + 1.5]

export function path(
    code: string,
    log: (...args: unknown[]) => void = () => {},
) {
    return turtle(({move, turnCW, pos, dir,}) => {
        const grid = new Grid<string>()
        
        const stack: Point[] = []
    
        const push = () => {
            stack.push({pos: pos().copy(), dir: dir().copy()})
        }
        
        const pop = () => {
            const from = stack.pop()!
            const to = {pos: pos().copy(), dir: dir().copy()}
    
            turtle(({move, turnCW, pos, dir,}) => {
                if (pos().eq(to.pos)) {
                    return
                }
                let turn = 1
    
                log("    ", dirToArrow(dir()), pos()+"")
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
                        log("    ", dirToArrow(dir()), pos()+"", turn)
                        turn += 1
                    }
                }
                log("    ", dirToArrow(dir()), pos()+"")
            })({
                pos: from.pos.add(from.dir),
                dir: from.dir
            })
        }
    
        grid.set(pos(), "─┼─")
        for (const char of code) {
            log(char, dirToArrow(dir()), pos()+"")
            if (char == "-") {
                push()
                move()
                grid.set(pos(), "─┼─")
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
    
        log(grid.render())

        return grid
    })({pos: vec2(0, 0), dir: vec2(-1, 0)})
}