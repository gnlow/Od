<script lang="ts">
    import { path } from "$lib"
    import Grid from "$lib/Grid.svelte"

    let code = ""


</script>

<style>
    p {
        font-family: monospace;
        white-space: pre-wrap;
    }
</style>

<input bind:value={code} />

<p>
    {path(code).render()}
</p>

<Grid
    grid={path(code)}
    width="100px"
/>