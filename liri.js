require("dotenv").config();

const keys = require("./keys.js");

const axios = require("axios");

const moment = require("moment");

const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);

const fs = require("fs");

let nodeArguments = process.argv;

let liriCommand = process.argv[2];

let userInput = '';

    for(let i = 3; i < nodeArguments.length; i++) {
        if (i > 3 && i < nodeArguments.length) {
            userInput = userInput + "+" + nodeArguments[i];
        }
        else {
            userInput += nodeArguments[i];
        }
    }


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


function concertSearch(userInput) {

    let queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(

        function(response) {

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


function songSearch(userInput) {

    if (!userInput) {

        userInput = "The Sign Ace of Base";
        
        console.log("It looks like you didn't put in a song name. Here's a recommended classic.");
    
    }
    

    spotify.search({type: "track", query: userInput, limit: 1})

        .then(function(response) {

            let songs = response.tracks.items[0];

            let previewUrl;

            console.log("Artist: " + songs.artists[0].name);

            console.log("Song Title: " + songs.name);

            console.log("Album: " + songs.album.name);

            if (songs.preview_url === undefined || songs.preview_url === null) {
                previewUrl = "Unfortunately there is no preview for this song :( .";
            }
            else {
                previewUrl = songs.preview_url;
            }

            console.log("Preview Song: " + previewUrl);

            let logSong = "spotify-this-song"+"\n" + "Song Info :"+"\n" + "Artist: " + songs.artists[0].name+"\n"
            + "Song Title: " + songs.name+"\n" + "Album: " + songs.album.name+"\n" + "Preview Song: " + previewUrl+"\n" + "***************"+"\n";

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


function filmSearch(userInput) {

    if(!userInput) {

        userInput = "Mr. Nobody";

        console.log("Can't think of a movie? Here's a great recommendation! And the best part: It's on Netflix!");

    }

    let filmUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

    axios.get(filmUrl).then(

        function(response) {

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


function randomCommand() {

    fs.readFile("./random.txt", "utf8", function(error, data) {

        if(error) {
            return console.log(error);
        }

        let dataArr = data.split(",");

        if(dataArr[0] === "spotify-this-song") {

            let randomSong = dataArr[1];

            songSearch(randomSong);
        }
        else if(dataArr[0] === "movie-this") {

            let randomMovie = dataArr[1];

            filmSearch(randomMovie);
        }
        else if(dataArr[0] === 'concert-this') {

            let randomConcert = dataArr[1];

            concertSearch(randomConcert);
        }
    });
}