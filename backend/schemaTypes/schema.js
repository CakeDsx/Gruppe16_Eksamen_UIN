
import { schemaTypes } from "."
import kategori from "./kategori"
import movie from "./movie"
import Users from "./Users"


export default createSchema({

    name: "default",

    types: schemaTypes.concat({
        
        movie,
        kategori,
        Users,

        
    }),
})