$(function(){

	function googleApiClientReady(){
		gapi.client.setApiKey('AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg');
		gapi.client.load('youtube', 'v3', function(){
			console.log('ready');
		});
	}

	$('.ytSubmit').on('click', (e) => {
		e.preventDefault();
		let q = $('.ytSearch').val();
		let request = gapi.client.youtube.search.list({
			q,
			part: 'snippet'
		});

		request.execute(response => {
		console.log(response)
		});
	});

	

		let url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/trivia/random`;
		$.ajax({
		    url, // The URL to the API. You can get this in the API page of the API you intend to consume
		    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		    data: {}, // Additional parameters here
		    dataType: 'json',
		    success: function(data) {
		    	$('.trivia').append(`<h3>${data.text}</h3>`);
		    },
		    error: function(err) { alert(err); },
		    beforeSend: function(xhr) {
		    xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
		    }
		});

	$('.submitSearch').on('click', (e) => {
		e.preventDefault();
		let search = $('.searchRecipe').val();
		let url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=10&query=${search}&type=main+course'`;
		$.ajax({
		    url, // The URL to the API. You can get this in the API page of the API you intend to consume
		    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		    data: {}, // Additional parameters here
		    dataType: 'json',
		    success: function(data) {
		    	const recipes = data.results;
		    	recipes.forEach((recipe) => {
		    		$('.results').append(
		    			'<article class="recipe">'
		    			+ `<img src="https://spoonacular.com/recipeImages/${recipe.image}"/>`
		    			+ `<h3>${recipe.title}</h3>`
		    			+ `<p>Cook Time: ${recipe.readyInMinutes} minutes</p>`
		    			+ `<button>Get Recipe</button>`
		    			+ '</article>'
		    			);
		    	});
		    	console.table((data.results)); 
		    },
		    error: function(err) { alert(err); },
		    beforeSend: function(xhr) {
		    xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
		    }
		});

	});

	$('.dietSubmit').on('click', (e) => {
		e.preventDefault();
		let url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate`;
		$.ajax({
			url,
			type: 'GET',
			data: {},
			dataType: 'json',
			success: function(data){
				console.table(data.items);
			},
			error: function(err){ alert(err); },
			beforeSend: function(xhr) {
		    xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
		    }
		})
	});

});









