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
}