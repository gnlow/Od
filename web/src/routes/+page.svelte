<script lang="ts">
    import Card from "$lib/Card.svelte"
    import SlideContainer from "$lib/SlideContainer.svelte"
    import Slide from "$lib/Slide.svelte"

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
    h1 {
        font-size: 5rem;
        margin: 1rem 0;
    }
    h2 {
        font-size: 3rem;
        margin: 1rem 0;
    }
    cards {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
    }
</style>

<SlideContainer>
    <Slide>
        <h1>낙서와 조합론</h1>
        <h2>30000 홍길동</h2>
    </Slide>
    <Slide>
        <h1>Hello world</h1>
    </Slide>
    <Slide>
        <cards>
            {#each t23 as code}
                <Card {code}/>
            {/each}
        </cards>
    </Slide>
</SlideContainer>
