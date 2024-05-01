import { useState } from "react"


export default function Header(){
    const [toggle, setToggle] = useState(false)

    const favClick = () =>{
        setToggle(!toggle)
        console.log(toggle)
    }

    return(
        <header>
            <button id="favtoggle" onClick={favClick}>
            </button>
        </header>
    )
}