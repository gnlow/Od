import { Vec2, vec2, Grid, turtle } from "../util/mod.ts"
import { denormalize, skeleton } from "../code/mod.ts"

type Point = {pos: Vec2, dir: Vec2}

const dirToStr =
    ({x, y}: Vec2, turn: number) =>
    [
        ["───"," │ "," │ ","───"],
        ["─╯ ","─╮ "," ╰─"," ╭─"],
        ["───"," │ "," │ ","───"],
        ["─╮ "," ╭─","─╯ "," ╰─"],
    ][turn % 4][1.5*x + 0.5*y + 1.5]

export function path(
    code: string,
    log: (...args: unknown[]) => void = () => {},
) {
    code = denormalize(code)
    try {
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
                let turn = 0
    
                log("    ", dirToStr(dir(), 0), pos()+"")
                while (true) {
                    turnCW()
                    turn += 1
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
                        turn = 0
                    }
                }
                log("    ", dirToStr(dir(), 0), pos()+"")
            })({
                pos: from.pos.add(from.dir),
                dir: from.dir
            })
        }
    
        skeleton({
            move,
            turnCW,
            addPoint: () => grid.set(pos(), "─┼─"),
            readChar: (char: string) => {
                if (char == "(") push()
                if (char == ")") pop()
                if (char == "x") {/* pass */}
            },
        })(code)

        return grid
    })({pos: vec2(0, 0), dir: vec2(-1, 0)})
    } catch {
        return new Grid<string>()
    }
}