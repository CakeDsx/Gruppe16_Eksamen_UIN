import React from "react"
import { Link, useLocation } from "react-router-dom"
import Title from "./Title"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'

export default function Navbar() {
    const location = useLocation()
    const userId = location.pathname.split("/")[2] //Keeps the userid that is in the URL and continues to go to different sides, but reamining on the same user.
    //it copies the path and splits it in to an array and then pulls only the userid
    // this is where we got help from "https://stackoverflow.com/questions/6888783/split-path-name-to-get-routing-parameter"
    return (
        <nav>
            <Title />
            <ul> 
                <li className="what-to-see">
                    <Link to={`/Home/${userId}`}>What to watch</Link> 
                    {/* connects the home button to be set as the user Id that has been picked when entering in with the frontpage */}
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
