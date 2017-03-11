class Session{
	constructor(){
		console.log('Session created');

		$(function(){
			// create controller
			const controller = new Controller();
			// load youtube client
			function init(){
				gapi.client.setApiKey('AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg');
				gapi.client.load('youtube', 'v3', function(){
					console.log('ready');
				});
			}
			// random food trivia
			controller.getTrivia(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/trivia/random`);
			// recipe search
			$.when(
				$('.submitSearch').on('click', (e) => {
					e.preventDefault();
					let search = $('.searchRecipe').val();
					let url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=10&query=${search}&type=main+course'`;
					controller.getRecipes(url);
				}),

				$('.submitSearch').on('click', (e) => {
					e.preventDefault();
					controller.ytRequest(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg&part=snippet&q=${$('.searchRecipe').val()}`);
				})

			).then(function(){
				console.log('success');
			});
		});
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