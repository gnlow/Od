<script lang="ts">
    import { path } from "$lib"

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