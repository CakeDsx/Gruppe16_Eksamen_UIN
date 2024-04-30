import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'moviecard',
  title: 'moviecard',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
  ],
})