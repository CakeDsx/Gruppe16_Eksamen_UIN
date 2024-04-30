import {defineField, defineType} from 'sanity'

export const kategori = defineType({
  name: 'Kategori',
  title: 'Kategori',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
  ],
})