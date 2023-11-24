import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeEntity } from './recipe.entity';
import { RecipeDTO } from './DTOs/recipe.dto';

const mockRecipeDTO = {
  id: 42,
  name: 'Recipe name',
  description: 'Recipe description',
  ingredients: ['ingredient 1', 'ingredient 2'],
  instruction: 'Recipe instruction',
} as RecipeDTO;

const mockRecipeEntity = {
  id: 42,
  name: 'Recipe name',
  description: 'Recipe description',
  ingredients: 'ingredient 1,ingredient 2',
  instruction: 'Recipe instruction',
} as RecipeEntity;

// -----

const mockRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe('RecipesService', () => {
  let service: RecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesService,
        {
          provide: getRepositoryToken(RecipeEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRecipes', () => {
    it('should return an array of recipes', async () => {
      mockRepository.find.mockResolvedValue([]);
      const result = await service.getRecipes();
      expect(result).toEqual([]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('getRecipeById', () => {
    it('should retrieve a recipe by id', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockRecipeEntity);

      const result = await service.getRecipeById(42);
      expect(result).toEqual(mockRecipeDTO);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 42 });
    });

    it('should throw an error if no recipe is found', async () => {
      mockRepository.findOneBy.mockResolvedValue(undefined);

      await expect(service.getRecipeById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createRecipe', () => {
    it('should create a recipe', async () => {
      mockRepository.save.mockResolvedValue(mockRecipeEntity);

      await service.createRecipe(mockRecipeDTO);
      expect(mockRepository.save).toHaveBeenCalledWith(mockRecipeEntity);
    });
  });

  describe('deleteRecipe', () => {
    it('should delete a recipe', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockRecipeEntity);
      mockRepository.delete.mockResolvedValue({});

      await service.deleteRecipe(42);
      expect(mockRepository.delete).toHaveBeenCalledWith(42);
    });

    it('should throw an error if no recipe is found', async () => {
      mockRepository.findOneBy.mockResolvedValue(undefined);

      await expect(service.deleteRecipe(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateRecipe', () => {
    it('should update a recipe', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockRecipeEntity);
      mockRepository.update.mockResolvedValue({});

      await service.updateRecipe(42, mockRecipeDTO);
      expect(mockRepository.update).toHaveBeenCalledWith(42, mockRecipeEntity);
    });

    it('should throw an error if no recipe is found', async () => {
      mockRepository.findOneBy.mockResolvedValue(undefined);

      await expect(service.updateRecipe(1, mockRecipeDTO)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
