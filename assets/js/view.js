class View{
	constructor(){
		console.log('View created');
	}
	// generate random trivia
	static displayFact(fact){
		$('.triviaResult').append(fact.text);
	}
	// populate results section with recipe image, title, and id
	static displayRecipes(recipes){
		$('.results').html('');
		recipes.forEach(recipe => {
			$('.results').append(
				'<article class="recipe">'
				+ '<div class="recipeImg">'
				+ `<img src="https://spoonacular.com/recipeImages/${recipe.image}" alt=${recipe.id}/>`
				+ '</div>'
		  		+ `<h3>${recipe.title}</h3>`
				+ `<p>Cook Time: ${recipe.readyInMinutes} minutes</p>`
				+ `<button class="recipeLink" onclick="Session.recipeLink(event)">Get Recipe</button>`
				+ '</article>'
			);
		});
	}
	// present 2 youtube videos based on search results
	static displayVideos(videos){
		$('.ytResults').html('');
		videos.forEach(video => {
			$('.ytResults')
				.append(
					`<h3>${video.snippet.title}</h3>`
					+ `<iframe class="ytPlayer" 
								type="text/html" 
								src="http://www.youtube.com/embed/${video.id.videoId}">
						</iframe>`
					);
		});
	}
	// fired on recipe page load
	static displayRecipePage(){
		// grab recipe id
		let hash = window.location.hash.split('#')[1];
		Session.getInstructionsByHash(hash);

	}

	// fired after instructions are found
	static displayRecipeInformation(recipeInstructions){
		// get local storage items
		// parse from string
		let recipe = localStorage.getItem('recipeInfo');
		recipe = JSON.parse(recipe);
		let meal = localStorage.getItem('mealInfo');
		meal = JSON.parse(meal);
		// local storage is cleared after each iteration
		// search for set local storage items
		if(recipe != null){
			// get 2 similar videos using recipe title
			Controller.similarVideos(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg&part=snippet&maxResults=2&topicId=/m/02wbm&q=recipes+with+${recipe.title}`);
			// display image on recipe page
			$('.recipeImage').attr('src', recipe.src);
			$('.recipeImage').attr('alt', recipe.alt);
			// create pinterest save button
			$('.tools').append(
					'<div class="pinterest">'
					+ `<a data-pin-do="buttonPin" href="https://www.pinterest.com/pin/create/button/&url=${encodeURIComponent(window.location.href)}/&media=${encodeURIComponent(recipe.src)}&description=Recipe">`
					+ '<img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_gray_20.png" />'
					+ '</a>'
					+ '</div>'
				);
		}else if(meal != null){
			// get 2 similar videos using recipe title
			Controller.similarVideos(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg&part=snippet&maxResults=2&topicId=/m/02wbm&q=recipes+with+${meal.title}`);		
			// display image on recipe page
			$('.recipeImage').attr('src', meal.src);
			$('.recipeImage').attr('alt', meal.alt);	
			// create pinterest save button
			$('.tools').append(
					'<div class="pinterest">'
					+ `<a data-pin-do="buttonPin" href="https://www.pinterest.com/pin/create/button/&url=${encodeURIComponent(window.location.href)}/&media=${encodeURIComponent(recipe.src)}&description=Recipe">`
					+ '<img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_gray_20.png" />'
					+ '</a>'
					+ '</div>'
				);

		}else{
			console.log('error');
		}
		
		// check if recipe does not have instructions
		if(!recipeInstructions.length > 0){
			$('.ingredientList').html(`<h4>Sorry! There doesn't seem to be a recipe for this item yet.</h4>`)
		}else{
			// get values from recipeInstructions
			let steps = recipeInstructions[0].steps;
			// variables to store values
			let ingredientArray = [];
			let ingredients = [];
			let equipmentArray = [];
			let equipment = [];
			// display image, title
			// each step has an array of ingredients and equipment
			// get all arrays from steps
			steps.forEach(step => {
				ingredientArray.push(step.ingredients);
				equipmentArray.push(step.equipment);
			});
			// loop through each array and get individual
			// item. store in new array
			ingredientArray.forEach(ingredientArr => {
				for(let i=0;i<ingredientArr.length;i++){
					ingredients.push(ingredientArr[i].name);
				}
			});
			// loop through each array and get individual
			// item. store in new array
			equipmentArray.forEach(equipmentArr => {
				for(let i=0;i<equipmentArr.length;i++){
					equipment.push(equipmentArr[i].name);
				}
			})

			// display ingredients
			ingredients.forEach(ingredient => {
				$('.ingredientList')
						.append(
							`<li>`
							+ `${ingredient}`
							+ `</li>`
					);
			});

			// loop through instructions
			steps.forEach(step => {
				$('.recipeInstructions')
					.append(
						`<li>`
						+ `Step ${step.number}:`
						+ `<br />`
						+ `${step.step}`
						+ `</li>`
				);
			});


			// loop through equipment
			equipment.forEach(item => {
				$('.equipmentList')
						.append(
							`<li>`
							+ `${item}`
							+ `</li>`
					);
			});

		}
		// clear local storage
		localStorage.clear();
	}

	// get similar recipes
	// called from Session.recipeInstructions hash method
	static displaySimilarRecipes(recipes){
		// display similar recipes
		recipes.forEach(recipe => {
			console.log(recipe.id);
			$('.similarRecipes')
				.append(
					'<article class="recipe">'
					+ '<div class="recipeImg">'
					+ `<img src="https://spoonacular.com/recipeImages/${recipe.image}" alt=${recipe.id}/>`
					+ '</div>'
			  		+ `<h3>${recipe.title}</h3>`
					+ `<p>Cook Time: ${recipe.readyInMinutes} minutes</p>`
					+ `<button class="recipeLink" onclick="Session.recipeLink(event)">Get Recipe</button>`
					+ '</article>'
			);
		});
	}
	// called from Session.recipeInstructions hash method
	static displaySimilarVideos(videos){
		// display similar videos
		$('.similarVideos').html('');
		videos.forEach(video => {
			$('.similarVideos')
				.append(
					`<h3>${video.snippet.title}</h3>`
					+ `<iframe class="ytPlayer" 
								type="text/html" 
								src="http://www.youtube.com/embed/${video.id.videoId}">
						</iframe>`
					);
		});
	}

	static displayMealPlan(mealPlan){
		let idx = 0;
		// checks for week or day timeFrame
		// day
		if(mealPlan.meals){
			mealPlan.meals.forEach(meal => {
				// increment meal count
				// display meal time accordingly
				idx ++;
				if(idx == 1){
					this.time = 'Breakfast';
				}else if(idx == 2){
					this.time = 'Lunch';
				}else{
					this.time = 'Dinner'
				}
				$('.mealPlanSchedule')
					.append(
						`<section class="mealDay">`
						+ `<h3>${this.time}</h3>`
						+ '<article class="recipe">'
						+ '<div class="recipeImg">'
						+ `<img src="https://spoonacular.com/recipeImages/${meal.image}" alt=${meal.id}/>`
						+ '</div>'
						+ `<h3>${meal.title}</h3>`
						+ `<p>Cook Time: ${meal.readyInMinutes} minutes</p>`
						+ `<button class="recipeLink" onclick="Session.mealLink(event)">Get Recipe</button>`
						+ '</article>'
						+ `</section>`
					);
			});
		}else{
			// week
			this.mealArray = [];
			mealPlan.items.forEach(meal => {
				let mealItem = JSON.parse(meal.value);
				this.mealArray.push(mealItem);
			});
			let meal = this.mealArray;
			let weekSchedule = $('.mealPlanSchedule').html();

			// -------------- TO BE REFACTORED

			// divide the meals into days
			// get first 1-3, store in day 1
			weekSchedule += `<h3 class="day">Day 1</h3>`;

			for(let i=0;i<3;i++){
				weekSchedule += `<article class="mealDay">`
					+ '<section class="recipe">'
					+ '<div class="recipeImg">'
					+ `<img src="https://spoonacular.com/recipeImages/${meal[i].image}" alt=${meal[i].id}/>`
					+ '</div>'
					+ `<h3>${meal[i].title}</h3>`
					+ `<button class="recipeLink" onclick="Session.mealLink(event)">Get Recipe</button>`
					+ '</section>'
					+ `</article>`
			}

			weekSchedule += `<h3 class="day">Day 2</h3>`;
			// get first 4-6, store in day 2
			for(let i=2;i<5;i++){
				weekSchedule += `<article class="mealDay">`
					+ '<section class="recipe">'
					+ '<div class="recipeImg">'
					+ `<img src="https://spoonacular.com/recipeImages/${meal[i].image}" alt=${meal[i].id}/>`
					+ '</div>'
					+ `<h3>${meal[i].title}</h3>`
					+ `<button class="recipeLink" onclick="Session.mealLink(event)">Get Recipe</button>`
					+ '</section>'
					+ `</article>`
			}

			weekSchedule += `<h3 class="day">Day 3</h3>`;
			// get first 7-9, store in day 3
			for(let i=4;i<7;i++){
				weekSchedule += `<article class="mealDay">`
					+ '<section class="recipe">'
					+ '<div class="recipeImg">'
					+ `<img src="https://spoonacular.com/recipeImages/${meal[i].image}" alt=${meal[i].id}/>`
					+ '</div>'
					+ `<h3>${meal[i].title}</h3>`
					+ `<button class="recipeLink" onclick="Session.mealLink(event)">Get Recipe</button>`
					+ '</section>'
					+ `</article>`
			}

			weekSchedule += `<h3 class="day">Day 4</h3>`;
			// get first 10-12, store in day 4
			for(let i=6;i<9;i++){
				weekSchedule += `<article class="mealDay">`
					+ '<section class="recipe">'
					+ '<div class="recipeImg">'
					+ `<img src="https://spoonacular.com/recipeImages/${meal[i].image}" alt=${meal[i].id}/>`
					+ '</div>'
					+ `<h3>${meal[i].title}</h3>`
					+ `<button class="recipeLink" onclick="Session.mealLink(event)">Get Recipe</button>`
					+ '</section>'
					+ `</article>`
			}

			weekSchedule += `<h3 class="day">Day 5</h3>`;
			// get first 13-15, store in day 5
			for(let i=8;i<11;i++){
				weekSchedule += `<article class="mealDay">`
					+ '<section class="recipe">'
					+ '<div class="recipeImg">'
					+ `<img src="https://spoonacular.com/recipeImages/${meal[i].image}" alt=${meal[i].id}/>`
					+ '</div>'
					+ `<h3>${meal[i].title}</h3>`
					+ `<button class="recipeLink" onclick="Session.mealLink(event)">Get Recipe</button>`
					+ '</section>'
					+ `</article>`
			}

			weekSchedule += `<h3 class="day">Day 6</h3>`;
			// get first 16-18, store in day 6
			for(let i=10;i<13;i++){
				weekSchedule += `<article class="mealDay">`
					+ '<section class="recipe">'
					+ '<div class="recipeImg">'
					+ `<img class="recipeImg" src="https://spoonacular.com/recipeImages/${meal[i].image}" alt=${meal[i].id}/>`
					+ '</div>'
					+ `<h3>${meal[i].title}</h3>`
					+ `<button class="recipeLink" onclick="Session.mealLink(event)">Get Recipe</button>`
					+ '</section>'
					+ `</article>`
			}

			weekSchedule += `<h3 class="day">Day 7</h3>`;
			// get first 19-21, store in day 7
			for(let i=12;i<15;i++){
				weekSchedule += `<article class="mealDay">`
					+ '<section class="recipe">'
					+ '<div class="recipeImg">'
					+ `<img src="https://spoonacular.com/recipeImages/${meal[i].image}" alt=${meal[i].id}/>`
					+ '</div>'
					+ `<h3>${meal[i].title}</h3>`
					+ `<button class="recipeLink" onclick="Session.mealLink(event)">Get Recipe</button>`
					+ '</section>'
					+ `</article>`
			}

			$('.mealPlanSchedule').append(weekSchedule);
		}
	}

}