import React from 'react'
//import MovieCard from "./MovieCard"
import Home from './Home'

const SearchResults = ({searchResults}) => {
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
export default SearchResults