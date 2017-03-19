class Controller{
	constructor(){
		console.log('Controller created');
		// load client youtube
		Controller.model = new Model();
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

	static getRecipeInfo(url){
		Model.recipeInfo(url);
	}

	static sendRecipeInfo(data){
		View.displayRecipeInfo(data);
	}

	static getRecipeInstructions(url){
		Model.recipeInstructions(url);
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

	static similarVideos(path){
		Model.similarVideos(path);
	}

	static sendSimilarVideos(videos){
		View.displaySimilarVideos(videos);
	}

	mealPlanRequest(url){
		Model.generateMealPlan(url);
	}

	static setMealPlan(mealPlan){
		View.displayMealPlan(mealPlan);
	}

	static addFavoriteRecipe(){
		let id = $('.favorites').attr('data-id');
		let title = $('.favorites').attr('data-recipe');
		let img = $('.favorites').attr('data-img');
		let time = $('.favorites').attr('data-time');
		let favRecipe = { id, title, img, time };
		// Controller.favRecipeArray.push(favRecipe);
		// console.log(Controller.favRecipeArray);
		Controller.model.storeFavoriteRecipes(favRecipe);
	}



}