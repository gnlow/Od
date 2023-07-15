import { Vec2, vec2 } from "./Vec2.ts"
import { Grid } from "./Grid.ts"
import { turtle } from "./turtle.ts"

type Point = {pos: Vec2, dir: Vec2}

const dirToStr =
    ({x, y}: Vec2, turn: number) =>
    [
        ["───"," │ "," │ ","─►─"],
        ["─╯ ","─╮ "," ╰─"," ╭─"],
        ["───"," │ "," │ ","─►─"],
        ["─╮ "," ╭─","─╯ "," ╰─"],
    ][turn % 4][1.5*x + 0.5*y + 1.5]

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
                let turn = 0
                let prevDir = dir()
    
                log("    ", dirToStr(dir(), 0), pos()+"")
                while (true) {
                    turnCW()
                    turn += 1
                    log(prevDir, dir(), turn % 4)
                    grid.set(pos(), dirToStr(dir(), turn))
                    move()
                    log(grid.render())
                    if (pos().eq(to.pos) && dir().eq(to.dir.reverse())) {
                        break
                    }
                    if (grid.at(pos())) {
                        turnCW()
                        turnCW()
                        turn += 2
                        move()
                    } else {
                        //log("    ", dirToArrow(dir()), pos()+"", turn)
                        prevDir = dir()
                        log(prevDir)
                        turn = 0
                    }
                }
                log("    ", dirToStr(dir(), 0), pos()+"")
            })({
                pos: from.pos.add(from.dir),
                dir: from.dir
            })
        }
    
        grid.set(pos(), "─┼─")
        for (const char of code) {
            log(char, dirToStr(dir(), 0), pos()+"")
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
    
        //log(grid.render())

        return grid
    })({pos: vec2(0, 0), dir: vec2(-1, 0)})
}