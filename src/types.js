const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt
} = require('graphql');

// Define Query Type
queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {type: Movie},
    movies: {type: [Movie]}
  }
});

// Define Movie Type
movieType = new GraphQLObjectType({
    name: 'Movie',
    fields: {
       id: { type: GraphQLString },
       link: { type: GraphQLString },
       metascore: { type: GraphQLInt },
       poster: { type: GraphQLString },
       rating: { type: GraphQLFloat },
       synopsis: { type: GraphQLString },
       title: { type: GraphQLString },
       votes: { type: GraphQLFloat},
       year: { type: GraphQLInt },
       date:{type: GraphQLString},
       review:{type:GraphQLString}

    }
});

exports.movieType = movieType;
exports.queryType = queryType;
