import createSchema from 'part:@sanity/base/schema-creator'

import schemaTypes from 'all:part:@sanity/base/schema-type'
import { kategori } from './kategori'

export default createSchema({
    name: 'kategori',
    types: schemaTypes.concat([
        kategori
    ]),
})