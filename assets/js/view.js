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
		// clear html
		// $('.ingredientList').html('');
		// $('.recipeInstructions').html('');
		// $('.equipmentList').html('');
		// $('.similarRecipes').html('');
		let recipe = localStorage.getItem('recipeInfo');
		recipe = JSON.parse(recipe);
		let steps = recipeInstructions[0].steps;
		let ingredientArray = [];
		let ingredients = [];
		let equipmentArray = [];
		let equipment = [];
		// display image, title
		$('.recipeImage').attr('src', recipe.src);
		$('.recipeImage').attr('alt', recipe.alt);
		// loop through steps to get ingredients and equipment
		steps.forEach(step => {
			ingredientArray.push(step.ingredients);
			equipmentArray.push(step.equipment);
		});

		ingredientArray.forEach(ingredientArr => {
			for(let i=0;i<ingredientArr.length;i++){
				ingredients.push(ingredientArr[i].name);
			}
		});

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

	static displaySimilarRecipes(recipes){
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

	static displayMealPlan(mealPlan){
		console.log(mealPlan);
		let idx = 0;
		if(mealPlan.meals){
			$('.mealPlanSchedule').html('');
			mealPlan.meals.forEach(meal => {
				console.log(meal, idx);
				$('.mealPlanSchedule')
					.append(
						`<section class="mealDay">`
						+ `<h3>Day 1</h3>`
						+ '<article class="recipe">'
						+ `<img src="https://spoonacular.com/recipeImages/${meal.image}" alt=${meal.id}/>`
						+ `<h3>${meal.title}</h3>`
						+ `<p>Cook Time: ${meal.readyInMinutes} minutes</p>`
						+ `<button class="recipeLink" onclick="Session.mealLink(event)">Get Recipe</button>`
						+ '</article>'
						+ `</section>`
					);
			});
		}else{
			$('.mealPlanSchedule').html('');
			mealPlan.items.forEach(meal => {
				meal.value = JSON.parse(meal.value);
				console.dir(meal.value, idx);
				$('.mealPlanSchedule')
					.append(
						`<article class="mealDay">`
						+ `<h3>Day 1</h3>`
						+ '<section class="recipe">'
						+ `<img src="https://spoonacular.com/recipeImages/${meal.image}" alt=${meal.value.id}/>`
						+ `<h3>${meal.value.title}</h3>`
						+ `<p>Cook Time: ${meal.readyInMinutes} minutes</p>`
						+ `<button class="recipeLink" onclick="Session.mealLink(event)">Get Recipe</button>`
						+ '</section>'
						+ `</article>`
					);
			});
		}
		
	}
}