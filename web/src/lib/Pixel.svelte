<script lang="ts">
    export let code: string
    export let stroke = 0.5
    export let x: number
    export let y: number

</script>

<style>
    .─── {d: path("M0,0.5 H1")}
    .│   {d: path("M0.5,0 V1")}
    .─┼─ {d: path("M0,0.5 H1 M0.5,0 V1")}
    .─╯  {d: path("M 0 0.5 A 0.5 0.5 0 0 0 0.5 0")}
    .╰─  {d: path("M 0.5 0 A 0.5 0.5 90 0 0 1 0.5")}
    .╭─  {d: path("M 1 0.5 A 0.5 0.5 180 0 0 0.5 1")}
    .─╮  {d: path("M 0.5 1 A 0.5 0.5 270 0 0 0 0.5")}
    
    path {
        transition: 0.4s;
    }
</style>

<path
    stroke="black"
    fill="none"
    stroke-width={stroke}
    transform="translate({x}, {y})"

    class={code}
/>