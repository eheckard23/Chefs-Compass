class Session{
	constructor(){
		console.log('Session created');

		let searchValue = $('.searchRecipe').val();
		let recipeCount = 3;
		let recipeId = '';

		let urls = {
			triviaSearch: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/trivia/random`,
			ytSearch: `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg&part=snippet&maxResults=2&topicId=/m/02wbm&type=video&q=${searchValue}`,
			recipeSearch: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=${recipeCount}&query=recipes+using+${searchValue}&type=main+course'`,
			recipeInstruction: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeId}/analyzedInstructions`
		};

		$(function(){
			// create controller
			this.controller = new Controller();
			// load youtube client
			function init(){
				gapi.client.setApiKey('AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg');
				gapi.client.load('youtube', 'v3', function(){
					console.log('ready');
				});
			}
			// random food trivia
			this.controller.getTrivia(urls.triviaSearch);

			// random recipes
			this.controller.getRecipes(urls.recipeSearch);

			// recipe search
			// pass search value to recipe search and youtube search
			$.when(
				$('.submitSearch').on('click', (e) => {
					e.preventDefault();
					let searchValue = $('.searchRecipe').val();
					let recipeCount = 10;
					this.controller.getRecipes(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=${recipeCount}&query=${searchValue}&type=main+course'`);
				}),
				$('.submitSearch').on('click', (e) => {
					e.preventDefault();
					let searchValue = $('.searchRecipe').val();
					this.controller.ytRequest(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg&part=snippet&maxResults=2&topicId=/m/02wbm&q=recipes+with+${searchValue}`);
				})
			// once the requests are complete
			).then(function(){
				console.log('success');
			});

			// meal plan
			$('.dietSubmit').on('click', (e) => {
				e.preventDefault();
				// get form values
				let diet = $('.diet').val();
				let exclude = $('.exclude').val();
				let targetCalories = $('.targetCalories').val();
				let timeFrame = $('input[name="timeFrame"]:checked').val();
				// check for empty fields
				this.controller.mealPlanRequest(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate${diet != '' ? `?diet=${diet}` : ''}${exclude != '' ? `?exclude=${exclude}` : ''}${targetCalories != '' ? `?targetCalories=${targetCalories}` : ''}&timeFrame=${timeFrame}`);
			});

		});

	}

	static recipeLink(event){
		// get recipe img, title, ready time
		let recipeObj = $(event.target).parent()[0].childNodes;
		// get recipe id
		let recipeId = recipeObj[0].childNodes[0].alt;
		recipeId = recipeId.replace('/', '');
		console.log(recipeId);
		// pass to controller then store LS in model
		// store in LS
		Controller.storeRecipeObj(recipeObj);
		// redirect using hash
		if(window.location.href.indexOf('recipe') > -1){
			window.location.assign(`./recipe.html#${recipeId}`);
			window.location.reload();
		}else{
			window.location.assign(`./recipe.html#${recipeId}`);
		}

	}

	static mealLink(event){
		// get recipe img, title, ready time
		let mealObj = $(event.target).parent()[0].childNodes;
		let title = mealObj[1].innerHTML;
		// get meal id
		let mealId = mealObj[0].alt;
		mealId = mealId.replace('/', '');
		// pass to controller then store LS in model
		// store in LS
		Controller.storeMealObj(mealObj);
		// redirect using hash
		if(window.location.href.indexOf('recipe') > -1){
			window.location.assign(`./recipe.html#${mealId}`);
			window.location.reload();
		}else{
			window.location.assign(`./recipe.html#${mealId}`);
		}

	}

	static getInstructionsByHash(hash){
		// grab hash from view url
		// get analyzed instructions
		// send instructions to view
		Controller.getRecipeInstructions(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${hash}/analyzedInstructions`);
		// display similar recipes based on id
		Controller.getSimilarRecipes(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${hash}/similar`);
		// dispaly similar videos
	}

	static getInstance(){
		if(!Session._instance){
			Session._instance = new Session();
			return Session._instance;
		}else{
			throw 'Error';
		}
	}
}