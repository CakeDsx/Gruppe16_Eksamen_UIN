// import createSchema from 'part:@sanity/base/schema-creator'
// import schemaTypes from 'all:part:@sanity/base/schema-type'
// import kategori from './kategori'
// import eventType from './eventType'

import { schemaTypes } from "."
import kategori from "./kategori"
import movie from "./movie"
import Users from "./Users"

// export default createSchema({
//     name: 'default',
//     types: schemaTypes.concat([
//         eventType, kategori
//     ]),
// })

export default createSchema({

    name: "default",

    types: schemaTypes.concat({
        
        movie,
        kategori,
        Users,

        
    }),
})