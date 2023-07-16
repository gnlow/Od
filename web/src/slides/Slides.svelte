<script>
    import SlideContainer from "$lib/SlideContainer.svelte"
    import Slide from "$lib/Slide.svelte"

    import title from "./title.svelte"
    import doodle from "./doodle.svelte"
    import def from "./def.svelte"
    import feature from "./feature.svelte"
    import cards from "./cards.svelte"

    const slides = [
        title,
        doodle,
        def,
        feature,
        cards,
    ]
</script>

<SlideContainer>
    {#each slides as slide}
        <Slide>
            <svelte:component this={slide}/>
        </Slide>
    {/each}
</SlideContainer>