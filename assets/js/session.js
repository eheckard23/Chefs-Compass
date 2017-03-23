class Session{
	constructor(){

		console.log('Session created');

		$('input[name="search"]').focus();

		// reload recipe page
		$(window).on('hashchange', () => {
			window.location.reload();
		});

		// redirect to 404 page
		if(window.location.pathname.includes("recipe") && (!window.location.hash || window.location.hash == "#")){
			window.location.href = './404.html';
		}

		let searchValue = $('.searchRecipe').val();
		let recipeCount = 6;
		let recipeId = '';


		// request urls
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

			// 404 page
			if(window.location.href == "https://localhost:8888/recipe.html"){
				window.location.assign('./404.html');
			}

			// random food trivia
			this.controller.getTrivia(urls.triviaSearch);

			// loading animation
			$('.loader').addClass('loading');

			// random recipes
			Controller.getRecipes(urls.recipeSearch);


			// recipe search
			// pass search value to recipe search and youtube search
			$.when(
				$('.submitSearch').on('click', (e) => {
					// add loading animation
						
					$('.loader').addClass('loading');

					e.preventDefault();
					let searchValue = $('.searchRecipe').val();
					let recipeCount = 10;
					Controller.getRecipes(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=${recipeCount}&query=${searchValue}&type=main+course'`);
					searchValue = '';

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
				// remove form
				$('.dietForm').addClass('removeForm');

				// move schedule up
				$('.mealPlanSchedule').addClass('presentSchedule');
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

	static addSpinner(){

		$('.loader').addClass('loading');
	}

	static removeSpinner(){

		$('.loader').removeClass('loading');

	}

	static getInstructionsByHash(hash){
		
		// grab hash from view url
		Controller.getRecipeInfo(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${hash}/information`);
		
		// display similar recipes based on id
		Controller.getSimilarRecipes(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${hash}/similar`);
		console.log('1');
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