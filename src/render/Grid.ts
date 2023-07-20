import { Vec2, vec2 } from "./Vec2.ts"

export class Grid<T> {
    data: Map<`${number},${number}`, T> = new Map()
    consturctor() {
    }

    at(pos: Vec2) {
        return this.data.get(pos.toCoord())
    }
    set(pos: Vec2, value: T) {
        this.data.set(pos.toCoord(), value)
    }

    get coords() {
        return [...this.data.keys()].map(Vec2.fromString)
    }
    get minX() {
        return Math.min(...this.coords.map(({x}) => x))
    }
    get maxX() {
        return Math.max(...this.coords.map(({x}) => x))
    }
    get minY() {
        return Math.min(...this.coords.map(({y}) => y))
    }
    get maxY() {
        return Math.max(...this.coords.map(({y}) => y))
    }
    get width() {
        return this.maxX - this.minX + 1
    }
    get height() {
        return this.maxY - this.minY + 1
    }

    render() {
        const lines: string[] = []
        for (let y = this.minY; y <= this.maxY; y++) {
            let line = ""
            for (let x = this.minX; x <= this.maxX; x++) {
                const pos = vec2(x, y)
                const value = this.at(pos)
                if (value) {
                    line += value
                } else {
                    line += "   "
                }
            }
            lines.push(line)
        }
        return lines.reverse().join("\n")
    }
    *traverse() {
        for (let y = this.minY; y <= this.maxY; y++) {
            for (let x = this.minX; x <= this.maxX; x++) {
                const pos = vec2(x, y)
                const value = this.at(pos)
                if (value) {
                    yield {value, pos}
                }
            }
        }
    }
}