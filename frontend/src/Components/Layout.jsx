import Title from "./Title"
import Navbar from "./Navbar"
import Home from "./Search"
import React, { useState, useEffect } from "react"
//import MovieCard from "./MovieCard"

export default function Layout({children}){
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResultsState, setSearchResultsState] = useState([])
    const [query, setQuery] = useState("")

     // query ble inspirert av det som ble gjort til timen under rick and morty oppgavene https://github.com/toremake/UIN2024_coursebase/blob/main/Category_blogg/src/App.jsx
     const fetchData = async (query) => {
        try{
            const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/'${query}'`)
            const data = await response.json()
            setSearchResultsState(data.docs)
        } catch (error){
            // console.error("Det har skjedd en feil", error)
        }
    }

    useEffect(() => {
        if (query) {
            fetchData(query)
        }
    }, [query])

    const handleSearch = () => {
        if (searchTerm.length >= 3) {
            setQuery(searchTerm)
            // gjør sånn at det må være mer enn 3 tegn/bokstaver i feltet før den søker
        }
    }
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return(
        <>
        <header>
        <Title/>
            <h1>Movie Search</h1>
            <Navbar/>
            <nav>
            <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Skriv minst tre tegn"/>
            <button onClick={handleSearch}>Søk</button>
        </nav>
          
        </header>
       
        <main>
             <Home />

            {children}
        
        </main>
        </>
    )
}




   
