class Model{
	constructor(){
		console.log('Model created');
	}

	static init(){
		// load client youtube
		console.log('test');
		gapi.client.setApiKey('AIzaSyCxolTs58eWL7PrMUVJHPslqY7mOYwQ5lg');
		gapi.client.load('youtube', 'v3', function(){
			console.log('ready');
		});
	}

	static trivia(url){
		$.ajax({
		    url, // The URL to the API. You can get this in the API page of the API you intend to consume
		    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		    data: {}, // Additional parameters here
		    dataType: 'json',
		    success: function(data) {
		    	Controller.setTrivia(data);
		    },
		    error: function(err) { alert(err); },
		    beforeSend: function(xhr) {
		    xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
		    }
		});
	}

	static recipeSearch(url){
		console.log('test');

		let results = $.ajax({
			url, // The URL to the API. You can get this in the API page of the API you intend to consume
		   	type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		    data: {}, // Additional parameters here
		    dataType: 'json',
		    success: function(data) {
		  		const recipes = data.results;
		  		Controller.setRecipes(recipes);
		    },
			error: function(err) { alert(err); },
				beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Mashape-Authorization", "fHjaL4Ss9gmshKplCTTN8WTMJD0up1Tuhn4jsnpw0mSEkWnxu9"); // Enter here your Mashape key
			}
		});

	}

	static ytSearch(path){
		let request = gapi.client.request({
			path,
		});
		request.execute(response => {
			let videos = response.items;
			Controller.setVideos(videos);
		});
	}
}