class Session{
	constructor(){
		// localStorage.clear();
		console.log('Session created');

		$('input[name="search"]').focus();

		$(window).on('hashchange', () => {
			window.location.reload();
		});

		if(window.location.href == 'http://localhost:8888/recipe.html'){
			window.location.href = './404.html';
		}

		let searchValue = $('.searchRecipe').val();
		let recipeCount = 6;
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

			console.log(window.location.href);
			if(window.location.href == "http://localhost:8888/recipe.html"){
				window.location.assign('./404.html');
			}

			// random food trivia
			this.controller.getTrivia(urls.triviaSearch);

			// random recipes
			this.controller.getRecipes(urls.recipeSearch);

			// remove loading div

			// recipe search
			// pass search value to recipe search and youtube search
			$.when(
				$('.submitSearch').on('click', (e) => {
					e.preventDefault();
					let searchValue = $('.searchRecipe').val();
					let recipeCount = 10;
					this.controller.getRecipes(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=${recipeCount}&query=${searchValue}&type=main+course'`);
					searchValue = '';
					navSearch = '';
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
				// clear out html
				$('.mealPlanSchedule').html('');
				// get form values
				let diet = $('.diet').val();
				let exclude = $('.exclude').val();
				let targetCalories = $('.targetCalories').val();
				let timeFrame = $('input[name="timeFrame"]:checked').val();
				// check for empty fields
				this.controller.mealPlanRequest(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate${diet != 'Normal' ? `?diet=${diet}` : ''}${exclude != '' ? `?exclude=${exclude}` : ''}${targetCalories != '' ? `?targetCalories=${targetCalories}` : ''}&timeFrame=${timeFrame}`);
			});

		});

	}

	static getInstructionsByHash(hash){
		// grab hash from view url
		Controller.getRecipeInfo(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${hash}/information`);
		// get analyzed instructions
		// send instructions to view
		Controller.getRecipeInstructions(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${hash}/analyzedInstructions`);
		// display similar recipes based on id
		Controller.getSimilarRecipes(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${hash}/similar`);
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