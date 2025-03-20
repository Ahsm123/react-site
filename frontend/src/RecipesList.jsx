import { Link } from "react-router-dom";

export default function RecipesList({ recipes }) {
  return (
    <>
      {recipes.map((r) => (
        <Link key={r.name} to={"/recipes/" + r.name}>
          <h3>{r.title}</h3>
        </Link>
      ))}
    </>
  );
}
