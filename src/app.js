const Express = require("express");
//const Dotenv = require("dotenv").config;
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const imdb = require('./imdb');
const DENZEL_IMDB_ID = 'nm0000243';


const CONNECTION_URL = "mongodb+srv://admin_louis:5wvpdhsk@testcluster-xvy5m.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "denzel";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(9292, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("movies");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post("/movies", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/denzel", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/movies/populate", async (request, response) => {
    const movies = await imdb(DENZEL_IMDB_ID);
    collection.insert(movies, (error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result.result);
  });
});

app.get("/movies", async (request, response) => {

    collection.find({metascore:{$gte:70}}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        const index = Math.floor(Math.random() * Math.floor(result.length));
        result = result[index];
        response.send(result);
    });
});

app.get("/movies/search", (request, response) => {
  const targetMetascore = +request.query.metascore;
  const targetLimit = +request.query.limit;
  collection.find({
    metascore : {$gte : targetMetascore}
  }).limit(targetLimit).sort({metascore : -1}).toArray((error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
  });
})

app.get("/movies/:id", (request, response) => {

    collection.findOne({"id": request.params.id}, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post("/movies/:id", (request, response) => {
    var review = request.body.review;
    var date = request.body.date;

    collection.update({"id": request.params.id},{ $set:
      {
        "review": review,
        "date": date
      }
    },(error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    } );
});
