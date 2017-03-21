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

	static getRecipes(url){
		// ajax
		Model.recipeSearch(url);
	}

	static getRecipeDO(recipe){

		// create new recipe DO with model data
		let recipeDO = new RecipeDO();
		recipeDO.id = recipe.id;
		recipeDO.title = recipe.title;
		recipeDO.image = recipe.image;
		recipeDO.readyInMinutes = recipe.readyInMinutes;
		// send back to model
		return recipeDO;

	}

	// get recipe array from model
	static sendRecipeArray(recipeArray){

		// pass array to view
		View.displayRecipes(recipeArray);

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
		Model.storeFavoriteRecipes(favRecipe);
	}



}