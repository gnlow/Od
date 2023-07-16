<style>
    slide {
        height: 100vh;
        display: flex;
        align-items: left;
        flex-direction: column;
        justify-content: safe center;

        scroll-snap-align: start;
        overflow-y: scroll;

        padding: 2rem;
    }
</style>

<slide>
    <slot/>
</slide>