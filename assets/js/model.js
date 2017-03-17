class Model{
	constructor(){
		console.log('Model created');

	}

	static storeRecipeObj(recipeObj){
		// store new object with values from recipeObj
		let recipeInfo = { 
			src: recipeObj[0].childNodes[0].currentSrc, 
			id: recipeObj[0].childNodes[0].alt, 
			title: recipeObj[1].innerHTML, 
			readyInMinutes: recipeObj[2].innerHTML
		};
		let str = JSON.stringify(recipeInfo);
		// set local storage
		localStorage.setItem('recipeInfo', str);
	}

	static storeMealObj(mealObj){
		// store new object with values from mealObj
		let mealInfo = { 
			src: mealObj[0].currentSrc, 
			id: mealObj[0].alt, 
			title: mealObj[1].innerHTML, 
			readyInMinutes: mealObj[2].innerHTML
		};
		let str = JSON.stringify(mealInfo);
		// set local storage
		localStorage.setItem('mealInfo', str);
	}

	static init(){
		// load client youtube
		console.log('test');
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
		console.log('test');

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
				for(let i=0;i<3;i++){
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

	static storeFavoriteRecipe(id, title, img, time){
		let favoriteRecipeArray = [];
		let favRecipe = { id, title, img, time };
		favoriteRecipeArray.push(favRecipe);
		let str = JSON.stringify(favoriteRecipeArray);
		localStorage.setItem('favRecipe', favoriteRecipeArray);
	}


}