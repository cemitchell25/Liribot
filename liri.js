var infoRequest = require('./keys.js');
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var inputOne = process.argv[2];
var inputTwo = process.argv[3];


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




function myTweets(){

	var client = new Twitter({
		consumer_key: infoRequest.twitterKeys.consumer_key,
		consumer_secret: infoRequest.twitterKeys.consumer_secret,
		access_token_key: infoRequest.twitterKeys.access_token_key,
		access_token_secret: infoRequest.twitterKeys.access_token_secret
	});

	var params = {screen_name: 'chelss25', count: 20 };
				
				

client.get('statuses/user_timeline', params, function(error, tweets, response) {
	if (!error) {

		for (var i=0; i < tweets.length; i++) {

			console.log(tweets[i].text);
			console.log("********************");

		}
	}

		else {
			console.log(error);
		}
	});
}

function spotifyThis() {
	var spotify = new Spotify({
		id: "27c69fd7ec7f4b8fb718ba9e2fa1cb3b",
		secret: "eea3068a82be4215ab0334e97ed4eb38"

	});

	spotify
	.search({ type: 'track', limit: 5, query: inputTwo})
	.then(function(response) {


		for (var i=0; i < response.tracks.items.length; i++) {

			console.log(response.tracks.items[i].name);
			console.log(response.tracks.items[i].album.name);

			for (var j=0; j < response.tracks.items[i].album.artists.length; j++) {

				console.log(response.tracks.items[i].album.artists[j].name);
				console.log(response.tracks.items[i].album.artists[j].href);
				console.log("********************");

			}
		}
	})

	.catch(function(err) {
		console.log(error);

	});

}


	function movieThis() {
		//IMBD info request
		// Then run a request to the OMDB API with the movie specified
		request("http://www.omdbapi.com/?t=" + inputTwo + "&y=&plot=short&tomatoes=true&apikey=40e9cece", function(error, response, body) {
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
		    console.log("Country Produced in: " + JSON.parse(body).Country);
		    console.log("Actor(s): " + JSON.parse(body).Actors);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
		    console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
		    console.log("********************"); 



    // 	else if(inputTwo == ) { 

		  //   console.log("-----------------------");
		  //   console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
		  //   console.log("It's on Netflix!");


  		// }


  		
  	}
  });
}

		function doWhatItSays(){
			fs.readFile('random.txt', 'utf8', function(err, data){

				if (err){ 
					return console.log(err);
				}

				var dataArr = data.split(',');

				processCommands(dataArr[0], dataArr[1]);
			});
		}


