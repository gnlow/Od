<script lang="ts">
    import type { Grid } from "$lib"
    import Pixel from "./Pixel.svelte"

    export let grid: Grid<string>
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 {grid.width} {grid.height}"
    {...$$restProps}
>
    {#each grid.traverse() as {pos: {x, y}, value}}
        <Pixel
            code={value}
            x={grid.minX+x}
            y={grid.maxY-y}
        />
    {/each}
</svg>