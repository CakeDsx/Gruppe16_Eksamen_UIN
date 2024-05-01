import Header from "./Header"
import Navbar from "./Navbar"
import MovieCard from "./MovieCard"

export default function Layout({children}){
    return(
        <div id="container">
            <Header/>
            <Navbar/>
            
            {children}

        </div>
    )
}