class View{
	constructor(){
		console.log('View created');
	}

	static displayFact(fact){
		$('.triviaResult').append(fact.text);
	}

	static displayRecipes(recipes){
		recipes.forEach(recipe => {
			$('.results').append(
				'<article class="recipe">'
				+ `<img src="https://spoonacular.com/recipeImages/${recipe.image}"/>`
		  		+ `<h3>${recipe.title}</h3>`
				+ `<p>Cook Time: ${recipe.readyInMinutes} minutes</p>`
				+ `<button>Get Recipe</button>`
				+ '</article>'
			);
		});
	}
	static displayVideos(videos){
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
}