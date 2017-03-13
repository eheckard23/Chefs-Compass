class Model{
	constructor(){
		console.log('Model created');

	}

	static storeRecipe(recipeObj, recipeData){
		let recipeLS = [];
		recipeLS.push(recipeObj, recipeData);
		let str = JSON.stringify(recipeLS);
		localStorage.setItem('recipeLS', str);
	}

	static storeSimilarRecipe(recipes){
		let str = JSON.stringify(recipes);
		localStorage.setItem('similarLS', str);
		// View.displaySimilarRecipes();
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
		    url, // The URL to the API. You can get this in the API page of the API you intend to consume
		    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		    data: {}, // Additional parameters here
		    dataType: 'json',
		    success: function(data) {
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
			url, // The URL to the API. You can get this in the API page of the API you intend to consume
		   	type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		    data: {}, // Additional parameters here
		    dataType: 'json',
		    success: function(data) {
		  		const recipes = data.results;
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
		request.execute(response => {
			let videos = response.items;
			Controller.setVideos(videos);
		});
	}

	static recipePage(recipeObj, url){
		$.ajax({
			url,
			type: 'GET',
			data: {},
			dataType: 'json',
			success: function(data){
				// window.location.assign('../../recipe.html');
				let recipeData = { data: data};
				let recipeInfo = {
					src: recipeObj[0].currentSrc,
					id: recipeObj[0].alt,
					title: recipeObj[1].innerHTML,
					readyInMinutes: recipeObj[2].innerHTML,
				};
				Model.storeRecipe(recipeInfo, recipeData);
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
				this.similarRecipesArray = [];
				window.location.assign('../../recipe.html');
				for(let i=0;i<3;i++){
					this.similarRecipesArray.push(data[i]);
					this.similarRecipes = { data: this.similarRecipesArray };
				}
				Model.storeSimilarRecipe(this.similarRecipes);
			},
			error: function(err) { alert(err); },
				beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
			}
		});
	}

	static generateMealPlan(url){
		$.ajax({
			url,
			type: 'GET',
			data: {},
			dataType: 'json',
			success: function(data){
				console.log('model success');
				let mealPlan = data;
				Controller.setMealPlan(data);
			},
			error: function(err) { alert(err); },
				beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
			}
		});
	}


}