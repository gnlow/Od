<script>
    import Card from "$lib/Card.svelte"
    import { tweened } from "svelte/motion"
    import { sineInOut } from "svelte/easing"

    const code = tweened("", {
        duration: 2000,
        easing: sineInOut,
        interpolate: (a, b) => t => {
            const i = Math.round(t * a.length)
            const j = Math.round(t * b.length)
            return a.slice(0,a.length-i) + b.slice(0,j)
        },
    })

    const codes = [
        "(-)(-)x(--)",
        "x(-(--)x-)((--))-(-)",
        "(-)(-)-(--)x(--)x(-(-)-(--))",
        "(-)x(--()-()-)x-",
        "x(--)(-)x(--()-)"
    ]

    setInterval(
        () => {
            console.log($code)
            if ($code == "") {
                code.set(codes[Math.floor(Math.random() * codes.length)])
            } else {
                code.set("")
            }
        },
        3000
    )
</script>

<style>
    h2 {
        font-size: 5rem;
        margin: 0.5rem 0;
    }
</style>

<h2>끝</h2>

<Card code={$code}/>