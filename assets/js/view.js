class View{
	constructor(){
		console.log('View created');
	}
	// generate random trivia
	static displayFact(fact){
		$('.triviaResult').append(fact.text);
	}

	// populate results section with recipe data object
	// home page
	static displayRecipes(recipeArray){

		// remove loading animation
		setTimeout(removeLoader, 1000);

		function removeLoader(){

			$('.loader').removeClass('loading');

			$('.results').html('');
			recipeArray.forEach(recipe => {
				$('.results').append(
					` <a href="recipe.html#${recipe.id}" data-id=${recipe.id}>`
					+ '<article class="recipe">'
					+ '<div class="recipeImg">'
					+ `<img src="https://spoonacular.com/recipeImages/${recipe.image}" alt="${recipe.title}"/>`
					+ '</div>'
			  		+ `<h3>${recipe.title}</h3>`
					+ `<p>Cook Time: ${recipe.readyInMinutes} minutes</p>`
					+ `</a>`
					+ '</article>'
				);
			});

		}		

	}
	// present 2 youtube videos based on search results
	static displayVideos(videos){
		// display similar videos
		$('.ytResults').html('');
		videos.forEach(video => {
			$('.ytResults')
				.append(
					'<article class="videoRecipe">'
					+ `<iframe class="ytPlayer" 
								type="text/html" 
								src="https://www.youtube.com/embed/${video.id.videoId}">
						</iframe>`
					+ `<h3>${video.snippet.title}</h3>`
					+ '</article>'
				);
		});
	}

	// fired on recipe page load
	static displayRecipePage(){
		// grab recipe id
		let hash = window.location.hash.split('#')[1];

		// get recipe information
		Session.getInstructionsByHash(hash);

	}

	static displayRecipeInfo(recipeDO){

		// store recipe DO in variables
		let id = recipeDO.id;
		let src = recipeDO.image;
		let title = recipeDO.title;
		let servings = recipeDO.servings;
		let readyInMinutes = recipeDO.readyInMinutes;
		let weightWatchers = recipeDO.weightWatcherSmartPoints;
		let vegan = recipeDO.vegan;
		let glutenFree = recipeDO.glutenFree;
		let steps = recipeDO.steps;
		let ingredients = recipeDO.ingredients;

		// jumbotron data view
		$('.recipeImage').attr('src', src);
		$('.recipeTitle').html(title);
		$('.servings').html(servings);
		$('.ready-time').html(readyInMinutes);
		$('.weight-score').html(weightWatchers);

		// check if recipe is vegan
		if(vegan == true){
			// add new stat
			$('.recipe-stat').last().after(
				'<div class="recipe-stat">'
				+ '<i class="fa fa-check" aria-hidden="true"></i>'
				+ '<p>VEGAN</p>'	
				+ '</div>'
			);
		}
		// check if recipe is gluten free
		if(glutenFree == true){
			// add new stat
			$('.recipe-stat').last().after(
				'<div class="recipe-stat">'
				+ '<i class="fa fa-check" aria-hidden="true"></i>'
				+ '<p>GLUTEN FREE</p>'	
				+ '</div>'
			);
		}

		// check if steps exist
		if(steps && steps.length != 0){

			// loop through steps
			steps.forEach(step => {
				// get individual step
				let instruction = step.step;
				// show step
				$('.recipeInstructions').append(`<li>${instruction}</li>`);

			});

		}else{

			// show message
			$('.recipeInstructions').append("<li>Sorry! We're working on adding instuctions for this recipe.</li>");

		}

		// check if ingredients exist
		if(ingredients && ingredients.length != 0){

			// populate ingredient list
			ingredients.forEach(ingredient => {

				// show ingredient with amount and unit
				$('.ingredientList').append(

					`<li>${ingredient.originalString}</li>`

				);

			});

		}else{

			// show message
			$('.ingredientList').append("<li>Sorry! We're working on adding ingredients for this recipe.</li>");

		}

		

		// get 3 similar videos using recipe title
		Controller.similarVideos(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg&part=snippet&maxResults=3&topicId=/m/02wbm&q=recipes+with+${title}`);
		// favorite recipe button
		$('.favorites').attr({
			'data-id': id,
			'data-recipe': title,
			'data-img': src,
			'data-time': readyInMinutes
		}); 

		// create pinterest save button
		$('.favorites').after(
				`<button class="pinterest" data-media=${src} data-description="${title}">Pin It</button>`
		);
		$('.pinterest').on('click', (e) => {
			PinUtils.pinOne({
				media: e.target.getAttribute('data-media'),
				description: e.target.getAttribute('data-description')
			});
		});
		
		
	}

	// get similar recipes
	// called from Session.recipeInstructions hash method
	static displaySimilarRecipes(recipeArray){
		// display similar recipes
		recipeArray.forEach(recipe => {
			$('.similar-recipes')
				.append(
					` <a href="recipe.html#${recipe.id}">`
					+ '<article class="recipe">'
					+ '<div class="recipeImg">'
					+ `<img src="https://spoonacular.com/recipeImages/${recipe.image}" alt="${recipe.title}"/>`
					+ '</div>'
			  		+ `<h3>${recipe.title}</h3>`
					+ `<p>Cook Time: ${recipe.readyInMinutes} minutes</p>`
					+ `</a>`
					+ '</article>'
			);
		});

	}
	// called from Session.recipeInstructions hash method
	static displaySimilarVideos(videos){
		
		// display similar videos
		$('.similar-videos').html('');
		videos.forEach(video => {
			$('.similar-videos')
				.append(
					'<article class="videoRecipe">'
					+ `<iframe class="ytPlayer" 
								type="text/html" 
								src="https://www.youtube.com/embed/${video.id.videoId}">
						</iframe>`
					+ `<h3>${video.snippet.title}</h3>`
					+ '</article>'
					);
		});
	}

	static displayMealPlan(mealPlanArray){

		// check if week or day
		if(mealPlanArray[0].timeFrame == 'day'){

			// day
			mealPlanArray.forEach(meal => {

				$('.mealPlanSchedule')
					.append(
						`<section class="mealDay">`
						+ `<h3 class="mealTime">${this.time}</h3>`
						+ `<a href="recipe.html#${mealPlanArray[i].id}">`
						+ '<article class="recipe">'
						+ '<div class="recipeImg">'
						+ `<img src="https://spoonacular.com/recipeImages/${mealPlanArray[i].image}" alt="${mealPlanArray[i].title}"/>`
						+ '</div>'
				  		+ `<h3>${mealPlanArray[i].title}</h3>`
						+ `<p>Cook Time: ${mealPlanArray[i].readyInMinutes} minutes</p>`
						+ `</a>`
						+ '</article>'
						+ `</section>`
				);

			});

		}else{

			function displayMealDays(start, finish, day){

				let weekSchedule = $('.mealPlanSchedule').html();

				// create 1 new sections
				weekSchedule += '<section class="weekDay">'
							+ `<h2>Day ${day}</h2>`
							+ '<ul class="weekList">';
				// create 3 meals inside of section
				for(let i=start;i<finish;i++){
					console.log('balls');
					weekSchedule += '<li>'
								+ `<a href="recipe.html#${mealPlanArray[i].id}">`
							  	+ `<h3>${mealPlanArray[i].title}</h3>`
								+ `</a>`
								+ '</li>'
				}
				// finish section
				weekSchedule += '</ul>'
							+ '</section>';

				$('.mealPlanSchedule').html(weekSchedule);

			}

			// week
			// 21 meals
			// split into 3's for each day
			// counter for day
			this.idx = 1;
			for(let i=0;i<mealPlanArray.length;i+=3){

				displayMealDays(i, (i + 3), this.idx++);

			}

		}

	}

	static getFavoriteRecipes(){
		let recipes = JSON.parse(localStorage.getItem('favRecipeArr'));

		if(!recipes || recipes.length < 1){

			$('.favoriteRecipe-container').append(

				"<h1 class='noFavorites'>You haven't saved any recipes yet!</h1>"

			);
		}
		// console.log(recipes.favLS);
		recipes.forEach(recipe => {
			$('.favoriteRecipe-container').append(
				` <a href="recipe.html#${recipe.id}" data-id=${recipe.id}>`
				+ '<article class="recipe">'
				+ '<div class="recipeImg">'
				+ `<img src="${recipe.img}" alt="${recipe.title}"/>`
				+ '</div>'
		  		+ `<h3>${recipe.title}</h3>`
				+ `<p>Cook Time: ${recipe.time} minutes</p>`
				+ `</a>`
				+ '</article>'
			);
		});
	}

}