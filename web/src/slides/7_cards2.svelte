<script lang="ts">
    import Card from "$lib/Card.svelte"
    const cards =
`(-x()-x)
(-()x-x)
((-)xx-)
((-xx)-)
(-)x(-x)
()-x()-x
()x-x()
()(-)xx
()(-xx)
(xx-())
(-())-xx
(x(-x))`
.split("\n")
</script>

<style>
    h2 {
        font-size: 5rem;
        margin: 0.5rem 0;
    }
    cards {
        display: grid;
        gap: 1rem;
        justify-content: center;
        grid-template: repeat(2, 1fr) / repeat(6, 1fr);
        grid-auto-flow: column;
        grid-template-columns: min-content auto;
    }
</style>

<h2>n = 2</h2>

<cards>
    {#each cards as code}
        <Card {code}/>
    {/each}
</cards>