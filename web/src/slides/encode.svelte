<script>
    import Card from "$lib/Card.svelte"
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
    span {
        font-family: "JetBrains Mono", monospace;
        background-color: rgb(215, 228, 238);
        border-radius: 0.5rem;
        padding: 0 0.5rem;
    }
</style>

<h2>부호화</h2>
<ul>
    <li>
        뼈대를 제외하고 시계 방향으로 진행하면서
    <li>
        교차점에서 시계방향으로 나오는 선은
        <span>(</span>,
    </li>
    <li>
        반시계방향으로 나오는 선은
        <span>)</span>
        으로 부호화한다.
    </li>
</ul>

<Center>
    <Card code="x-"/>
    <Card code="(x(-x))"/>
    <Card/>
</Center>