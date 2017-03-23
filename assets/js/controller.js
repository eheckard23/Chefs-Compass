class Controller{
	constructor(){
		console.log('Controller created');
		// load client youtube

	}
	getTrivia(url){
		Model.trivia(url);
	}
	static setTrivia(fact){
		View.displayFact(fact);
	}

	// ------------------- recipe data objects -----------
	static getRecipes(url){
		// ajax
		Model.recipeSearch(url);
	}

	// get recipe array from model
	static sendRecipeArray(recipeArray){

		// pass array to view
		View.displayRecipes(recipeArray);

	}

	static getRecipeInfo(url){
		// creates a new data object for recipe page
		Model.recipeInfo(url);
	}

	static sendRecipeInfo(recipeDO){
		// pass data object to view
		View.displayRecipeInfo(recipeDO);
	}

	static getSimilarRecipes(url){
		Model.similarRecipes(url);
	}

	static sendSimilarRecipes(similarRecipesArray){
		// pass array to view
		View.displaySimilarRecipes(similarRecipesArray);
	}

	static getRecipeDO(recipe, info, timeFrame, favorite){
		// create new recipe DO with model data
		let recipeDO = new RecipeDO();
		recipeDO.id = recipe.id;
		recipeDO.title = recipe.title;
		recipeDO.image = recipe.image;
		recipeDO.readyInMinutes = recipe.readyInMinutes;
		recipeDO.info = info;
		recipeDO.timeFrame = timeFrame;
		recipeDO.favorite = favorite;

		// recipe page information
		if(recipeDO.info != false){
			// data only attached if recipe page data is requested
			recipeDO.servings = recipe.servings;
			recipeDO.vegan = recipe.vegan;
			recipeDO.glutenFree = recipe.glutenFree;
			recipeDO.weightWatcherSmartPoints = recipe.weightWatcherSmartPoints;
			recipeDO.steps = recipe.analyzedInstructions[0].steps;
			recipeDO.ingredients = recipe.extendedIngredients;

		}

		// send back to model
		return recipeDO;

	}

	ytRequest(path){
		Model.ytSearch(path);
	}
	static setVideos(videos){
		View.displayVideos(videos);
	}



	static similarVideos(path){
		Model.similarVideos(path);
	}

	static sendSimilarVideos(videos){
		View.displaySimilarVideos(videos);
	}

	mealPlanRequest(url){
		Model.generateMealPlan(url);
	}

	// get meal plan array from model
	static setMealPlan(mealPlanArray){
		// pass array to view
		View.displayMealPlan(mealPlanArray);
	}

	static addFavoriteRecipe(){

		let id = $('.favorites').attr('data-id');
		let title = $('.favorites').attr('data-recipe');
		let img = $('.favorites').attr('data-img');
		let time = $('.favorites').attr('data-time');
		let favRecipe = { id, title, img, time };

		Model.storeFavoriteRecipes(favRecipe);
	}



}