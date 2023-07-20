<script>
    import SlideContainer from "$lib/SlideContainer.svelte"
    import Slide from "$lib/Slide.svelte"

    import title from "./1_title.svelte"
    import doodle from "./2_doodle.svelte"
    import def from "./3_def.svelte"
    import feature from "./4_feature.svelte"
    import encode from "./5_encode.svelte"
    import cards1 from "./6_cards1.svelte"
    import cards2 from "./7_cards2.svelte"
    import limit from "./8_limit.svelte"
    import feel from "./9_feel.svelte"
    import end from "./10_end.svelte"
    import transform from "./11_transform.svelte"

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
        transform,
    ]
</script>

<SlideContainer>
    {#each slides as slide}
        <Slide>
            <svelte:component this={slide}/>
        </Slide>
    {/each}
</SlideContainer>