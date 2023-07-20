<script>
    import { path } from "$lib"
    import Grid from "$lib/Grid.svelte"
    import Center from "$lib/Center.svelte"
</script>

<style>
    h2 {
        font-size: 5rem;
        margin: 0.5rem 0;
    }
    li {
        font-size: 3rem;
    }
</style>

<h2>특징</h2>
<ul>
    <li>
        각 교차점은 4개의 변과 연결됨
    </li>
    <li>
        → 좌표평면 위에 그리기 용이함
    </li>
</ul>

<Center>
    <Grid
        grid={path("x(-(--)x-)((--))-(-)")}
        color="black"
        style="
            width: 20rem;
            height: 20rem;
        "
    />
</Center>