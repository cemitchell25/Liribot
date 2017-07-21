var infoRequest = require('./keys.js');
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var inputOne = process.argv[2];
var inputTwo = process.argv[3];

switch (inputOne){

	case("my-tweets"): 
		var client = new Twitter({
  		consumer_key: infoRequest.twitterKeys.consumer_key,
  		consumer_secret: infoRequest.twitterKeys.consumer_secret,
  		access_token_key: infoRequest.twitterKeys.access_token_key,
  		access_token_secret: infoRequest.twitterKeys.access_token_secret
		});

		var params = {screen_name: 'chelss25',
						count: 20
					};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {

		  	for (var i=0; i < tweets.length; i++) {

		    console.log(tweets[i].text);
		    console.log(" ");

		  }}

		  else {
		  	console.log(error);
		  }
		});

		break;

	case("spotify-this-song"):
		var spotify = new Spotify({
		  id: "27c69fd7ec7f4b8fb718ba9e2fa1cb3b",
		  secret: "eea3068a82be4215ab0334e97ed4eb38"

		});

		spotify
		  .search({ type: 'track', limit: 5, query: inputTwo})
		  .then(function(response) {


		 for (var i=0; i < response.tracks.items.length; i++) {

		 	// console.log(response.tracks.items[i].album);
		 	console.log(response.tracks.items[i].album.name);

		 	for (var j=0; j < response.tracks.items[i].album.artists.length; j++) {

		    console.log(response.tracks.items[i].album.artists[j].name);
		    console.log(response.tracks.items[i].album.artists[j].href);
		    console.log(" ");
		 
		  }}})

		  .catch(function(err) {
		    console.log(error);

		  });


}





//IMBD info request
// Then run a request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {
  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});