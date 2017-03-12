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
		console.table(recipes);
		// update view
		View.displayRecipes(recipes);
	}

	ytRequest(path){
		Model.ytSearch(path);
	}
	static setVideos(videos){
		console.table(videos);
		View.displayVideos(videos);
	}

	static getRecipePage(recipeObj, url){
		Model.recipePage(recipeObj, url);
	}

	// static setRecipePage(recipeObj, recipeData){
	// 	window.location.assign('../../recipe.html');
	// 	// store recipe in local storage
	// 	Model.storeRecipe(recipeObj, recipeData);
	// }

	mealPlanRequest(url){
		Model.generateMealPlan(url);
	}

	static setMealPlan(mealPlan){
		View.displayMealPlan(mealPlan);
	}



}