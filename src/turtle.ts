import { Vec2, vec2 } from "./Vec2.ts"

export type TurtleControl = {
    move: () => void
    turnCW: () => void
    turnCCW: () => void

    pos(): Vec2
    dir(): Vec2
}

export type TurtleState = {
    pos: Vec2
    dir: Vec2
}

export const turtle =
    (turtle: (controler: TurtleControl) => void) =>
    ({pos, dir}: TurtleState) =>
    {
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

        turtle({
            move,
            turnCW,
            turnCCW,
            pos: () => pos,
            dir: () => dir,
        })
    }