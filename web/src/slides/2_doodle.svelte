<script>
    import Center from "$lib/Center.svelte"
    
    import doodle1 from "$lib/assets/()xx.svg"
    import doodle2 from "$lib/assets/(xx).svg"
</script>

<style>
    img {
        width: 20rem;
    }
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }
</style>

<div>
    <Center>
        <img alt="()xx" src={doodle1}/>
        <img alt="(xx)" src={doodle2}/>    
    </Center>
</div>
