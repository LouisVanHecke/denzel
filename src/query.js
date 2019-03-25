const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean
} = require('graphql');

const fetch = require('node-fetch')

const movieType = require('types.js').movieType;

//Define the Query
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {

        random: {
          type: movieType,
          resolve: async function() {
            const res = await collection.find({metascore:{$gte:70}}).toArray();
            var random = Math.floor(Math.random() * Math.floor(res.length));
            return res[random];type: movieType,
            }
        },

        populate:{
          type: GraphQLInt,
          resolve: function() {
            return fetch('http://localhost:9292/movies/populate')
            .then(res => res.json())
            .then(json => json.total)
          }
        },

        spec: {
          type: movieType,
          args: {
            id: { type: GraphQLString },
          },
          resolve: async function(source,args) {
            return fetch(http:'localhost:9292/movies/${args.id}')
            .then(res => res.json())
          }
        },

        search: {
          type: GraphQLList(movieType),
          args: {
            limit: { type: GraphQLInt },
            metascore: {type: GraphQLInt}
          },
          resolve: async function(source,args) {
            const res = await fetch(http:'localhost:9292/movies/search?limit=${args.limit}&metascore=${args.metascore}')
            const finalResult = await res.json();
            return finalResult.results;
          }
        },

        save: {
          type: GraphQLString,
          args: {
            id: { type: GraphQLString },
            date: {type: GraphQLString},
            review: {type: GraphQLString}
          },
          resolve : async function(source,args){
            collection.updateOne({ "id": args.id },{$set : {"date": args.date , "review": args.review}}, (error, result) => {
                  if(error) {
                      return response.status(500).send(error);
                  }
              });
              return updateOK for ${args.id};

            }
        }


    }
});

exports.queryType = queryType;
