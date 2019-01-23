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

                let logConcert = "Next Upcoming Event Info :"+"\n" + "Artist: " + concert.lineup[0]+"\n"
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

    if (userInput === undefined) {

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

            let logSong = "Song Info :"+"\n" + "Artist: " + songs.artists[0].name+"\n"
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


