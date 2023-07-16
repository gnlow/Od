<script lang="ts">
    import { path } from "$lib"
    import Grid from "$lib/Grid.svelte"
    import { hash } from "$lib/hash"

    let code = "(x-)x(-)"

    $: code, console.log(Math.round(hash(code)*100))
</script>

<style>
    card {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        align-items: center;
        width: fit-content;
        gap: 1rem;

        --theme-light: hsl(
            calc(var(--hash) * 360)
            50%
            80%
        );
        --theme-dark: hsl(
            calc(var(--hash) * 360)
            50%
            20%
        );
        background-color: var(--theme-light);

        border-radius: 0.5rem;
    }
    textarea {
        background: none;
        border: none;
        border-bottom: 3px solid var(--theme-dark);
        outline: none;
        font-size: 2rem;
        font-family: "JetBrains Mono", monospace;
        color: var(--theme-dark);
        width: 10rem;
        word-wrap: break-word;
        resize: none;
        height: 1.5em;
    }
</style>

<card
    style:--hash={hash(code)}
>
    <Grid
        grid={path(code)}
        width="10rem"
        height="10rem"
        color="var(--theme-dark)"
    />
    <textarea bind:value={code} />
</card>
