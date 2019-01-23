//Declaring various and requiring npm packages

require("dotenv").config();

const keys = require("./keys.js");

const axios = require("axios");

const moment = require("moment");

const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);

const fs = require("fs");

let nodeArguments = process.argv;

let liriCommand = process.argv[2];

//Defining user input and taking into account of input length

let userInput = '';

    for(let i = 3; i < nodeArguments.length; i++) {
        if (i > 3 && i < nodeArguments.length) {
            userInput = userInput + "+" + nodeArguments[i];
        }
        else {
            userInput += nodeArguments[i];
        }
    }

//Switch function to execute depending on command given by user
switch (liriCommand) {
    case 'concert-this':
        concertSearch(userInput);
        break;
    case 'spotify-this-song':
        songSearch(userInput);
        break;
    case 'movie-this':
        filmSearch(userInput);
        break;
    case 'do-what-it-says':
        randomCommand();
        break;
    default:
        console.log("Error: Please type any of the following commands: 'concert-this' and an artist name, 'spotify-this-song' and a song name, 'movie-this' and a movie title, or 'do-what-it-says' for a random response.");
}

//Function for concert search and using Bands in Town API
function concertSearch(userInput) {

    let queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(

        function(response) {

            //Declaring a variable in order to not code as much
            let concert = response.data[0];

            if (response === undefined) {
                console.log("Unfortunately at this time there are NO upcoming events for this artist. Please search another one!");
            }
            else {
                console.log("*******NEXT UPCOMING EVENT INFO*******");

                console.log("Venue:" + " " + concert.venue.name);

                console.log("Location:" + " " + concert.venue.city + "," + " " + concert.venue.region);

                let concertDate = moment(response.datetime).format("MM/DD/YYYY");

                console.log("Date:" + " " + concertDate);

                console.log("**************************************");

                let logConcert = "concert-this"+"\n" + "Next Upcoming Event Info :"+"\n" + "Artist: " + concert.lineup[0]+"\n"
                + "Venue: " + concert.venue.name+"\n" + "Location: " + concert.venue.city + "," + " " + concert.venue.region+"\n" + "Date: " + concertDate+"\n" + "***************"+"\n";

                //Displays the previous variable, logConcert, neatly in the the log.txt file
                fs.appendFile("log.txt", logConcert, function(err) {

                    if(err) {
                        console.log(err);
                    }
                    else {
                        console.log("Concert info added to the log!");
                    }
                })
            }
        }
    ).catch(function(error) {
        console.log(error);
    });
}
//End of concertSearch function


//Function for searching songs using the Spotify Node API
function songSearch(userInput) {

    //Code to show that if a user does not put in a song, that the following song will be displayed 
    if (!userInput) {

        userInput = "The Sign Ace of Base";
        
        console.log("It looks like you didn't put in a song name. Here's a recommended classic.");
    
    }
    

    spotify.search({type: "track", query: userInput, limit: 1})

        .then(function(response) {

            //Variables created to clean up code and prevent duplications
            let songs = response.tracks.items[0];

            let previewUrl;

            console.log("Artist: " + songs.artists[0].name);

            console.log("Song Title: " + songs.name);

            console.log("Album: " + songs.album.name);

            //If/else state needed in the instance that there is no preview URL
            if (songs.preview_url === undefined || songs.preview_url === null) {
                previewUrl = "Unfortunately there is no preview for this song :( .";
            }
            else {
                previewUrl = songs.preview_url;
            }

            console.log("Preview Song: " + previewUrl);

            let logSong = "spotify-this-song"+"\n" + "Song Info :"+"\n" + "Artist: " + songs.artists[0].name+"\n"
            + "Song Title: " + songs.name+"\n" + "Album: " + songs.album.name+"\n" + "Preview Song: " + previewUrl+"\n" + "***************"+"\n";

            //Displays the previous variable, logSong, neatly in the the log.txt file
            fs.appendFile("log.txt", logSong, function(err) {

                if(err) {
                    console.log(err);
                }
                else {
                    console.log("Song info added to the log");
                }
            })
        })
        .catch(function(err) {
            console.log(err);
        });

}
//End of songSearch function


//Function for searching for movies using the OMDB API via Axios
function filmSearch(userInput) {

    //Code to show that if a user does not put in a movie, that the following movie will be displayed
    if(!userInput) {

        userInput = "Mr. Nobody";

        console.log("Can't think of a movie? Here's a great recommendation! And the best part: It's on Netflix!");

    }

    let filmUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

    axios.get(filmUrl).then(

        function(response) {

            //Variables created to clean up code and prevent duplications
            let movies = response.data;

            console.log("Title: " + movies.Title);

            console.log("Year: " + movies.Year);

            console.log("IMDB Rating: " + movies.imdbRating);

            console.log("Rotten Tomatoes Score: " + movies.Ratings[1].Value);

            console.log("Country: " + movies.Country);

            console.log("Language: " + movies.Language);

            console.log("Plot: " + movies.Plot);

            console.log("Actors: " + movies.Actors);

            let logFilm = "movie-this"+"\n" + "Movie Info :"+"\n" + "Title: " + movies.Title+"\n"
            + "Year: " + movies.Year+"\n" + "IMDB Rating: " + movies.imdbRating+"\n" + "Rotten Tomatoes Score: " + movies.Ratings[1].Value+"\n" + "Country: " + movies.Country+"\n" + "Language: " + movies.Language+"\n" + "Plot: " + movies.Plot+"\n" + "Actors: " + movies.Actors+"\n" + "***************"+"\n";

            //Displays the previous variable, logFilm, neatly in the the log.txt file
            fs.appendFile("log.txt", logFilm, function(err) {

                if(err) {
                    console.log(err);
                }
                else {
                    console.log("Film info added to the log!");
                }
            })
        })

        .catch(function (error) {
            console.log(error);
        });
         
}
//End of filmSearch function


//Function to be executed if user chooses do-what-it-says
function randomCommand() {

    //Reads random.txt file
    fs.readFile("./random.txt", "utf8", function(error, data) {

        if(error) {
            return console.log(error);
        }

        //Takes the strings in random.txt file and splits them via ","s and turns them into an array
        let dataArr = data.split(",");

        //If spotify-this-song is listed first in the array execute the following function
        if(dataArr[0] === "spotify-this-song") {

            let randomSong = dataArr[1];

            songSearch(randomSong);
        }
        //If movie-this is listed first in the array execute the following function
        else if(dataArr[0] === "movie-this") {

            let randomMovie = dataArr[1];

            filmSearch(randomMovie);
        }
        //If concert-this is listed first in the array execute the following function
        else if(dataArr[0] === "concert-this") {

            let randomConcert = dataArr[1];

            concertSearch(randomConcert);
        }
    });
}