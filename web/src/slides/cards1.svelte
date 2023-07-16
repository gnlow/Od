<script lang="ts">
    import Card from "$lib/Card.svelte"
    const cards =
`x()x
(xx)`
.split("\n")
</script>

<style>
    h2 {
        font-size: 5rem;
        margin: 0.5rem 0;
    }
    cards {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
    }
</style>

<h2>n = 1</h2>

<cards>
    {#each cards as code}
        <Card {code}/>
    {/each}
</cards>