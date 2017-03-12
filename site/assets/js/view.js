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
						</iframe>`
					);
		});
	}

	static displayRecipePage(){
		let str = localStorage.getItem('recipeLS');
		let recipeInfo = JSON.parse(str);
		let recipeId = recipeInfo[0];
		console.dir(recipeId);
		let steps = recipeInfo[1].data[0].steps;
		let ingredients = steps[0].ingredients;
		let equipment = steps[0].equipment;
		$('.recipeImage').attr('src', recipeId.src);
		$('.recipeImage').attr('alt', recipeId.alt);
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
		if(ingredients.length > 0){
			ingredients.forEach(ingredient => {
				$('.ingredientList')
					.append(
						`<li>`
						+ `${ingredient.name}`
						+ `</li>`
				);
			});
		}else{
				$('.ingredientList').append('<li>Ingredients not available</li>');
		}
		if(equipment.length > 0){
			equipment.forEach(item => {
				$('.equipmentList')
					.append(
						`<li>`
						+ `${item.name}`
						+ `</li>`
				);
			});
		}else{
			$('.equipmentList').append('<li>Equipment not available</li>');
		}
		
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
						`<article class="mealDay">`
						+ `<h3>Day 1</h3>`
						+ '<section class="recipe">'
						+ `<img src="https://spoonacular.com/recipeImages/${meal.image}" alt=${meal.id}/>`
						+ `<h3>${meal.title}</h3>`
						+ `<p>Cook Time: ${meal.readyInMinutes} minutes</p>`
						+ `<button class="recipeLink" onclick="Session.recipeLink(event)">Get Recipe</button>`
						+ '</section>'
						+ `</article>`
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
						+ `<button class="recipeLink" onclick="Session.recipeLink(event)">Get Recipe</button>`
						+ '</section>'
						+ `</article>`
					);
			});
		}
		
	}
}