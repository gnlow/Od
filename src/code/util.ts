export const denormalize =
    (code: string): string => {
        const start = code.indexOf("(")
		const result = code.slice(start) + code.slice(0, start)
		if (/^[^(]*\([^()]*\)[^()]*\)/.test(result)) return denormalize(code.slice(1) + code.slice(0, 1))
        return result
    }

export const normalize =
    (code: string) => {
        const start = code.indexOf("-")+1
        return code.slice(start) + code.slice(0, start)
    }