import Header from "./Header"
import Navbar from "./Navbar"

export default function Layout({children}){
    return(
        <div id="container">
            <Header/>
            <Navbar/>
            {children}
        </div>
    )
}