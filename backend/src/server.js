import express from "express";
import { MongoClient, ReturnDocument, ServerApiVersion } from "mongodb";

const app = express();

app.use(express.json());

let db;

async function dbConnection() {
  const uri = "mongodb://127.0.0.1:27017";

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  db = client.db("react-site-db");
}

app.get("/api/recipes/:name", async (req, res) => {
  const { name } = req.params;
  const recipe = await db.collection("recipes").findOne({ name });
  res.json(recipe);
});

app.post("/api/recipes/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const updatedRecipe = await db.collection("recipes").findOneAndUpdate(
    {
      name,
    },
    { $inc: { upvotes: 1 } },
    {
      returnDocument: "after",
    }
  );

  res.json(updatedRecipe);
});

app.post("/api/recipes/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  const newComment = { postedBy, text };

  const updatedRecipe = await db.collection("recipes").findOneAndUpdate(
    { name },
    {
      $push: { comments: newComment },
    },
    {
      returnDocument: "after",
    }
  );

  res.json(updatedRecipe);
});

async function start() {
  await dbConnection();

  app.listen(8000, function () {
    console.log("Listening on port 8000");
  });
}

start();
