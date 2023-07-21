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
        return `(${this.x}, ${this.y})`
    }
    static fromString(str: string) {
        const [x, y] = str.split(",").map(Number)
        return new Vec2(x, y)
    }
}

export const vec2 = (x: number, y: number) => new Vec2(x, y)