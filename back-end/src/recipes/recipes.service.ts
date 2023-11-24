import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { Repository } from 'typeorm';
import { RecipeDTO } from './DTOs/recipe.dto';
import { CreateRecipeDTO } from './DTOs/createRecipe.dto';
import { UpdateRecipeDTO } from './DTOs/updateRecipe.dto';
import { DTOToEntity } from './converters/dto.entities.converter';
import { entityToDTO } from './converters/entities.dto.converter';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private recipesRepository: Repository<RecipeEntity>,
  ) {}

  async getRecipes() {
    // Find and return all recipes
    return await this.recipesRepository.find().then((d) => d.map(entityToDTO));
  }

  async getRecipeById(recipe_id: number) {
    // Find and return a single recipe by its id
    const recipe = await this.recipesRepository.findOneBy({ id: recipe_id });

    // If recipe was not found for this id, throw an exception
    if (!recipe) throw new NotFoundException('Recipe not found');

    // Convert and return
    return entityToDTO(recipe);
  }

  async createRecipe(recipe: CreateRecipeDTO) {
    // Create a new recipe with the data passed in the body
    const entity = DTOToEntity(recipe);
    return await this.recipesRepository.save(entity).then(entityToDTO);
  }

  async deleteRecipe(recipe_id: number) {
    // Delete the recipe with the id passed
    const recipeToDelete = await this.recipesRepository.findOneBy({
      id: recipe_id,
    });

    // If recipe was not found for this id, throw an exception
    if (!recipeToDelete) throw new NotFoundException('Recipe not found');

    // Delete this recipe
    await this.recipesRepository.delete(recipe_id);
  }

  async updateRecipe(recipe_id: number, recipe: UpdateRecipeDTO) {
    // Update the recipe with the id passed
    const recipeToUpdate = await this.recipesRepository.findOneBy({
      id: recipe_id,
    });

    // If recipe was not found for this id, throw an exception
    if (!recipeToUpdate) throw new NotFoundException('Recipe not found');

    // Update this recipe with the data passed in the body
    await this.recipesRepository.update(recipe_id, DTOToEntity(recipe));

    // Return the updated recipe
    return this.getRecipeById(recipe_id);
  }
}
