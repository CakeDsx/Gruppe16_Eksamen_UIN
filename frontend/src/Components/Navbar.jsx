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
    const [users, setUsers] = useState([])

   

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
                        {/* <Link to={`/Home/${userId}`}>Hva skal jeg se?</Link> */}
                        <Link to href={`http://localhost:5173/Home/${userId}/`} target="_blank" rel="noopener noreferrer"> what to watch </Link>

                    </li>
                    
                    <li>  
                        {/* <Link to={`/Genres/${userId}`}>Bla gjennom sjangere</Link> */}
                       <Link to href={`http://localhost:5173/Genres/${userId}/`} target="_blank" rel="noopener noreferrer"> Genres </Link>

                    </li>
                    
                    <li>
                        <Link to="/FrontPage"><FontAwesomeIcon icon={faUser} />Bruker</Link>
                    </li>
                    
                </ul>
                
            </nav>
            
        </>
        
    )
  
}
