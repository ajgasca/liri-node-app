require("dotenv").config();

const keys = require("./keys.js");

const axios = require("axios");

const moment = require("moment");

const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);

const fs = require("fs");

let nodeArguments = process.argv;

let command = process.argv[2];

let userInput = '';

    for(let i = 3; i < nodeArguments.length; i++) {
        if (i > 3 && i < nodeArguments.length) {
            userInput = userInput + nodeArguments[i];
        }
        else {
            userInput += nodeArguments[i];
        }
    }


switch (command) {
    case 'concert-this':
        concertSearch(userInput);
        break;
    case 'spotify-this-song':
        spotifySearch(userInput);
        break;
    case 'movie-this':
        omdbSearch(userInput);
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
            if (response.data[0] === undefined) {
                console.log("Unfortunately at this time there are NO upcoming events for this artist. Please search another one!");
            }
            else {
                
            }
        }
    )
}


