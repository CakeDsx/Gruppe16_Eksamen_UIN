import Title from "./Title"
import Navbar from "./Navbar"
//import MovieCard from "./MovieCard"

export default function Layout({children}){
    return(
        <div id="container">
            <Title/>
            <Navbar/>
            
            {children}

        </div>
    )
}