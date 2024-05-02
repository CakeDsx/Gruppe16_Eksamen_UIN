import React from "react"

function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <img src={movie.image} alt={movie.movietitle} />
            <h3>{movie.movietitle}</h3>
        </div>
    )
}

export default MovieCard
