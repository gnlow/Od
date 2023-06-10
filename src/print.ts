import { renderToString } from "https://esm.sh/react-dom@18.2.0/server"

export default async function print(Component: JSX.Element, output: string) {
    await Deno.writeTextFile(output, renderToString(Component))
}