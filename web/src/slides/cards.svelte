<script lang="ts">
    import Card from "$lib/Card.svelte"
    const t23 =
`(-x()-x)
(-()x-x)
((-)xx-)
((-xx)-)
(-)x(-x)
(x-()x-)
(-x()-x)
(-xx(-))
(-(xx-))
(x-)x(-)
()-x()-x
()x-x()
()(-)xx
()(-xx)
()x-()x
()-xx(-)
(xx-)()
(xx-())
(-())-xx
(x(-x))
(()-xx)
(()-)xx
((x-)x)`
.split("\n")
</script>

<style>
    cards {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
    }
</style>

<cards>
    {#each t23 as code}
        <Card {code}/>
    {/each}
</cards>