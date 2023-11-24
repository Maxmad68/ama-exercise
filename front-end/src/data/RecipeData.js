import axios from 'axios';

const BASE_URL = 'http://localhost:8080/v1/';

// Fonction pour obtenir toutes les recettes
export async function getRecipes() {
    try {
        const response = await axios.get(BASE_URL + 'recipes');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Fonction pour obtenir une recette par son ID
export async function getRecipeById(id) {
    try {
        const response = await axios.get(BASE_URL + `recipes/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// Fonction pour créer une nouvelle recette
export async function createRecipe(recipeData) {
    try {
        const response = await axios.post(BASE_URL + 'recipes', recipeData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// Fonction pour mettre à jour une recette existante
export async function updateRecipe(id, recipeData) {
    try {
        const response = await axios.put(BASE_URL + `recipes/${id}`, recipeData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// Fonction pour supprimer une recette par son ID
export async function deleteRecipe(id) {
    try {
        const response = await axios.delete(BASE_URL + `recipes/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
