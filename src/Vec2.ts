import { yellow } from "https://deno.land/std@0.193.0/fmt/colors.ts"

export class Vec2 {
    x
    y
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    add(b: Vec2) {
        return new Vec2(this.x + b.x, this.y + b.y)
    }
    toCoord() {
        return `${this.x},${this.y}` as const
    }
    copy() {
        return new Vec2(this.x, this.y)
    }
    eq(b: Vec2) {
        return this.x == b.x && this.y == b.y
    }
    reverse() {
        return new Vec2(-this.x, -this.y)
    }
    turnCW() {
        return new Vec2(this.y, -this.x)
    }
    
    [Symbol.toPrimitive]() {
        return `(${yellow(this.x+"")}, ${yellow(this.y+"")})`
    }
}

export const vec2 = (x: number, y: number) => new Vec2(x, y)