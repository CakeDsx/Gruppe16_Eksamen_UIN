// import Title from "./Title"
import Navbar from "./Navbar"
import React from "react"
//import MovieCard from "./MovieCard"

export default function Layout({children}){

    return(
        <>
        <header>
            <Navbar/> 
        </header>
       
        <main>

            {children}
        
        </main>
        </>
    )
}




   
