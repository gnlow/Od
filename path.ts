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
            2: [0, 100],
        }[point[0]]!
        if (point[1] == "L") x -= 100
        if (point[1] == "R") x += 100
        if (point[1] == "U") y -= 100
        if (point[1] == "D") y += 100
        return {x, y, d: point[1]}
    }
const pathGen =
    (path: [string, string]) => {
        const [from, to] = path.map(getCoord)
    }