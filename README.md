# Liri-Node-App
Node.js app that searchs Spotify, Bands in Town, &amp; OMDB

# WELCOME TO LIRI BOT!

The Liri Bot is an app that utilizes Javascript and Node.js and runs exclusively in the command line. Because of this please find below screenshots to better exemplify the app's functionality.

Once in the command line, the user can input one of four commands (after listing node liri.js): concert-this, spotify-this-song, movie-this, or do-what-it-says.

**If user user forgets to include a command, a default error message is displayed:**

![Error Message](https://user-images.githubusercontent.com/43733860/51639357-f49db680-1f1d-11e9-9a16-1c4ae818d564.png)


For concert-this, spotify-this-song, and movie-this: User can add additional input (artist name, song title, or movie name ,respectively) and it will be logged to the console, as well as be logged to the file called "log.txt"

### concert-this (including user input)

![Concert This Working](https://user-images.githubusercontent.com/43733860/51639356-f49db680-1f1d-11e9-9670-40ba9c134539.png)

### spotify-this-song (including user input)

![Spotify This Song Working](https://user-images.githubusercontent.com/43733860/51639364-f5364d00-1f1d-11e9-989a-328c6ba4d116.png)

### movie-this (including user input)

![Movie This Working](https://user-images.githubusercontent.com/43733860/51639365-f5364d00-1f1d-11e9-8882-380179b9c9b1.png)

**For spotify-this-song, and movie-this: If no user input is added, the command will run with default information**

![Spotify Default Result](https://user-images.githubusercontent.com/43733860/51639363-f5364d00-1f1d-11e9-9809-9503a0271b5a.png)

_**Special Note: Not all Spotify responses come with a preview URL due to record label copyright. In the image above, you can see that I have added a piece of code that will console log a message when there is no preview URL.**_

![Movie Default Result](https://user-images.githubusercontent.com/43733860/51639358-f49db680-1f1d-11e9-8ef9-64237e73e4ec.png)

**For do-what-it-says: the result is determined by the information in the "random.txt" file.**

Below are some examples of what the command would return depending on if the random.txt files had movie-this, spotify-this-song, or concert-this:

**do-what-it-says with concert-this in random.txt file**

![Concert This Random](https://user-images.githubusercontent.com/43733860/51639359-f49db680-1f1d-11e9-8784-52695e161d93.png)


**do-what-it-says with spotify-this-song in random.txt file**

![Spotify This Random](https://user-images.githubusercontent.com/43733860/51639362-f5364d00-1f1d-11e9-80f5-d945ebde6b03.png)


**do-what-it-says with movie-this in random.txt file**

![Movie This Random](https://user-images.githubusercontent.com/43733860/51639361-f5364d00-1f1d-11e9-9dad-79f5d2f269a6.png)

**Languages/Technologies Utilized:**

* JavaScript
* Node.js
* Axios (npm)
* Dotenv (npm)
* Spotify API (npm)
* Moment (npm)
