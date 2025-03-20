import RecipesList from "../RecipesList";
import recipes from "../recipe-content";

export default function RecipesListPage() {
  return (
    <>
      <h1>Recipes</h1>
      <RecipesList recipes={recipes} />
    </>
  );
}
