import { useState } from "react"
import { writeClient } from "../../sanity/services/client"

export default function AddMovie() {
    const [title, setTitle] = useState("")

    function saveMovie(event) {
        event.preventDefault()
        console.log(title)
        writeClient.create({
            _type: "movie",
            title: title
        }).then((document) => {setTitle(""), console.log("Try savign to sanity ", document._id)}).catch((error) => {console.log("Noe gikk galt ", error.massage)})
    }
    return (
        <>
            <h1>Favorite a movie</h1>
            <form>
                <p>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" onChange={(event) => {setTitle(event.target.value)}} value={title} type="text"/>
                </p>
                <button onClick={saveMovie}>Save to favoritas</button>
            </form>
        </>
    )
}

// import { useEffect, useState } from "react"
// import { useParams } from "react-router"
// import { writeClient } from "../utils/sanity/client"

// export default function Show() {

//     const {id} = useParams()
//     const [movie, setMovie] = useState(null)

//     async function getMovie(id) {
//         const data = await fetchAllMovies(id)
//         setMovie(data[0])
//     }

//     useEffect(() => {
//         getMovie(id)
//     }, [id])

//     // function saveMovie(event) {
//     //     event.preventDefault()
//     //     const name = document.getElementById("name").value
//     //     const rating = document.getElementById("rating").value
//     //     const comment = document.getElementById("comment").value
//     //     const reviewObject = {
//     //         _type: "review",
//     //         name: name,
//     //         rating: Number(rating),
//     //         comment: comment
//     //     }

//     //     writeClient.patch(id).setIfMissing({reviews: []})
//     //     .append('reviews', [reviewObject]).commit().then(() => {console.log("Vurdering lagret")}).catch((error) => console.log("NOe er feil: ", error.massage))

//     //     console.log(reviewObject)
//     // }

//     return (
//         <article>
//             <h2>{movie?.title}</h2>
//             {/* <ul> */}
//         {/* {movie?.reviews?.map((r,i) => <li key={i}><p>{r.name} | Vurdering: {r.rating}</p>
//         {r.comment ? <p>{r.comment}</p> : null}</li>)}
//             </ul>
//             <hr />

//             <form>
//                 <p>
//                     <lable htmlFor="name">Navn</lable>
//                     <input type="text" name="name" id="naem"></input>
//                 </p>
//                 <p>
//                     <label htmlFor="rating">Vurdering</label>
//                     <select >
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                     </select>
//                 </p>
//                 <p>
//                     <label htmlFor="comment">Kommentar</label>
//                     <textarea name="comment"></textarea>
//                 </p> */}
//                 {/* <button onClick={}></button>
//             </form> */}
//         </article>
//     )
// }


// // import { useEffect, useState } from "react"
// // import {Link} from "react-router-dom"

// // export default function MovieCard({movieInfo}){
// //     const [movie, setmovie] = useState({
// //         title: movieInfo.movieName,

        
// //     })

    

// //     return(
// //         <article className= "movieCard">
// //             <img src={movieInfo.image} alt={movieInfo.moviename} />
// //             <Link to={"/movies/" + movieInfo.movieslug}>{movieInfo.moviename}</Link>
// //             <h3>{movieInfo.moviename}</h3>
// //             <button onClick={favClick}>Add to favoritas</button>

// //         </article>

// //     )
// // }