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
                    line += "   "
                }
            }
            lines.push(line)
        }
        return lines.reverse().join("\n")
    }
}