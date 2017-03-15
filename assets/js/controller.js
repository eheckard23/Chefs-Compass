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

	getRecipes(url){
		// ajax
		Model.recipeSearch(url);
	}
	// ajax returns recipes
	static setRecipes(recipes){
		// update view
		View.displayRecipes(recipes);
	}

	ytRequest(path){
		Model.ytSearch(path);
	}
	static setVideos(videos){
		View.displayVideos(videos);
	}

	static storeRecipeObj(recipeObj){
		Model.storeRecipeObj(recipeObj);
	}

	static getRecipeInstructions(url){
		Model.recipeInstructions(url);
	}

	static storeMealObj(mealObj){
		Model.storeMealObj(mealObj);
	}

	static sendRecipeInstructions(recipeInstructions){
		View.displayRecipeInformation(recipeInstructions);
	}

	static getSimilarRecipes(url){
		Model.similarRecipes(url);
	}

	static sendSimilarRecipes(recipes){
		View.displaySimilarRecipes(recipes);
	}

	mealPlanRequest(url){
		Model.generateMealPlan(url);
	}

	static setMealPlan(mealPlan){
		View.displayMealPlan(mealPlan);
	}



}