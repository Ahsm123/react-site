import express from "express";

const recipeInfo = [
  { name: "scrambled_eggs", upvotes: 0, comments: [] },
  { name: "grilled_cheese", upvotes: 0, comments: [] },
];

const app = express();

app.use(express.json());

app.post("/api/recipes/:name/upvote", (req, res) => {
  const recipe = recipeInfo.find((r) => r.name === req.params.name);
  recipe.upvotes += 1;

  res.json(recipe);
});

app.post("/api/recipes/:name/comments", (req, res) => {
  const { name } = req.params.name;
  const { postedBy, text } = req.body;

  const recipe = recipeInfo.find((r) => r.name === req.params.name);

  recipe.comments.push({
    postedBy,
    text,
  });

  res.json(recipe);
});

app.listen(8000, function () {
  console.log("Listening on port 8000");
});
