import { useEffect, useState } from "react"
import {Link} from "react-router-dom"

export default function MovieCard({movieinfo}){
    const [movie, setmovie] = useState({
        title: movieInfo.movieName,
    })

    return(
        <article className= "movieCard">
            <img src={movieInfo.image} alt={movieinfo.moviename} />
            <Link to={"/movies/" + movieInfo.catslug}>{movieInfo.catname}</Link>
            <h3>{movieInfo.moviename}</h3>
            <button onClick={favClick}>Add to favoritas</button>

        </article>

    )
}