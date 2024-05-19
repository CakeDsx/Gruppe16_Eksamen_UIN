import React from "react"
import { Link, useLocation } from "react-router-dom"
import Title from "./Title"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'

export default function Navbar() {
    const location = useLocation()
    const userId = location.pathname.split("/")[2]

    return (
        <nav>
            <Title />
            <ul> 
                <li className="what-to-see">
                    <Link to={`/Home/${userId}`}>What to watch</Link>
                </li>
                <li>  
                    <Link to={`/Genres/${userId}`}>Genres</Link>
                </li>
                <li>
                    <Link to="/FrontPage"><FontAwesomeIcon icon={faUser} />Bruker</Link>
                </li>
            </ul>
        </nav>
    )
}
