const codeToNum =
(charset: string) =>
(str: string) =>
    str
        .split("")
        .map((char) => charset.indexOf(char))
        .join("")
        
const hash_ =
(charset: string) =>
(str: string) =>
    parseInt(
        codeToNum(charset)(str),
        charset.length
    ) / charset.length ** str.length

export const hash = hash_("()x-")