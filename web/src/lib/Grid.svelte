<script lang="ts">
    import { tweened } from "svelte/motion"
    import { cubicOut } from "svelte/easing"

    import type { Grid } from "$lib"
    import Pixel from "./Pixel.svelte"

    export let grid: Grid<string>

    export let color: string

    const tweenOption = {
        duration: 400,
        easing: cubicOut,
    }
    const minX = tweened(0, tweenOption)
    const maxY = tweened(0, tweenOption)
    const width = tweened(0, tweenOption)
    const height = tweened(0, tweenOption)

    $: grid, (() => {
        minX.set(grid.minX)
        maxY.set(grid.maxY)
        width.set(grid.width)
        height.set(grid.height)
    })()
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="{$minX} {-$maxY} {$width} {$height}"
    {...$$restProps}
>
    {#each
        grid.traverse()
        as {pos, value}
        (pos+"")
    }
        <Pixel
            code={value}
            x={pos.x}
            y={-pos.y}
            {color}
        />
    {/each}
</svg>