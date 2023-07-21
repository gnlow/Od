import { turtle, Grid, vec2 } from "../util/mod.ts"
import { skeleton } from "./skeleton.ts"

const toLower = (n: number) => String.fromCharCode("a".charCodeAt(0) + n)
const toUpper = (n: number) => String.fromCharCode("A".charCodeAt(0) + n)
const toPoint = (n: number) => String.fromCharCode("0".charCodeAt(0) + n)

export const toAbc = (code: string) =>
    turtle(({move, turnCW, pos,}) => {
        const grid = new Grid<string[]>()
        let i = -1
        let lineCount = 0
        const stack: number[] = []
        skeleton({
            move: () => {
                grid.at(pos())!.length == 4 || grid.at(pos())!.push(toPoint(lineCount))
                move()
                grid.at(pos()) || grid.set(pos(), [toPoint(lineCount)])
                lineCount += 1
            },
            turnCW,
            addPoint: () => {
                console.log(pos())
                grid.at(pos()) || grid.set(pos(), [])
            },
            readChar: (char: string) => {
                if (char == "(") {
                    i += 1
                    stack.push(i)
                    grid.at(pos())!.push(toUpper(i))
                }
                if (char == ")") {
                    grid.at(pos())!.push(toLower(stack.pop()!))
                }
                if (char == "x") {
                    grid.at(pos())!.push("*")
                }
            }
        })(code)
        return grid.getPoints().map(({value}) => value)
    })({pos: vec2(0, 0), dir: vec2(-1, 0)})