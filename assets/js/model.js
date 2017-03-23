class Model{
	constructor(){
		console.log('Model created');
		
	}

	static storeFavoriteRecipes(favRecipe){

		// check if array has been made
		if(!localStorage.getItem('favRecipeArr')){

			// first recipe
			var favRecipeArr = [];
			favRecipeArr.push(favRecipe);

		}else{

			// array already exists
			// get / parse array push new recipe
			var favRecipeArr = JSON.parse(localStorage.getItem('favRecipeArr'));
			favRecipeArr.push(favRecipe);

		}

		let favRecipeLS = JSON.stringify(favRecipeArr);
		localStorage.setItem('favRecipeArr', favRecipeLS);


	}

	static init(){
		// load client youtube

		gapi.client.setApiKey('AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg');
		gapi.client.load('youtube', 'v3', function(){
			console.log('ready');
		});
	}

	static trivia(url){
		$.ajax({
		    url,
		    type: 'GET',
		    data: {},
		    dataType: 'json',
		    success: function(data) {
		    	// pass result to controller then view
		    	Controller.setTrivia(data);
		    },
		    error: function(err){
				window.location.href('./error.html');
			},
		    beforeSend: function(xhr) {
		    xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
		    }
		});
	}

	static recipeSearch(url){

		$.ajax({
			url,
		   	type: 'GET', 
		    data: {},
		    dataType: 'json',
		    success: function(data) {
		    	// store in new variable
		  		let recipes = data.results;
		  		this.recipeArray = [];
		  		// loop through data
		  		recipes.forEach(recipe => {
		  			let info = false;
		  			// create new recipe data object
		  			let recipeDO = Controller.getRecipeDO(recipe, false, 'day', '');
		  			// push recipe data object to array
		  			this.recipeArray.push(recipeDO);
		  		});
		  		// send recipe array to controller
		  		Controller.sendRecipeArray(this.recipeArray);
		    },
			error: function(err){
				window.location.href('./error.html');
			},
			beforeSend: function(xhr) {

				$('.loader').addClass('loading');

				xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
			},
			complete: function(){

				$('.loader').removeClass('loading');

			}
		});

	}

	static ytSearch(path){
		let request = gapi.client.request({
			path,
		});
		// use url path to execute the request
		request.execute(response => {
			let videos = response.items;
			// pass to controller then view
			Controller.setVideos(videos);
		});
	}

	static recipeInfo(url){
		$.ajax({
			url,
			type: 'GET',
			data: {},
			dataType: 'json',
			success: function(data){
				console.dir(data);

				// check if recipe is in favorite ls
				let favoriteArray = JSON.parse(localStorage.getItem('favRecipeArr'));

				if(favoriteArray == null){


				}else{

					// filter favorite recipes and return the recipe
					// with matching id
					this.isFavorite = favoriteArray.filter(recipe => {
						return recipe.id == data.id;
					});

					// check if array exists
					if(this.isFavorite.length > 0){

						// recipe is a favorite
						this.favorite = 'true';

					}

				}


				// get back id, title, image, readyInMinutes, vegan, gluten, weightWatcherSmartPoints
				// analyzedInstructons, extendedIngredients
				let recipePage = Controller.getRecipeDO(data, true, 'day', this.favorite);

				Controller.sendRecipeInfo(recipePage);
				
			},
			error: function(err){ 
				console.error(err);
				window.location.href('./error.html');
			},
			beforeSend: function(xhr) {

				$('.loader').addClass('loading');

				xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
			},
			complete: function(){

				$('.loader').removeClass('loading');

			}
		});
	}

	static similarRecipes(url){
		$.ajax({
			url,
			type: 'GET',
			data: {},
			dataType: 'json',
			success: function(data){
				let info = false;
				this.similarRecipes = [];
				// only grab 2 recipes
				for(let i=0;i<2;i++){
					// this.similarRecipes.push(data[i]);
					let similarRecipe = Controller.getRecipeDO(data[i], info, 'day', '');

					// push recipe do to array
					this.similarRecipes.push(similarRecipe);
				}
				// pass array to controller
				Controller.sendSimilarRecipes(this.similarRecipes);
			},
			error: function(err){
				window.location.href('./error.html');
			},
			beforeSend: function(xhr) {
			xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
			}
		});
	}

	static similarVideos(path){
		let request = gapi.client.request({
			path,
		});
		request.execute(response => {
			let videos = response.items;
			Controller.sendSimilarVideos(videos);
		});
	}

	static generateMealPlan(url){
		$.ajax({
			url,
			type: 'GET',
			data: {},
			dataType: 'json',
			success: function(data){

				let info = false;
				// array for meals
				this.mealArray = [];

				// check for day or week
				if(!('items' in data)){
					let timeFrame = 'day';
					// day
					data.meals.forEach(meal => {

						// create recipe DO
						let mealDO = Controller.getRecipeDO(meal, info, timeFrame, '');
						// push meal to array
						this.mealArray.push(mealDO);

					});

				}else{
					let timeFrame = 'week';
					// week
					data.items.forEach(meal => {

						// create recipe DO
						let mealDO = Controller.getRecipeDO(JSON.parse(meal.value), info, timeFrame, '');
						// push meal to array
						this.mealArray.push(mealDO);

					});

				}

				// send array to controller
				Controller.setMealPlan(this.mealArray);

			},
			error: function(err){
				window.location.href('./error.html');
			},
			beforeSend: function(xhr) {

				$('.loader').addClass('loading');

				xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
			},
			complete: function(){

				$('.loader').removeClass('loading');

			}
		});
	}


}