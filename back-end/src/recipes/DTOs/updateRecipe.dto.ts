import { CreateRecipeDTO } from './createRecipe.dto';
import { PartialType } from '@nestjs/swagger';

// UpdateRecipeDTO is the same as CreateRecipeDTO, except that all fields are optional
// This is used for the PUT /recipes/:recipe_id route, where the user can update
export class UpdateRecipeDTO extends PartialType(CreateRecipeDTO) {}
