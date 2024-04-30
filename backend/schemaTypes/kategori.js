import {defineField, defineType} from 'sanity'

export const kategori = defineType({
  name: 'kategori',
  title: 'kategori',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: "kategorinavn"
    }),
  ],
})