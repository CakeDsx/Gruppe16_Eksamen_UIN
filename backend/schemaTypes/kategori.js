export default {
    name: 'kategori',
    title: 'kategori',
    type: 'document',
    fields: [

      {
        
        name: 'Genre',
        title: 'Genre',
        type: 'string'
      },
    //   {
    //     name: "Movies",
    //     title: "Movie_Genres",
    //     type: "string"
    // },
    {
      name: "moviekat",
      title: "moviekat",
      type: "array",
      of: [{type: 'reference', to:{type: 'movie'}}]
    }
    ],
  }