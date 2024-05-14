export default {
    name: 'Users',
    title: 'Users',
    type: 'document',
    fields: [
      {
        name: 'Users',
        title: 'User_Names',
        type: 'string'
      },
      {
        name: "FavoriteMovies",
        title: "FavoriteMovies",
        type: "array",
        of: [{type: 'reference', to:{type: 'movie'}}]
    },
    {
        name: "FavorittKategori",
        title: "FavoriteGenres",
        type: "array",
        of: [{type: 'reference', to:{type: 'kategori'}}]
    },
  ],
   
  }