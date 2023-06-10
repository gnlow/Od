const decode =
    (str: string) => {
        const paths: Record<string, string[]> = {};
        [...str].forEach((char, i) => {
            if (!paths[char]) {
                paths[char] = []
            }
            paths[char].push(
                [
                    "1L",
                    "1U",
                    "2U",
                    "2R",
                    "2D",
                    "1D",
                ][i]
            )
        })
        return paths
    }

console.log(decode("aaxbbx"))

const getCoord =
    (point: string) => {
        let [x, y] = {
            1: [0, 0],
            2: [300, 0],
        }[point[0]]!
        if (point[1] == "L") x -= 100
        if (point[1] == "U") y -= 100
        if (point[1] == "R") x += 100
        if (point[1] == "D") y += 100
        return {x, y, d: point[1]}
    }
const pathGen =
    (path: [string, string]) => {
        const [from, to] = path.map(getCoord)
        let {x, y} = from
        let result = ""
        result += `M ${x} ${y} \n`
        ;[..."LURDLURD".match(RegExp(`${from.d}.*?${to.d}.`))![0]]
            .map(d => {
                switch (d) {
                    case "L":
                        x += -100
                        y += -100
                        result += 
                            "a 100 100 0 0 1 -100 -100 \n" +
                            `v ${Math.max(to.y - y, 0)} \n`
                        break
                    case "U":
                        x += 100
                        y += -100
                        result += 
                            "a 100 100 0 0 1 100 -100 \n" +
                            `h ${Math.max(to.x - x, 0)} \n`
                        break
                    case "R":
                        x += 100
                        y += 100
                        result += 
                            "a 100 100 0 0 1 100 100 \n" +
                            `v ${Math.min(to.y - y, 0)} \n`
                        break
                    case "D":
                        x += -100
                        y += 100
                        console.log({x, y}, to)
                        result += 
                            "a 100 100 0 0 1 -100 100 \n" +
                            `h ${Math.min(to.x - x, 0)} \n`
                        break
                }
            })
            return result
    }

console.log(pathGen(["1L", "2U"]))