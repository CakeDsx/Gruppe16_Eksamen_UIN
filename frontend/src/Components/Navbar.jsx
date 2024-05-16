import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { fetchAllMovies } from "../../sanity/services/movieServices"
import Title from "./Title"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-regular-svg-icons'

export default function Navbar({  }) {
    library.add(faUser)
    const [active, setActive] = useState()
    const [movieList, setMovieList] = useState(null)
    const { userId } = useParams()
   

    const getAllMovies = async () => {
        const data = await fetchAllMovies()
        setMovieList(data)
    }

    useEffect(() => {
        console.log(active)
        getAllMovies()
    }, [active])
 console.log(movieList)
 console.log("UserId:", userId);

    return (
        <>
            <nav>
                <Title />
                
                <ul> 
                    <li className="what-to-see">
                        <Link to={`/Home/${userId}`}>Hva skal jeg se?</Link>
                    </li>
                    
                    <li>  
                        <Link to={`/Genres/${userId}`}>Bla gjennom sjangere</Link>
                    </li>
                    
                    <li>
                        <Link to="/FrontPage"><FontAwesomeIcon icon={faUser} />Bruker</Link>
                    </li>
                    
                </ul>
                
            </nav>
            
        </>
        
    )
  
}
