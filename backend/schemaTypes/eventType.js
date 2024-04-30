import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'MovieCard',
  title: 'MovieCard',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
  ],
})