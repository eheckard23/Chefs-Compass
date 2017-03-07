$(function(){

		let url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/trivia/random`;
		$.ajax({
		    url, // The URL to the API. You can get this in the API page of the API you intend to consume
		    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		    data: {}, // Additional parameters here
		    dataType: 'json',
		    success: function(data) {
		    	$('.trivia').append(`<h4>${data.text}</h4>`);
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








