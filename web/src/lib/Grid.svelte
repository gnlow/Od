<script lang="ts">
    import type { Grid } from "$lib"
    import Pixel from "./Pixel.svelte"

    export let grid: Grid<string>
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="{grid.minX} {-grid.maxY} {grid.width} {grid.height}"
    {...$$restProps}
>
    {#each grid.traverse() as {pos: {x, y}, value}}
        <Pixel
            code={value}
            x={x}
            y={-y}
        />
    {/each}
</svg>