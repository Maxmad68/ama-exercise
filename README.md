# Exercice pour les Développeurs Back-End

Dans cet exercice, nous évaluerons vos compétences en tant que développeur back-end en utilisant Node.js. L'objectif principal est de créer un système CRUD (Create, Read, Update, Delete) pour gérer des recettes (Recipes) en utilisant une base de données (MySQL ou PostgreSQL) ou en stockant les données dans un fichier sur le serveur (au choix : JSON, XML, RAW, etc).

## Étape 1 : Création d'un CRUD fonctionnel avec Node.js

**Description :** Vous devez créer un système permettant de gérer des recettes. Chaque recette (Recipe) doit avoir les propriétés suivantes :
- name (string)
- description (string)
- ingredients (liste de chaînes de caractères)
- instruction (string)

**Exigences :**
1. Créez un serveur Node.js qui écoute sur un port de votre choix.
2. Mettez en place les routes suivantes pour effectuer les opérations CRUD sur les recettes :
    - Création d'une recette
    - Récupération de toutes les recettes
    - Récupération d'une recette par son identifiant
    - Mise à jour d'une recette
    - Suppression d'une recette

## Étape 2 : Test Algorithmique - Transformation de données

**Description :** Dans cette étape, vous devrez écrire un algorithme qui  utilise un fichier JSON (data.json) fourni avec l'exercice, le transforme en un autre format JSON, puis renvoie le résultat à travers une route accessible via le serveur. Vous pouvez nommer cette route "transformData", par exemple.

**Exigences :**
1. Créez une route "transformData" (GET) qui accepte une requête HTTP.
2. Lorsqu'un client accède à cette route, lisez le contenu du fichier "data.json" fourni (vous pouvez le stocker localement dans votre projet) et effectuez la transformation nécessaire sur les données.
3. Le résultat de la transformation doit être renvoyé en tant que réponse HTTP au client.

**Exemple de résultat attendu :** le fichier data.json a le format suivant :
```json
[
    {
        "name": "arthur",
        "date": "01/1899",
        "day": 11
    },
    {
        "name": "arthur",
        "date": "01/1999",
        "day": 2
    },
    {
        "name": "Joel",
        "date": "01/1999",
        "day": 12
    }
]
```
Lorsqu'un client accède à la route "transformData", le résultat renvoyé devrait être le suivant :

```json
[
  {
    "name": "arthur",
    "values": ["1899-01-11", "1999-01-02"]
  },
  {
    "name": "Joel",
    "values": ["1999-01-12"]
  }
]
```

Notes : Vous pouvez utiliser des bibliothèques ou des modules npm tiers si nécessaire.

## Étape 3 : Connexion du Front-End React.js au Back-End Node.js

**Objectif :** Connecter le front-end React.js au back-end Node.js fourni avec l'exercice et mettre en place les fonctionnalités CRUD pour la gestion des recettes.

1. **Configurer l'URL du Back-End :** Dans le fichier `/src/data/RecipeData.js` du React.js fourni avec l'exercice, configurez l'URL avec le port correspondant à votre serveur back-end.

2. **Mettre à jour les Requêtes HTTP (si besoin) :** Utilisez les requêtes fournies dans le fichier `/src/data/RecipeData.js` pour appeler votre serveur back-end.

3. **Adapter le Front-End (si besoin) :** Si nécessaire, adaptez votre front-end pour afficher les données correctement. Assurez-vous que votre front-end communique efficacement avec le back-end en fonction de l'API que vous avez créée.

4. **Test de l'Intégration :** Testez l'intégration complète entre votre front-end et votre back-end en exécutant l'application. Assurez-vous que toutes les fonctionnalités CRUD fonctionnent correctement. Pour lancer l'application React.js, utilisez la commande "npm run start" après l'installation des modules Node.js avec "npm install".
