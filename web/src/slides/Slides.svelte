<script>
    import SlideContainer from "$lib/SlideContainer.svelte"
    import Slide from "$lib/Slide.svelte"

    import title from "./title.svelte"
    import doodle from "./doodle.svelte"
    import def from "./def.svelte"
    import feature from "./feature.svelte"
    import encode from "./encode.svelte"
    import cards1 from "./cards1.svelte"
    import cards2 from "./cards2.svelte"
    import limit from "./limit.svelte"
    import feel from "./feel.svelte"
    import end from "./end.svelte"

    const slides = [
        title,
        doodle,
        def,
        feature,
        encode,
        cards1,
        cards2,
        limit,
        feel,
        end,
    ]
</script>

<SlideContainer>
    {#each slides as slide}
        <Slide>
            <svelte:component this={slide}/>
        </Slide>
    {/each}
</SlideContainer>