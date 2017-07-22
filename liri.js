
//variable created to hold the requests as well as the user inputs
var infoRequest = require('./keys.js');
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var inputOne = process.argv[2];
var inputTwo = process.argv[3];
var fs = require("fs");

//switch statement on inputOne to call different commands
switch (inputOne) {

	// handle the my-tweets command
	case 'my-tweets':
	myTweets();
	break;

	// handle the spotify-this-song command
	case 'spotify-this-song':
	spotifyThis(inputTwo);
	break;

	// handle the movie-this command
	case 'movie-this':
	movieThis(inputTwo);
	break;

	// handle the do-what-it-says command
	case 'do-what-it-says':
	doWhatItSays();
	break;

	// default response when command is not valid
	default:
	console.log("Command not valid. Please try again!");

}



// function to handle the my-tweets call 
function myTweets(){

	//variable that holds all of my twitter keys
	var client = new Twitter({
		consumer_key: infoRequest.twitterKeys.consumer_key,
		consumer_secret: infoRequest.twitterKeys.consumer_secret,
		access_token_key: infoRequest.twitterKeys.access_token_key,
		access_token_secret: infoRequest.twitterKeys.access_token_secret
	});

	//params to pass through twitter on what username to search for / limit
	var params = {screen_name: 'chelss25', count: 20 };
	var responseBody = {};
				
				
// getting the info from twitter and specifically pulling the tweet
client.get('statuses/user_timeline', params, function(error, tweets, response) {
	if (!error) {

		for (var i=0; i < tweets.length; i++) {

			console.log(tweets[i].text);
			console.log("********************");

		responseBody.tweets = tweets[i].text;

		var tweetData = JSON.stringify(responseBody) + "\n";

		fs.appendFile('log.txt', `${tweetData}\n`, function(error){
			if (error){
				return console.log("ERROR", error);
			}
		});

		}
	}

		else {
			console.log(error);
		}
	});
}

// function to handle the spotify-this-song call 
function spotifyThis(query) {

	// variables to search for either userinput or default of "ace of base"
	var song = query || "Ace of Base";
	var spotify = new Spotify({
		id: "27c69fd7ec7f4b8fb718ba9e2fa1cb3b",
		secret: "eea3068a82be4215ab0334e97ed4eb38"

	});

	// getting the info from spotify and specifically pulling the requested info
	spotify
	.search({ type: 'track', limit: 5, query: song})
	.then(function(response) {

		var responseBody = {};

		//looping through spotify info to pull specific JSON items
		for (var i=0; i < response.tracks.items.length; i++) {

			console.log("Song Name: " + response.tracks.items[i].name);
			console.log("Album Name: " + response.tracks.items[i].album.name);

			for (var j=0; j < response.tracks.items[i].album.artists.length; j++) {

				console.log("Artist: " + response.tracks.items[i].album.artists[j].name);
				console.log("Link: " + response.tracks.items[i].album.artists[j].href);
				console.log("********************");


		//logging all information on log.txt
		responseBody.name = response.tracks.items[i].name;
		responseBody.albumName = response.tracks.items[i].album.name;
		responseBody.artistName = response.tracks.items[i].album.artists[j].name;
		responseBody.link = response.tracks.items[i].album.artists[j].href;

		var songData = JSON.stringify(responseBody) + "\n";

		fs.appendFile('log.txt', `${songData}\n`, function(error){
			if (error){
				return console.log("ERROR", error);
			}
		});

			}
		}
	})
	.catch(function(error) {
		console.log(error);

	});

}


	function movieThis(movieTitle) {

		var title = movieTitle || "Mr. Nobody";
		//IMBD info request
		// Then run a request to the OMDB API with the movie specified
		request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&tomatoes=true&apikey=40e9cece", function(error, response, body) {
		  // If the request is successful (i.e. if the response status code is 200)
		  if (!error && response.statusCode === 200) {
		    // Parse the body of the site and recover just the imdbRating
		    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Year: " + JSON.parse(body).Year);
		    console.log("Movie Rating: " + JSON.parse(body).imdbRating);
		    console.log("Country Produced in: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Movie Plot: " + JSON.parse(body).Plot);
		    console.log("Actor(s): " + JSON.parse(body).Actors);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
		    console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
		    console.log("********************"); 

		var responseBody = {};

		//logging all information on log.txt
		responseBody.title = JSON.parse(body).Title;
		responseBody.year = JSON.parse(body).Year;
		responseBody.movieRating = JSON.parse(body).imbdRating;
		responseBody.country = JSON.parse(body).Country;
		responseBody.language = JSON.parse(body).Language;
		responseBody.plot = JSON.parse(body).Plot;
		responseBody.actors = JSON.parse(body).Actors;
		responseBody.tomatoRating = JSON.parse(body).tomatoRating;
		responseBody.tomatoURL = JSON.parse(body).tomatoURL;

		var movieData = JSON.stringify(responseBody) + "\n";

		fs.appendFile('log.txt', `${movieData}\n`, function(error){
			if (error){
				return console.log("ERROR", error);
			}
		});

  		
  	}
  });
}

		function doWhatItSays(){

			  fs.readFile('random.txt', "utf8", function(error, data){
    			var txt = data.split(',');

    			spotifyThis(txt[1]);

			});
		}


