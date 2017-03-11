$(function(){
		
	function init(){
		gapi.client.setApiKey('AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg');
		gapi.client.load('youtube', 'v3', function(){
			console.log('ready');
		});
	}

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

	$.when(
		$('.submitSearch').on('click', (e) => {
			e.preventDefault();
			// window.location.assign('../search.html');
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

		}),

		$('.submitSearch').on('click', (e) => {
			e.preventDefault();
			let request = gapi.client.request({
				path: `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg&part=snippet&q=${$('.searchRecipe').val()}`,
			});
			request.execute(function(response){
				let videos = response.items;
				$.each(videos, function(index, item){
					console.table(item);
					$('.ytResults').append(`<h3>${item.snippet.title}</h3>`
									+ `<iframe class="ytPlayer" type="text/html" src="http://www.youtube.com/embed/${item.id.videoId}"></iframe>`);
				});
			});
		})

	).then(function(){
		console.log('success');
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















