class Session{
	constructor(){
		console.log('Session created');

		let searchValue = $('.searchRecipe').val();
		let recipeCount = 3;
		let recipeId = '';

		let urls = {
			triviaSearch: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/trivia/random`,
			ytSearch: `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg&part=snippet&maxResults=2&topicId=/m/02wbm&q=${searchValue}`,
			recipeSearch: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=${recipeCount}&query=${searchValue}&type=main+course'`,
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
			// // random videos
			// controller.ytRequest(urls.recipeSearch);

			// recipe search

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
					this.controller.ytRequest(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg&part=snippet&maxResults=2&topicId=/m/02wbm&q=${searchValue}`);
				})

			).then(function(){
				console.log('success');
			});

			// meal plan
			$('.dietSubmit').on('click', (e) => {
				e.preventDefault();
				let diet = $('.diet').val();
				let exclude = $('.exclude').val();
				let targetCalories = $('.targetCalories').val();
				let timeFrame = $('input[name="timeFrame"]:checked').val();
				this.controller.mealPlanRequest(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate${diet != '' ? `?diet=${diet}` : ''}${exclude != '' ? `?exclude=${exclude}` : ''}${targetCalories != '' ? `?targetCalories=${targetCalories}` : ''}&timeFrame=${timeFrame}`);
			});

		});

	}

	static recipeLink(event){
		let recipeObj = $(event.target).parent()[0].childNodes;
		let recipeId = $(event.target).parent()[0].childNodes[0].alt;
		recipeId = recipeId.replace('/', '');
		Controller.getRecipePage(recipeObj, `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeId}/analyzedInstructions`);
		Controller.getSimilarRecipes(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeId}/similar`);
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