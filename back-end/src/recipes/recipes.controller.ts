import {
  Controller,
  Get,
  HttpStatus,
  Res,
  Request,
  Param,
  Post,
  Body,
  Delete,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RecipeDTO } from './DTOs/recipe.dto';
import { CreateRecipeDTO } from './DTOs/createRecipe.dto';
import { UpdateRecipeDTO } from './DTOs/updateRecipe.dto';

@Controller('v1/recipes')
@ApiTags('Recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get('/')
  // region Route
  @ApiOperation({
    summary: 'Get recipes',
    description: 'Get full list of all recipes',
  })
  @ApiOkResponse()
  async getRecipes(@Request() req, @Res() res) {
    res.status(HttpStatus.OK).send(await this.recipesService.getRecipes());
  }
  // endregion

  @Get('/:recipe_id')
  // region Route
  @ApiOperation({
    summary: 'Get single recipe',
    description: 'Get a single recipe by its id',
  })
  @ApiParam({
    name: 'recipe_id',
    required: true,
    description: 'Identifier of the recipe',
  })
  @ApiOkResponse({ type: RecipeDTO })
  @ApiNotFoundResponse({ description: 'No recipe was found for this id' })
  async getRecipe(
    @Request() req,
    @Res() res,
    @Param('recipe_id') recipe_id: number,
  ) {
    res
      .status(HttpStatus.OK)
      .send(await this.recipesService.getRecipeById(recipe_id));
  }
  // endregion

  @Post('/')
  // region Route
  @ApiOperation({
    summary: 'Create new recipe',
    description: 'Create new recipe',
  })
  @ApiCreatedResponse()
  @ApiBody({ type: CreateRecipeDTO })
  async newRecipe(@Request() req, @Res() res, @Body() recipe: CreateRecipeDTO) {
    res
      .status(HttpStatus.CREATED)
      .send(await this.recipesService.createRecipe(recipe));
  }
  // endregion

  @Delete('/:recipe_id')
  // region Route
  @ApiOperation({
    summary: 'Delete recipe ',
    description: 'Delete a recipe by its id',
  })
  @ApiParam({
    name: 'recipe_id',
    required: true,
    description: 'Identifier of the recipe',
  })
  @ApiNoContentResponse({ description: 'Recipe was deleted' })
  @ApiNotFoundResponse({ description: 'No recipe was found for this id' })
  async deleteRecipe(
    @Request() req,
    @Res() res,
    @Param('recipe_id') recipe_id: number,
  ) {
    res
      .status(HttpStatus.NO_CONTENT)
      .send(await this.recipesService.deleteRecipe(recipe_id));
  }
  // endregion

  @Put('/:recipe_id')
  // region Route
  @ApiOperation({
    summary: 'Update recipe',
  })
  @ApiBody({ type: UpdateRecipeDTO })
  @ApiParam({
    name: 'recipe_id',
    required: true,
    description: 'Identifier of the recipe',
  })
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'No recipe was found for this id' })
  async update(
    @Request() req,
    @Res() res,
    @Param('recipe_id') recipe_id,
    @Body() recipe: UpdateRecipeDTO,
  ) {
    res
      .status(HttpStatus.OK)
      .send(await this.recipesService.updateRecipe(recipe_id, recipe));
  }
  // endregion
}
