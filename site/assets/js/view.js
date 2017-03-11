class View{
	constructor(){
		console.log('View created');
	}

	static displayFact(fact){
		$('.triviaResult').append(fact.text);
	}

	static displayRecipes(recipes){
		$('.results').html('');
		recipes.forEach(recipe => {
			$('.results').append(
				'<article class="recipe">'
				+ `<img src="https://spoonacular.com/recipeImages/${recipe.image}" alt=${recipe.id}/>`
		  		+ `<h3>${recipe.title}</h3>`
				+ `<p>Cook Time: ${recipe.readyInMinutes} minutes</p>`
				+ `<button class="recipeLink" onclick="Session.recipeLink(event)">Get Recipe</button>`
				+ '</article>'
			);
		});
	}
	static displayVideos(videos){
		$('.ytResults').html('');
		videos.forEach(video => {
			$('.ytResults')
				.append(
					`<h3>${video.snippet.title}</h3>`
					+ `<iframe class="ytPlayer" 
								type="text/html" 
								src="http://www.youtube.com/embed/${video.id.videoId}">
						</iframe>`);
		});
	}

	static displayRecipePage(recipeObj, recipeData){
		window.location.assign('../../recipe.html');
		console.dir(recipeObj);
		console.log(recipeObj[0].currentSrc);
		
	}
}