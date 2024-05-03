import React from 'react'
//import MovieCard from "./MovieCard"
import Home from './Home'

export default function SearchResults(){

const searchResults = () => {

    return(
       
        <div>
            {searchResults.map((result, index) =>(
                <div key={index}>
                    <Home movie={result} />
                    </div>
            ))}
        </div>
    )
}
}