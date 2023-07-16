<style>
    slide {
        height: 100vh;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: safe center;

        scroll-snap-align: start;
        overflow-y: scroll;

        padding: 1rem;
    }
</style>

<slide>
    <slot/>
</slide>