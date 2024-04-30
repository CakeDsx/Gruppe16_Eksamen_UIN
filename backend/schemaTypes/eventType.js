import { defineType} from 'sanity'

export const eventType = defineType({
  name: 'moviecard',
  title: 'moviecard',
  type: 'document',
  fields: [
    ({
      name: 'name',
      type: 'string',
    }),
    {
      name: "mengde",
      title: "mengde/antall",
      type: "string"
  }
  ],
})