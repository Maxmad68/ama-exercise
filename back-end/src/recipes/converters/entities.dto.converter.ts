import { RecipeDTO } from '../DTOs/recipe.dto';

export function entityToDTO(recipe) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.split(','),
  } as RecipeDTO;
}
