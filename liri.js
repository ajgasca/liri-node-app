require("dotenv").config();

const keys = require("./keys.js");

const axios = require("axios");

const moment = require("moment");

const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);

const fs = require("fs");

let command = process.argv[2];

let userInput = process.argv[3];

function liriCommand (command, userInput) {
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
}


