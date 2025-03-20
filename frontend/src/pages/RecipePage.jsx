import { useParams } from "react-router-dom";
import recipes from "../recipe-content";

export default function RecipePage() {
  const { name } = useParams();
  const recipe = recipes.find((r) => r.name === name);

  return (
    <>
      <h1>{recipe.title}</h1>
      {recipe.content.map((step, index) => (
        <p key={index}>{step}</p>
      ))}
    </>
  );
}
