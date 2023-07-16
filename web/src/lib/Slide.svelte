<style>
    slide {
        height: calc(100vh - 8rem);
        display: flex;
        align-items: left;
        flex-direction: column;
        justify-content: flex-start;

        scroll-snap-align: start;
        overflow-y: scroll;

        padding: 4rem;
    }
</style>

<slide>
    <slot/>
</slide>