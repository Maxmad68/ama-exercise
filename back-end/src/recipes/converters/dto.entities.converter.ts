import { RecipeEntity } from '../recipe.entity';

export function DTOToEntity(recipe) {
  const ent = {
    ...recipe,
  } as RecipeEntity;

  if (recipe.ingredients) {
    ent.ingredients = recipe.ingredients.join(',');
  }
  return ent;
}
