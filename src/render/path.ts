import { Vec2, vec2 } from "./Vec2.ts"
import { Grid } from "./Grid.ts"
import { turtle } from "./turtle.ts"

type Point = {pos: Vec2, dir: Vec2}

const dirToStr =
    ({x, y}: Vec2, turn: number) =>
    [
        ["───"," │ "," │ ","───"],
        ["─╯ ","─╮ "," ╰─"," ╭─"],
        ["───"," │ "," │ ","───"],
        ["─╮ "," ╭─","─╯ "," ╰─"],
    ][turn % 4][1.5*x + 0.5*y + 1.5]

const codeNormalize =
    (code: string): string => {
        const start = code.indexOf("(")
		const result = code.slice(start) + code.slice(0, start)
		if (/^[^(]*\([^()]*\)[^()]*\)/.test(result)) return codeNormalize(code.slice(1) + code.slice(0, 1))
        return result
    }

export function path(
    code: string,
    log: (...args: unknown[]) => void = () => {},
) {
    code = codeNormalize(code)
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
    
        grid.set(pos(), "─┼─")
        for (const char of code) {
            log(char, dirToStr(dir(), 0), pos()+"")
            if (char == "-") {
                move()
                /*
                grid.set(pos(), dirToStr(dir(), 0))
                move()
                */
                grid.set(pos(), "─┼─")
                turnCW()
                turnCW()
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

        return grid
    })({pos: vec2(0, 0), dir: vec2(-1, 0)})
    } catch {
        return new Grid<string>()
    }
}