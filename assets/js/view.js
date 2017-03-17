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
				` <a href="recipe.html#${recipe.id}" data-id=${recipe.id}>`
				+ '<article class="recipe">'
				+ '<div class="recipeImg">'
				+ `<img src="https://spoonacular.com/recipeImages/${recipe.image}" alt=${recipe.title}/>`
				+ '</div>'
		  		+ `<h3>${recipe.title}</h3>`
				+ `<p>Cook Time: ${recipe.readyInMinutes} minutes</p>`
				+ `</a>`
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

	static displayRecipeInfo(data){
		let src = data.image;
		$('.recipeImage').attr('src', data.image);
		$('.recipeTitle').html(data.title);
		// get 2 similar videos using recipe title
		Controller.similarVideos(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg&part=snippet&maxResults=2&topicId=/m/02wbm&q=recipes+with+${data.title}`);
		// favorite recipe button
		$('.favorites').attr({
			'data-id': data.id,
			'data-recipe': data.title,
			'data-img': data.image,
			'data-time': data.readyInMinutes
		}); 
		// create pinterest save button
		$('.tools').append(
				`<button class="pinterest" data-media=${src} data-description="New Recipe">Pin It</button>`
		);
		$('.pinterest').on('click', (e) => {
			PinUtils.pinOne({
				media: e.target.getAttribute('data-media'),
				description: e.target.getAttribute('data-description')
			});
		});
		
		
	}

	// fired after instructions are found
	static displayRecipeInformation(recipeInstructions){
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
						+ `<b>${step.number}.</b> `
						+ `${step.step}`
						+ `</li>`
						+ '<br />'
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
	}

	// get similar recipes
	// called from Session.recipeInstructions hash method
	static displaySimilarRecipes(recipes){
		// display similar recipes
		recipes.forEach(recipe => {
			$('.similarRecipes')
				.append(
					` <a href="recipe.html#${recipe.id}">`
					+ '<article class="recipe">'
					+ '<div class="recipeImg">'
					+ `<img src="https://spoonacular.com/recipeImages/${recipe.image}" alt=${recipe.id}/>`
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
		$('.similarVideos').html('');
		videos.forEach(video => {
			$('.similarVideos')
				.append(
					'<article class="videoRecipe">'
					+ `<iframe class="ytPlayer" 
								type="text/html" 
								src="http://www.youtube.com/embed/${video.id.videoId}">
						</iframe>`
					+ `<h3>${video.snippet.title}</h3>`
					+ '</article>'
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
						+ `<a href="recipe.html#${meal.id}">`
						+ '<article class="recipe">'
						+ '<div class="recipeImg">'
						+ `<img src="https://spoonacular.com/recipeImages/${meal.image}" alt=${meal.id}/>`
						+ '</div>'
				  		+ `<h3>${meal.title}</h3>`
						+ `<p>Cook Time: ${meal.readyInMinutes} minutes</p>`
						+ `</a>`
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

			function displayMealDays(start, finish){
				for(let i=start;i<finish;i++){
					let imgSrc = 'https://spoonacular.com/recipeImages/' 
							+ meal[i].title.replace(/\s+/g, '-').replace('#', '-') + '-' 
							+ meal[i].id + '.jpg';
					weekSchedule += `<article class="mealDay">`
						+ `<a href="recipe.html#${meal[i].id}">`
							+ '<article class="recipe">'
							+ '<div class="recipeImg">'
							+ `<img src="${imgSrc[i]}" alt=${meal[i].id}/>`
							+ '</div>'
					  		+ `<h3>${meal[i].title}</h3>`
							+ `<p>Cook Time: ${meal[i].readyInMinutes} minutes</p>`
							+ `</a>`
							+ '</article>'
						+ `</article>`
				}
			}

			// divide the meals into days
			// get first 1-3, store in day 1 etc..
			weekSchedule += `<h3 class="day">Day 1</h3>`;
			displayMealDays(0,3);

			weekSchedule += `<h3 class="day">Day 2</h3>`;
			displayMealDays(3,6);

			weekSchedule += `<h3 class="day">Day 3</h3>`;
			displayMealDays(6,9);

			weekSchedule += `<h3 class="day">Day 4</h3>`;
			displayMealDays(9,12);

			weekSchedule += `<h3 class="day">Day 5</h3>`;
			displayMealDays(12,15);

			weekSchedule += `<h3 class="day">Day 6</h3>`;
			displayMealDays(15,18);

			weekSchedule += `<h3 class="day">Day 7</h3>`;
			displayMealDays(18,21);


			$('.mealPlanSchedule').append(weekSchedule);
		}
	}

	static getFavoriteRecipes(){
		let recipes = localStorage.getItem('favRecipe');
		recipes = JSON.parse(recipes);
	}

}