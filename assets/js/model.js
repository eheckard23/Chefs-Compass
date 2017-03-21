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
		    error: function(err) { alert(err); },
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
		  		const recipes = data.results;
		  		// pass to controller then view
		  		Controller.setRecipes(recipes);
		    },
			error: function(err) { alert(err); },
				beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
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
				// pass to controller then view
				Controller.sendRecipeInfo(data);
			},
			error: function(err) { alert(err); },
				beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
			}
		});
	}

	static recipeInstructions(url){
		$.ajax({
			url,
			type: 'GET',
			data: {},
			dataType: 'json',
			success: function(data){
				// pass to controller then view
				Controller.sendRecipeInstructions(data);
			},
			error: function(err) { alert(err); },
				beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
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
				this.similarRecipes = [];
				// only grab 3 recipes
				for(let i=0;i<2;i++){
					this.similarRecipes.push(data[i]);
				}
				// pass to controller then view
				Controller.sendSimilarRecipes(this.similarRecipes);
			},
			error: function(err) { alert(err); },
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
				let mealPlan = data;
				// pass to controller then view
				Controller.setMealPlan(data);
			},
			error: function(err) { alert(err); },
				beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
			}
		});
	}


}