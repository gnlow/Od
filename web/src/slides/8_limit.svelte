<script>
    import Card from "$lib/Card.svelte"

    const cards = [
        "((x-)x)",
        "(x-)(x-)",
        "((x-))x-",
        "(x-)x(-)",
    ]
</script>

<style>
    h2 {
        font-size: 5rem;
        margin: 0.5rem 0;
    }
    cards {
        display: grid;
        gap: 2rem 1rem;
        justify-content: center;
        grid-template: repeat(2, 1fr) / repeat(2, 1fr);
        grid-auto-flow: row;
        grid-template-columns: min-content auto;
    }
</style>

<h2>한계</h2>
<cards>
    {#each cards as code}
        <Card {code}/>
    {/each}
</cards>