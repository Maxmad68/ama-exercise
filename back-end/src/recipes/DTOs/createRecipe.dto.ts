import { OmitType } from '@nestjs/swagger';
import { RecipeDTO } from './recipe.dto';

// CreateRecipeDTO is the same as RecipeDTO, except that the id is omitted
// This is used for the POST /recipes route, where the id is not needed
export class CreateRecipeDTO extends OmitType(RecipeDTO, ['id']) {}
