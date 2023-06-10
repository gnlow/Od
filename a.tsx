export default (path: string) => <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2000"
    height="2000"
>   
    <g
        stroke="white"
        stroke-width="10px"
    >
        <path d={`
            M 1000 1000
            ${path}
        `}/>
        <path d="
            M 1000 1000
            m 0 -100
            h 500
        "/>
        <path d="
            M 1000 1000
            m 100 -200
            v 200
        "/>
        <path d="
            M 1000 1000
            m 400 -200
            v 200
        "/>
    </g>
</svg>