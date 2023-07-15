<script lang="ts">
    export let code: string
    export let stroke = 0.1
    export let x: number
    export let y: number

    let d = ""
    $: d = {
        "───": "M0,0.5 H1",
        " │ ": "M0.5,0 V1",
        "─┼─": "M0,0.5 H1 M0.5,0 V1",
        "─╯ ": "M 0 0.5 A 0.5 0.5 0 0 0 0.5 0",
        " ╰─": "M 0.5 0 A 0.5 0.5 90 0 0 1 0.5",
        " ╭─": "M 1 0.5 A 0.5 0.5 180 0 0 0.5 1",
        "─╮ ": "M 0.5 1 A 0.5 0.5 270 0 0 0 0.5"
    }[code]!
</script>

<g
    stroke="black"
    fill="none"
    stroke-width={stroke}
    transform="translate({x}, {y})"
>
    <path
        {d}
        class={code}
    />
</g>