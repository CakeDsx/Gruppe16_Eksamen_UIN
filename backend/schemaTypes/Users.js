export default {
  name: 'Users',
  title: 'Users',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: Rule => Rule.required().unique(),
      hidden: true // Hide this field from the CMS
    },
    {
      name: 'users',
      title: 'User_Names',
      type: 'string'
    },
    {
      name: "mainImage",
      title: "Main_image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "url",
      title: "Url",
      type: "string",
    },
    {
      name: "favoriteMovies",
      title: "FavoriteMovies",
      type: "array",
      of: [{type: 'reference', to:{type: 'movie'}}]
      
    },
    {
      name: "favorittKategori",
      title: "FavoriteGenres",
      type: "array",
      of: [{type: 'reference', to:{type: 'kategori'}}]
    },
  ],
};
