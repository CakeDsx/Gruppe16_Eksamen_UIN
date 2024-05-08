export default {
  name: 'Movies',
  title: 'Movies',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'MovieTitle',
      type: 'string'
    },
    {
      name: "User_favorited",
      title: "favorisert",
      type: "string"
  },
  {
    name: "Genre",
    title: "Movie_Genre",
    type: "string"
}
  ],
}