<script>
    import doodle1 from "$lib/assets/()xx.svg"
    import doodle2 from "$lib/assets/(xx).svg"
</script>

<style>
    div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
    }
    img {
        width: 20rem;
    }
</style>

<div>
    <img alt="()xx" src={doodle1}/>
    <img alt="(xx)" src={doodle2}/>    
</div>
